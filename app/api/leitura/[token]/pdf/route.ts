import { NextResponse } from "next/server";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import React from "react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { parseBlocks, parseInline } from "@/lib/leitura/parse-blocks";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COLORS = {
  bg: "#0A0A0A",
  card: "#141414",
  text: "#D4D4D4",
  heading: "#F5F5F3",
  accent: "#88B39A",
  muted: "#8A8A8A",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: COLORS.heading,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  intro: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 28,
  },
  h1: {
    fontSize: 15,
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  h2: {
    fontSize: 13,
    color: "#6F8F5E",
    fontFamily: "Helvetica-Bold",
    marginTop: 18,
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.accent,
  },
  h3: {
    fontSize: 11,
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 9,
    color: COLORS.text,
  },
  quote: {
    marginBottom: 9,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.accent,
    color: COLORS.accent,
    fontFamily: "Helvetica-Oblique",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    color: COLORS.accent,
    marginRight: 6,
  },
  listText: {
    flex: 1,
    color: COLORS.text,
  },
  disclaimer: {
    marginTop: 32,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
    fontSize: 8.5,
    color: COLORS.muted,
    lineHeight: 1.5,
  },
  footer: {
    marginTop: 18,
    fontSize: 9,
    color: COLORS.muted,
  },
});

function renderInlineText(text: string) {
  const segments = parseInline(text);
  return segments.map((seg, i) =>
    React.createElement(
      Text,
      { key: i, style: seg.bold ? { fontFamily: "Helvetica-Bold" } : {} },
      seg.text,
    ),
  );
}

function ReadingDocument({
  name,
  notes,
  date,
}: {
  name: string;
  notes: string;
  date: string;
}) {
  const blocks = parseBlocks(notes);

  return React.createElement(
    Document,
    {},
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(Text, { style: styles.eyebrow }, "Leitura Ponto Cego"),
      React.createElement(
        Text,
        { style: styles.title },
        `${name}, esta é a sua leitura.`,
      ),
      React.createElement(
        Text,
        { style: styles.intro },
        "Esta devolutiva foi construída a partir das suas respostas na Jornada Ponto Cego.",
      ),
      React.createElement(Text, { style: styles.date }, `Entregue em ${date}`),

      ...blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return React.createElement(
              Text,
              { key: i, style: styles.h1 },
              block.text,
            );
          case "h2":
            return React.createElement(
              Text,
              { key: i, style: styles.h2 },
              block.text,
            );
          case "h3":
            return React.createElement(
              Text,
              { key: i, style: styles.h3 },
              block.text,
            );
          case "quote":
            return React.createElement(
              Text,
              { key: i, style: styles.quote },
              renderInlineText(block.text),
            );
          case "list":
            return React.createElement(
              View,
              { key: i, wrap: false },
              ...block.items.map((item, j) =>
                React.createElement(
                  View,
                  { key: j, style: styles.listItem },
                  React.createElement(Text, { style: styles.bullet }, "\u2022"),
                  React.createElement(
                    Text,
                    { style: styles.listText },
                    renderInlineText(item),
                  ),
                ),
              ),
            );
          default:
            return React.createElement(
              Text,
              { key: i, style: styles.paragraph },
              renderInlineText(block.text),
            );
        }
      }),

      React.createElement(
        Text,
        { style: styles.disclaimer },
        "Esta leitura não substitui psicoterapia, avaliação psicológica, diagnóstico ou acompanhamento clínico. Ela tem caráter reflexivo e foi construída para ampliar clareza sobre padrões relacionais.",
      ),
      React.createElement(
        Text,
        { style: styles.footer },
        "Ponto Cego \u2014 Diego Ciriani",
      ),
    ),
  );
}

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  try {
    const { data, error } = await supabaseAdmin
      .from("jornada_submissions")
      .select("name, analysis_notes, delivery_created_at")
      .eq("delivery_token", token)
      .eq("delivery_enabled", true)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { ok: false, message: "Leitura nao encontrada." },
        { status: 404 },
      );
    }

    if (
      typeof data.analysis_notes !== "string" ||
      data.analysis_notes.trim().length === 0
    ) {
      return NextResponse.json(
        { ok: false, message: "Leitura sem conteudo." },
        { status: 404 },
      );
    }

    const date = data.delivery_created_at
      ? new Date(data.delivery_created_at).toLocaleDateString("pt-BR")
      : new Date().toLocaleDateString("pt-BR");

    const buffer = await renderToBuffer(
      ReadingDocument({
        name: data.name,
        notes: data.analysis_notes,
        date,
      }),
    );

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="leitura-ponto-cego.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Erro ao gerar PDF da leitura:", err);
    return NextResponse.json(
      { ok: false, message: "Nao foi possivel gerar o PDF." },
      { status: 500 },
    );
  }
}
