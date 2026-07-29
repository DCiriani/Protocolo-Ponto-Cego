import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const runtime = "nodejs";

const CHROMIUM_PACK =
  "https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { token } = await context.params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return NextResponse.json(
      { ok: false, message: "NEXT_PUBLIC_SITE_URL nao configurada." },
      { status: 500 },
    );
  }

  const readingUrl = `${siteUrl}/leitura/${token}?pdf=1`;

  let browser = null;

  try {
    const isLocal = process.env.NODE_ENV === "development";

    browser = await puppeteer.launch(
      isLocal
        ? {
            channel: "chrome",
            headless: true,
          }
        : {
            args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(CHROMIUM_PACK),
            headless: true,
          },
    );

    const page = await browser.newPage();

    await page.goto(readingUrl, {
      waitUntil: "networkidle0",
      timeout: 45000,
    });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
      },
    });

    await browser.close();
    browser = null;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="leitura-ponto-cego.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar PDF da leitura:", error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { ok: false, message: "Nao foi possivel gerar o PDF." },
      { status: 500 },
    );
  }
}
