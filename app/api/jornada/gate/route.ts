import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { runGate1, hasPreviousRedFlag, type Screening } from "@/lib/risk";
import { sendRiskAlert } from "@/lib/alerts";

type GatePayload = {
  orderId?: string;
  publicAnswers?: {
    relationshipStatus?: string;
    ageRange?: string;
    relationshipDuration?: string;
    discomfortDuration?: string;
    therapyHistory?: string;
    mainQuestion?: string;
    screeningMood?: string;
    screeningFunctioning?: string;
    screeningIdeation?: string;
  };
};

const requiredPublicFields = [
  "relationshipStatus",
  "ageRange",
  "relationshipDuration",
  "discomfortDuration",
  "therapyHistory",
  "mainQuestion",
  "screeningMood",
  "screeningFunctioning",
  "screeningIdeation",
] as const;

const MIN_MAIN_QUESTION_LENGTH = 10;
const MAIN_QUESTION_TOO_SHORT_MESSAGE =
  "Conta um pouco mais. Quanto mais detalhe você trouxer, mais precisa fica a sua leitura.";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GatePayload;
    const orderId = payload.orderId;
    const publicAnswers = payload.publicAnswers;

    if (!orderId || !publicAnswers) {
      return NextResponse.json(
        { ok: false, message: "Dados obrigatórios ausentes." },
        { status: 400 },
      );
    }

    for (const field of requiredPublicFields) {
      const value = publicAnswers[field];

      if (typeof value !== "string" || value.trim().length === 0) {
        return NextResponse.json(
          { ok: false, message: `Campo obrigatório ausente: ${field}` },
          { status: 400 },
        );
      }
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("checkout_orders")
      .select("id, name, email, jornada_submission_id")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json(
        { ok: false, message: "Pedido não encontrado." },
        { status: 404 },
      );
    }

    if (!order.jornada_submission_id) {
      return NextResponse.json(
        { ok: false, message: "Jornada não encontrada para este pedido." },
        { status: 404 },
      );
    }

    const screening: Screening = {
      mood: publicAnswers.screeningMood as Screening["mood"],
      functioning: publicAnswers.screeningFunctioning as Screening["functioning"],
      ideation: publicAnswers.screeningIdeation as Screening["ideation"],
    };

    await supabaseAdmin
      .from("jornada_submissions")
      .update({
        relationship_status: publicAnswers.relationshipStatus,
        main_question: publicAnswers.mainQuestion,
        raw_payload: publicAnswers,
      })
      .eq("id", order.jornada_submission_id);

    const assessment = await runGate1({
      email: order.email,
      mainQuestion: publicAnswers.mainQuestion ?? "",
      screening,
    });

    // A trava de mínimo de caracteres só se aplica quando não há sinal de
    // risco: o classificador sempre roda primeiro, e amarelo/vermelho tem
    // prioridade sobre o texto curto.
    if (
      assessment.level === "verde" &&
      (publicAnswers.mainQuestion ?? "").trim().length < MIN_MAIN_QUESTION_LENGTH
    ) {
      return NextResponse.json(
        { ok: false, tooShort: true, message: MAIN_QUESTION_TOO_SHORT_MESSAGE },
        { status: 400 },
      );
    }

    const submissionUpdate: Record<string, unknown> = {
      risk_level: assessment.level,
      risk_category: assessment.category,
      risk_excerpts: assessment.excerpts,
      risk_reason: assessment.reason,
      risk_gate: "gate_1",
    };

    if (assessment.level !== "verde") {
      submissionUpdate.risk_flagged_at = new Date().toISOString();
    }

    await supabaseAdmin
      .from("jornada_submissions")
      .update(submissionUpdate)
      .eq("id", order.jornada_submission_id);

    const hadPreviousRedFlag =
      assessment.level === "amarelo" && (await hasPreviousRedFlag(order.email));

    if (assessment.level === "vermelho") {
      await supabaseAdmin
        .from("checkout_orders")
        .update({ gate_status: "blocked_acolhimento" })
        .eq("id", order.id);

      const alertSent = await sendRiskAlert({
        level: "vermelho",
        gate: "gate_1",
        name: order.name,
        email: order.email,
        category: assessment.category,
        excerpts: assessment.excerpts,
        reason: assessment.reason,
        screening,
        submissionId: order.jornada_submission_id,
      });

      if (alertSent) {
        await supabaseAdmin
          .from("jornada_submissions")
          .update({ alert_sent_at: new Date().toISOString() })
          .eq("id", order.jornada_submission_id);
      }

      return NextResponse.json({ ok: true, allowed: false });
    }

    await supabaseAdmin
      .from("checkout_orders")
      .update({ gate_status: "approved" })
      .eq("id", order.id);

    if (assessment.level === "amarelo") {
      const alertSent = await sendRiskAlert({
        level: "amarelo",
        gate: "gate_1",
        name: order.name,
        email: order.email,
        category: assessment.category,
        excerpts: assessment.excerpts,
        reason: assessment.reason,
        screening,
        hadPreviousRedFlag,
        submissionId: order.jornada_submission_id,
      });

      if (alertSent) {
        await supabaseAdmin
          .from("jornada_submissions")
          .update({ alert_sent_at: new Date().toISOString() })
          .eq("id", order.jornada_submission_id);
      }
    }

    return NextResponse.json({ ok: true, allowed: true });
  } catch (error) {
    console.error("jornada/gate API error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno ao processar o rastreio." },
      { status: 500 },
    );
  }
}
