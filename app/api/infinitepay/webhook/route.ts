import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendJornadaAccessEmail } from "@/lib/email/send-jornada-email";

type InfinityPayWebhookBody = {
  order_nsu?: string;
  capture_method?: string;
  transaction_nsu?: string;
  transaction_id?: string;
  receipt_url?: string;
  slug?: string;
  amount?: number;
  paid_amount?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request
      .json()
      .catch(() => ({}))) as InfinityPayWebhookBody;

    const orderNsu = body.order_nsu;

    if (!orderNsu) {
      return NextResponse.json(
        { ok: false, message: "order_nsu ausente." },
        { status: 400 },
      );
    }

    // Busca o pedido correspondente
    const { data: order, error: orderError } = await supabaseAdmin
      .from("checkout_orders")
      .select("id, name, email, payment_status, jornada_email_sent_at")
      .eq("id", orderNsu)
      .maybeSingle();

    if (orderError || !order) {
      console.error("InfinityPay webhook: pedido não encontrado.", orderNsu);
      return NextResponse.json(
        { ok: false, message: "Pedido não encontrado." },
        { status: 404 },
      );
    }

    // Idempotência: se já está aprovado e o e-mail já saiu, não faz nada de novo
    if (order.payment_status === "approved" && order.jornada_email_sent_at) {
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    // A chegada do webhook da InfinityPay significa pagamento confirmado
    const { error: orderUpdateError } = await supabaseAdmin
      .from("checkout_orders")
      .update({
        payment_status: "approved",
        infinitepay_transaction_nsu: body.transaction_nsu ?? null,
        infinitepay_capture_method: body.capture_method ?? null,
        infinitepay_receipt_url: body.receipt_url ?? null,
        raw_payload: body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (orderUpdateError) {
      console.error("Checkout order update error:", orderUpdateError);
      return NextResponse.json(
        { ok: false, message: "Não foi possível atualizar o pedido." },
        { status: 500 },
      );
    }

    // Atualiza a submission da jornada vinculada a esse pedido
    const { error: submissionUpdateError } = await supabaseAdmin
      .from("jornada_submissions")
      .update({
        payment_status: "approved",
        updated_at: new Date().toISOString(),
      })
      .eq("checkout_order_id", order.id);

    if (submissionUpdateError) {
      console.error(
        "Jornada submission update error:",
        submissionUpdateError,
      );
    }

    // Dispara o e-mail de acesso — apenas uma vez
    if (!order.jornada_email_sent_at) {
      try {
        await sendJornadaAccessEmail({
          to: order.email,
          name: order.name,
          orderId: order.id,
        });

        await supabaseAdmin
          .from("checkout_orders")
          .update({
            jornada_email_sent_at: new Date().toISOString(),
            jornada_email_error: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);
      } catch (emailError) {
        console.error("Send jornada access email error:", emailError);

        await supabaseAdmin
          .from("checkout_orders")
          .update({
            jornada_email_error:
              emailError instanceof Error
                ? emailError.message
                : "Erro desconhecido ao enviar e-mail.",
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);
      }
    }

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      transactionNsu: body.transaction_nsu ?? null,
    });
  } catch (error) {
    console.error("InfinityPay webhook error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno no webhook da InfinityPay." },
      { status: 500 },
    );
  }
}