import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type MercadoPagoWebhookBody = {
  id?: string | number;
  type?: string;
  action?: string;
  data?: {
    id?: string | number;
  };
  topic?: string;
  resource?: string;
};

type MercadoPagoPayment = {
  id: number;
  status?: string;
  status_detail?: string;
  transaction_amount?: number;
  currency_id?: string;
  external_reference?: string;
  payer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
};

function getPaymentId(body: MercadoPagoWebhookBody, request: Request) {
  const url = new URL(request.url);

  const queryId =
    url.searchParams.get("data.id") ||
    url.searchParams.get("id") ||
    url.searchParams.get("payment_id");

  const bodyId = body?.data?.id || body?.id;

  return String(queryId || bodyId || "");
}

function mapPaymentStatus(status?: string) {
  if (status === "approved") {
    return "approved";
  }

  if (status === "pending" || status === "in_process") {
    return "pending";
  }

  if (
    status === "rejected" ||
    status === "cancelled" ||
    status === "refunded" ||
    status === "charged_back"
  ) {
    return "rejected";
  }

  return "not_verified";
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        {
          ok: false,
          message: "MERCADO_PAGO_ACCESS_TOKEN não configurado.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody;

    const paymentId = getPaymentId(body, request);

    if (!paymentId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Payment ID ausente.",
        },
        { status: 400 }
      );
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();

      console.error("Mercado Pago fetch payment error:", errorText);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível consultar o pagamento.",
        },
        { status: 500 }
      );
    }

    const payment = (await paymentResponse.json()) as MercadoPagoPayment;

    const payerEmail = payment.payer?.email?.toLowerCase().trim() ?? null;

    const payerName = [payment.payer?.first_name, payment.payer?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    const mappedStatus = mapPaymentStatus(payment.status);
    const checkoutOrderId = payment.external_reference ?? null;

    const { error: paymentUpsertError } = await supabaseAdmin
      .from("mercado_pago_payments")
      .upsert(
        {
          mercado_pago_payment_id: String(payment.id),
          status: payment.status ?? null,
          status_detail: payment.status_detail ?? null,

          payer_email: payerEmail,
          payer_name: payerName || null,

          transaction_amount: payment.transaction_amount ?? null,
          currency_id: payment.currency_id ?? null,

          raw_payload: payment,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "mercado_pago_payment_id",
        }
      );

    if (paymentUpsertError) {
      console.error("Mercado Pago payment upsert error:", paymentUpsertError);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível salvar o pagamento.",
        },
        { status: 500 }
      );
    }
if (checkoutOrderId) {
  const { error: orderUpdateError } = await supabaseAdmin
    .from("checkout_orders")
    .update({
      payment_status: mappedStatus,
      mercado_pago_payment_id: String(payment.id),
      updated_at: new Date().toISOString(),
    })
    .eq("id", checkoutOrderId);

  if (orderUpdateError) {
    console.error("Checkout order payment update error:", orderUpdateError);
  }

  const { error: submissionOrderUpdateError } = await supabaseAdmin
    .from("jornada_submissions")
    .update({
      payment_status: mappedStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("checkout_order_id", checkoutOrderId);

  if (submissionOrderUpdateError) {
    console.error(
      "Jornada submission payment update by order error:",
      submissionOrderUpdateError
    );
  }
}
    if (payerEmail) {
      const { error: submissionUpdateError } = await supabaseAdmin
        .from("jornada_submissions")
        .update({
          payment_status: mappedStatus,
          updated_at: new Date().toISOString(),
        })
        .ilike("email", payerEmail);

      if (submissionUpdateError) {
        console.error(
          "Mercado Pago submission payment update error:",
          submissionUpdateError
        );
      }
    }

    return NextResponse.json({
      ok: true,
      paymentId: payment.id,
      status: payment.status,
      mappedStatus,
      payerEmail,
    });
  } catch (error) {
    console.error("Mercado Pago webhook error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno no webhook do Mercado Pago.",
      },
      { status: 500 }
    );
  }
}