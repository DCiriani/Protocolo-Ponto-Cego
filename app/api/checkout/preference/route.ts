import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type PreferencePayload = {
  orderId?: string;
};

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const price = Number(process.env.PRODUCT_PRICE ?? "147");

    if (!accessToken) {
      return NextResponse.json(
        { ok: false, message: "MERCADO_PAGO_ACCESS_TOKEN não configurado." },
        { status: 500 },
      );
    }

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

    const preference = {
      items: [
        {
          id: "analise-ponto-cego",
          title: "Análise Ponto Cego",
          description:
            "Leitura clínica personalizada para identificar padrões nos relacionamentos.",
          quantity: 1,
          currency_id: "BRL",
          unit_price: price,
        },
      ],

      payer: {
        name: order.name,
        email: order.email,
      },

      back_urls: {
        success: `${siteUrl}/jornada/continuacao?order=${order.id}`,
        failure: `${siteUrl}/checkout/erro`,
        pending: `${siteUrl}/checkout/pendente?order=${order.id}`,
      },

      auto_return: "approved",

      notification_url: `${siteUrl}/api/mercado-pago/webhook`,

      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },

      statement_descriptor: "PONTO CEGO",

      external_reference: order.id,

      metadata: {
        product: "analise_ponto_cego",
        checkout_order_id: order.id,
        customer_name: order.name,
        customer_email: order.email,
      },
    };

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mercado Pago preference error:", errorText);

      return NextResponse.json(
        { ok: false, message: "Não foi possível criar o checkout." },
        { status: 500 },
      );
    }

    const data = await response.json();

    await supabaseAdmin
      .from("checkout_orders")
      .update({
        mercado_pago_preference_id: data.id ?? null,
        raw_payload: data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    const checkoutUrl = data.init_point || data.sandbox_init_point;

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
