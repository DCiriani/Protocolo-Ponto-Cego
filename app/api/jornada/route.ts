import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type JornadaPayload = {
  name?: string;
  email?: string;
  relationshipStatus?: string;

  ageRange?: string;
  relationshipDuration?: string;
  discomfortDuration?: string;
  therapyHistory?: string;

  mainQuestion?: string;
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

  checkoutOrderId?: string | null;
  submittedAt?: string;
};

const requiredStringFields: Array<keyof JornadaPayload> = [
  "name",
  "email",
  "relationshipStatus",
  "ageRange",
  "relationshipDuration",
  "discomfortDuration",
  "therapyHistory",
  "mainQuestion",
  "sceneConflict",
  "reactionPurpose",
  "sceneProximity",
  "mirrorCriticism",
  "mirrorTruth",
  "intentionImpact",
  "patternHypothesis",
  "desireFear",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as JornadaPayload;

    // Validação dos campos de texto
    for (const field of requiredStringFields) {
      const value = payload[field];

      if (typeof value !== "string" || value.trim().length === 0) {
        return NextResponse.json(
          {
            ok: false,
            message: `Campo obrigatório ausente: ${field}`,
          },
          { status: 400 },
        );
      }
    }

    // Validação do e-mail
    if (
      typeof payload.email !== "string" ||
      !isValidEmail(payload.email.trim())
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Digite um e-mail válido.",
        },
        { status: 400 },
      );
    }

    // Validação das reações
    if (
      !Array.isArray(payload.reactionSelections) ||
      payload.reactionSelections.length === 0 ||
      payload.reactionSelections.length > 2 ||
      payload.reactionSelections.some(
        (reaction) =>
          typeof reaction !== "string" || reaction.trim().length === 0,
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Escolha uma ou duas reações.",
        },
        { status: 400 },
      );
    }

    // Validação do consentimento
    if (payload.consent !== true) {
      return NextResponse.json(
        {
          ok: false,
          message: "Consentimento obrigatório.",
        },
        { status: 400 },
      );
    }

    const normalizedPayload = {
      name: payload.name?.trim(),
      email: payload.email?.trim().toLowerCase(),
      relationshipStatus: payload.relationshipStatus?.trim(),

      ageRange: payload.ageRange?.trim(),
      relationshipDuration: payload.relationshipDuration?.trim(),
      discomfortDuration: payload.discomfortDuration?.trim(),
      therapyHistory: payload.therapyHistory?.trim(),

      mainQuestion: payload.mainQuestion?.trim(),
      sceneConflict: payload.sceneConflict?.trim(),

      reactionSelections: payload.reactionSelections.map((reaction) =>
        reaction.trim(),
      ),
      reactionPurpose: payload.reactionPurpose?.trim(),

      sceneProximity: payload.sceneProximity?.trim(),

      mirrorCriticism: payload.mirrorCriticism?.trim(),
      mirrorTruth: payload.mirrorTruth?.trim(),

      intentionImpact: payload.intentionImpact?.trim(),
      patternHypothesis: payload.patternHypothesis?.trim(),
      desireFear: payload.desireFear?.trim(),

      consent: true,

      checkoutOrderId:
        typeof payload.checkoutOrderId === "string"
          ? payload.checkoutOrderId.trim()
          : null,

      submittedAt:
        typeof payload.submittedAt === "string"
          ? payload.submittedAt
          : new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("jornada_submissions")
      .insert({
        name: normalizedPayload.name,
        email: normalizedPayload.email,
        relationship_status: normalizedPayload.relationshipStatus,
        main_question: normalizedPayload.mainQuestion,
        scene_conflict: normalizedPayload.sceneConflict,

        consent: normalizedPayload.consent,

        payment_status: "not_verified",
        analysis_status: "received",

        // Todos os campos novos ficam preservados aqui
        raw_payload: normalizedPayload,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível salvar a jornada.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        id: data.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Jornada API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao processar a jornada.",
      },
      { status: 500 },
    );
  }
}