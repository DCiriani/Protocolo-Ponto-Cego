import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { runGate2 } from "@/lib/risk";
import { sendRiskAlert } from "@/lib/alerts";

type JornadaPayload = {
  orderId?: string;
  answers?: {
    sceneConflict?: string;
    reactionSelections?: string[];
    reactionPurpose?: string;
    sceneProximity?: string;
    mirrorCriticism?: string;
    mirrorTruth?: string;
    intentionImpact?: string;
    patternHypothesis?: string;
    desireFear?: string;
    consent?: boolean;
  };
};

const requiredStringFields = [
  "sceneConflict",
  "reactionPurpose",
  "sceneProximity",
  "mirrorCriticism",
  "mirrorTruth",
  "intentionImpact",
  "patternHypothesis",
  "desireFear",
] as const;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as JornadaPayload;
    const { orderId, answers } = payload;

    if (!orderId || !answers) {
      return NextResponse.json(
        { ok: false, message: "Dados obrigatórios ausentes." },
        { status: 400 },
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("checkout_orders")
      .select("id, name, email, payment_status, gate_status, jornada_submission_id")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError || !order) {
      return NextResponse.json(
        { ok: false, message: "Pedido não encontrado." },
        { status: 403 },
      );
    }

    if (order.payment_status !== "approved" || order.gate_status !== "approved") {
      return NextResponse.json(
        { ok: false, message: "Este pedido não está liberado para envio." },
        { status: 403 },
      );
    }

    if (!order.jornada_submission_id) {
      return NextResponse.json(
        { ok: false, message: "Jornada não encontrada para este pedido." },
        { status: 403 },
      );
    }

    for (const field of requiredStringFields) {
      const value = answers[field];

      if (typeof value !== "string" || value.trim().length === 0) {
        return NextResponse.json(
          { ok: false, message: `Campo obrigatório ausente: ${field}` },
          { status: 400 },
        );
      }
    }

    if (
      !Array.isArray(answers.reactionSelections) ||
      answers.reactionSelections.length === 0 ||
      answers.reactionSelections.length > 2 ||
      answers.reactionSelections.some(
        (reaction) => typeof reaction !== "string" || reaction.trim().length === 0,
      )
    ) {
      return NextResponse.json(
        { ok: false, message: "Escolha uma ou duas reações." },
        { status: 400 },
      );
    }

    if (answers.consent !== true) {
      return NextResponse.json(
        { ok: false, message: "Consentimento obrigatório." },
        { status: 400 },
      );
    }

    const { data: submission, error: submissionFetchError } = await supabaseAdmin
      .from("jornada_submissions")
      .select("id, main_question, raw_payload, risk_gate")
      .eq("id", order.jornada_submission_id)
      .maybeSingle();

    if (submissionFetchError || !submission) {
      return NextResponse.json(
        { ok: false, message: "Jornada não encontrada." },
        { status: 403 },
      );
    }

    const mergedRawPayload = {
      ...(typeof submission.raw_payload === "object" && submission.raw_payload
        ? submission.raw_payload
        : {}),
      ...answers,
    };

    const { error: updateError } = await supabaseAdmin
      .from("jornada_submissions")
      .update({
        scene_conflict: answers.sceneConflict?.trim(),
        consent: true,
        payment_status: "approved",
        analysis_status: "received",
        raw_payload: mergedRawPayload,
      })
      .eq("id", submission.id);

    if (updateError) {
      console.error("jornada API update error:", updateError);

      return NextResponse.json(
        { ok: false, message: "Não foi possível salvar a jornada." },
        { status: 500 },
      );
    }

    const assessment = await runGate2({
      mainQuestion: submission.main_question ?? "",
      sceneConflict: answers.sceneConflict,
      reactionPurpose: answers.reactionPurpose,
      sceneProximity: answers.sceneProximity,
      mirrorCriticism: answers.mirrorCriticism,
      mirrorTruth: answers.mirrorTruth,
      intentionImpact: answers.intentionImpact,
      patternHypothesis: answers.patternHypothesis,
      desireFear: answers.desireFear,
    });

    if (assessment.level !== "verde") {
      const riskGate = submission.risk_gate === "gate_1" ? "ambos" : "gate_2";

      await supabaseAdmin
        .from("jornada_submissions")
        .update({
          risk_level: assessment.level,
          risk_category: assessment.category,
          risk_excerpts: assessment.excerpts,
          risk_reason: assessment.reason,
          risk_gate: riskGate,
          risk_flagged_at: new Date().toISOString(),
        })
        .eq("id", submission.id);

      const alertSent = await sendRiskAlert({
        level: assessment.level,
        gate: "gate_2",
        name: order.name,
        email: order.email,
        category: assessment.category,
        excerpts: assessment.excerpts,
        reason: assessment.reason,
        submissionId: submission.id,
      });

      if (alertSent) {
        await supabaseAdmin
          .from("jornada_submissions")
          .update({ alert_sent_at: new Date().toISOString() })
          .eq("id", submission.id);
      }
    }

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (error) {
    console.error("Jornada API error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno ao processar a jornada." },
      { status: 500 },
    );
  }
}
