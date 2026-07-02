import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type JornadaPayload = {
  name?: string;
  email?: string;
  relationshipStatus?: string;
  mainQuestion?: string;
  sceneConflict?: string;
  sceneSilence?: string;
  sceneLimit?: string;
  sceneShrunkLife?: string;
  sceneRepetition?: string;
  sceneChoice?: string;
  expectedClarity?: string;
  consent?: boolean;
  submittedAt?: string;
  checkoutOrderId?: string | null;
};

const requiredStringFields: Array<keyof JornadaPayload> = [
  "name",
  "email",
  "relationshipStatus",
  "mainQuestion",
  "sceneConflict",
  "sceneSilence",
  "sceneLimit",
  "sceneShrunkLife",
  "sceneRepetition",
  "sceneChoice",
  "expectedClarity",
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as JornadaPayload;

    for (const field of requiredStringFields) {
      const value = payload[field];

      if (typeof value !== "string" || value.trim().length === 0) {
        return NextResponse.json(
          {
            ok: false,
            message: `Campo obrigatório ausente: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    if (payload.consent !== true) {
      return NextResponse.json(
        {
          ok: false,
          message: "Consentimento obrigatório.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = String(payload.email).trim().toLowerCase();

    let paymentStatus = "not_verified";
    let checkoutOrderId: string | null = null;

    if (payload.checkoutOrderId) {
      const { data: checkoutOrder } = await supabaseAdmin
        .from("checkout_orders")
        .select("id, email, payment_status")
        .eq("id", payload.checkoutOrderId)
        .maybeSingle();

      if (checkoutOrder) {
        checkoutOrderId = checkoutOrder.id;

        if (checkoutOrder.payment_status === "approved") {
          paymentStatus = "approved";
        }
      }
    }

    if (paymentStatus !== "approved") {
      const { data: approvedPayment } = await supabaseAdmin
        .from("mercado_pago_payments")
        .select("id, status")
        .ilike("payer_email", normalizedEmail)
        .eq("status", "approved")
        .maybeSingle();

      if (approvedPayment) {
        paymentStatus = "approved";
      }
    }

    const { data, error } = await supabaseAdmin
      .from("jornada_submissions")
      .insert({
        name: payload.name,
        email: normalizedEmail,
        relationship_status: payload.relationshipStatus,
        main_question: payload.mainQuestion,

        scene_conflict: payload.sceneConflict,
        scene_silence: payload.sceneSilence,
        scene_limit: payload.sceneLimit,
        scene_shrunk_life: payload.sceneShrunkLife,
        scene_repetition: payload.sceneRepetition,
        scene_choice: payload.sceneChoice,

        expected_clarity: payload.expectedClarity,
        consent: payload.consent,

        checkout_order_id: checkoutOrderId,
        payment_status: paymentStatus,
        analysis_status: "received",

        raw_payload: payload,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível salvar a jornada.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        id: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Jornada API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao processar a jornada.",
      },
      { status: 500 }
    );
  }
}