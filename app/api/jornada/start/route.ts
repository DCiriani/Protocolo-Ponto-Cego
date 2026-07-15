import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type StartPayload = {
  name?: string;
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as StartPayload;

    const name = payload.name?.trim();
    const email = payload.email?.trim().toLowerCase();

    if (!name) {
      return NextResponse.json(
        { ok: false, message: "Nome obrigatório." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Digite um e-mail válido." },
        { status: 400 },
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("checkout_orders")
      .insert({
        name,
        email,
        payment_status: "pending",
        gate_status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("jornada/start: create checkout_order error:", orderError);

      return NextResponse.json(
        { ok: false, message: "Não foi possível iniciar a jornada." },
        { status: 500 },
      );
    }

    const { data: submission, error: submissionError } = await supabaseAdmin
      .from("jornada_submissions")
      .insert({
        name,
        email,
        relationship_status: "",
        main_question: "",
        scene_conflict: "",
        consent: false,

        checkout_order_id: order.id,
        payment_status: "pending",
        analysis_status: "draft",
      })
      .select("id")
      .single();

    if (submissionError || !submission) {
      console.error(
        "jornada/start: create jornada_submission error:",
        submissionError,
      );

      return NextResponse.json(
        { ok: false, message: "Não foi possível iniciar a jornada." },
        { status: 500 },
      );
    }

    const { error: updateOrderError } = await supabaseAdmin
      .from("checkout_orders")
      .update({ jornada_submission_id: submission.id })
      .eq("id", order.id);

    if (updateOrderError) {
      console.error(
        "jornada/start: link jornada_submission_id error:",
        updateOrderError,
      );
    }

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("jornada/start API error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno ao iniciar a jornada." },
      { status: 500 },
    );
  }
}
