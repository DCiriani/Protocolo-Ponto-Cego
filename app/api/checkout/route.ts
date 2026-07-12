import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  const price = Number(process.env.PRODUCT_PRICE || "147");

  if (!accessToken) {
    return NextResponse.redirect(
      new URL("/checkout/erro?motivo=token-ausente", siteUrl)
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

  back_urls: {
    success: `${siteUrl}/jornada/inicio`,
    failure: `${siteUrl}/checkout/erro`,
    pending: `${siteUrl}/checkout/pendente`,
  },

  auto_return: "approved",

  notification_url: `${siteUrl}/api/mercado-pago/webhook`,

  payment_methods: {
    excluded_payment_methods: [],
    excluded_payment_types: [],
    installments: 12,
  },

  statement_descriptor: "PONTO CEGO",

  external_reference: `pontocego_${Date.now()}`,

  metadata: {
    product: "analise_ponto_cego",
  },
};

  try {
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mercado Pago checkout error:", errorText);

      return NextResponse.redirect(
        new URL("/checkout/erro?motivo=preferencia", siteUrl)
      );
    }

    const data = await response.json();

    const checkoutUrl = data.init_point || data.sandbox_init_point;

    if (!checkoutUrl) {
      return NextResponse.redirect(
        new URL("/checkout/erro?motivo=url-ausente", siteUrl)
      );
    }

    return NextResponse.redirect(checkoutUrl, 303);
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.redirect(
      new URL("/checkout/erro?motivo=erro-interno", siteUrl)
    );
  }
}