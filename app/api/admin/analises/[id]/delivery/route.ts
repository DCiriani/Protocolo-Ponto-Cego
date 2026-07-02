import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendReadingDeliveryEmail } from "@/lib/email/send-reading-delivery-email";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

type DeliveryRequestBody = {
  forceEmail?: boolean;
};

type Submission = {
  id: string;
  name: string;
  email: string;
  analysis_notes: string | null;
  delivery_token: string | null;
  delivery_enabled: boolean | null;
  delivery_email_sent_at: string | null;
};

export const runtime = "nodejs";

function createDeliveryToken() {
  return randomBytes(16).toString("hex");
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const body = (await request
      .json()
      .catch(() => ({}))) as DeliveryRequestBody;

    const forceEmail = body.forceEmail === true;

    const { data: submissionData, error: submissionError } =
      await supabaseAdmin
        .from("jornada_submissions")
        .select(
          "id, name, email, analysis_notes, delivery_token, delivery_enabled, delivery_email_sent_at"
        )
        .eq("id", id)
        .single();

    if (submissionError || !submissionData) {
      console.error("Delivery submission fetch error:", submissionError);

      return NextResponse.json(
        {
          ok: false,
          message: "Análise não encontrada.",
        },
        { status: 404 }
      );
    }

    const submission = submissionData as Submission;

    if (
      typeof submission.analysis_notes !== "string" ||
      submission.analysis_notes.trim().length === 0
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Salve a leitura antes de gerar o link de entrega.",
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const token = submission.delivery_token ?? createDeliveryToken();

    const updatePayload: Record<string, unknown> = {
      delivery_token: token,
      delivery_enabled: true,
      analysis_status: "ready",
      updated_at: now,
    };

    if (!submission.delivery_token) {
      updatePayload.delivery_created_at = now;
    }

    const { error: deliveryUpdateError } = await supabaseAdmin
      .from("jornada_submissions")
      .update(updatePayload)
      .eq("id", id);

    if (deliveryUpdateError) {
      console.error("Create delivery link error:", deliveryUpdateError);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível gerar o link de entrega.",
        },
        { status: 500 }
      );
    }

    const shouldSendEmail = forceEmail || !submission.delivery_email_sent_at;

    if (!shouldSendEmail) {
      return NextResponse.json({
        ok: true,
        token,
        emailSent: false,
        emailAlreadySent: true,
      });
    }

    try {
      const emailResult = await sendReadingDeliveryEmail({
        to: submission.email,
        name: submission.name,
        token,
      });

      await supabaseAdmin
        .from("jornada_submissions")
        .update({
          delivery_email_sent_at: new Date().toISOString(),
          delivery_email_message_id: emailResult.id,
          delivery_email_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      return NextResponse.json({
        ok: true,
        token,
        emailSent: true,
        emailMessageId: emailResult.id,
      });
    } catch (emailError) {
      console.error("Send reading delivery email error:", emailError);

      await supabaseAdmin
        .from("jornada_submissions")
        .update({
          delivery_email_error:
            emailError instanceof Error
              ? emailError.message
              : "Erro desconhecido ao enviar e-mail da leitura.",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      return NextResponse.json({
        ok: true,
        token,
        emailSent: false,
        emailError:
          emailError instanceof Error
            ? emailError.message
            : "Erro desconhecido ao enviar e-mail.",
      });
    }
  } catch (error) {
    console.error("Delivery API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao gerar entrega.",
      },
      { status: 500 }
    );
  }
}