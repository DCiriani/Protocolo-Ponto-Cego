import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const INFINITEPAY_HANDLE = "espacociriani";

type PreferencePayload = {
  orderId?: string;
};

export async function POST(request: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const price = Number(process.env.PRODUCT_PRICE ?? "147");

    if (!siteUrl) {
      return NextResponse.json(
        { ok: false, message: "NEXT_PUBLIC_SITE_URL não configurada." },
        { status: 500 },
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { ok: false, message: "PRODUCT_PRICE inválido." },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as PreferencePayload;
    const orderId = payload.orderId;

    if (!orderId) {
      return NextResponse.json(
        { ok: false, message: "orderId ausente." },
        { status: 400 },
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("checkout_orders")
      .select("id, name, email, gate_status")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json(
        { ok: false, message: "Pedido não encontrado." },
        { status: 404 },
      );
    }

    if (order.gate_status !== "approved") {
      return NextResponse.json(
        { ok: false, message: "Este pedido não está liberado para pagamento." },
        { status: 403 },
      );
    }

    // Valor em centavos para a InfinityPay
    const priceInCents = Math.round(price * 100);

    const infinitePayBody = {
      handle: INFINITEPAY_HANDLE,
      redirect_url: `${siteUrl}/checkout/pendente?order=${order.id}`,
      webhook_url: `${siteUrl}/api/infinitepay/webhook`,
      order_nsu: order.id,
      customer: {
        name: order.name,
      },
      items: [
        {
          quantity: 1,
          price: priceInCents,
          description: "Análise Ponto Cego",
        },
      ],
    };

    const response = await fetch(
      "https://api.checkout.infinitepay.io/links",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infinitePayBody),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("InfinityPay link error:", errorText);

      return NextResponse.json(
        { ok: false, message: "Não foi possível criar o checkout." },
        { status: 500 },
      );
    }

    const data = await response.json();

    await supabaseAdmin
      .from("checkout_orders")
      .update({
        raw_payload: data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    const checkoutUrl = data.url;

    if (!checkoutUrl) {
      return NextResponse.json(
        { ok: false, message: "URL do checkout ausente." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, checkoutUrl });
  } catch (error) {
    console.error("checkout/preference API error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno ao criar checkout." },
      { status: 500 },
    );
  }
}