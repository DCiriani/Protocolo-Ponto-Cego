import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendClarificationAnswerEmail } from "@/lib/email/send-clarification-answer-email";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

type ResponderRequestBody = {
  answer?: string;
};

type ClarificationRequest = {
  id: string;
  submission_id: string;
  question: string;
  status: string;
};

type Submission = {
  name: string;
  email: string;
};

// A autenticação desta rota é feita pelo middleware (Basic Auth em
// /api/admin/:path*), o mesmo padrão das demais rotas admin.
export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const body = (await request
      .json()
      .catch(() => ({}))) as ResponderRequestBody;

    const answer = typeof body.answer === "string" ? body.answer.trim() : "";

    if (!answer) {
      return NextResponse.json(
        {
          ok: false,
          message: "Escreva uma resposta antes de enviar.",
        },
        { status: 400 }
      );
    }

    const { data: clarificationData, error: clarificationError } =
      await supabaseAdmin
        .from("clarification_requests")
        .select("id, submission_id, question, status")
        .eq("id", id)
        .single();

    if (clarificationError || !clarificationData) {
      return NextResponse.json(
        {
          ok: false,
          message: "Dúvida não encontrada.",
        },
        { status: 404 }
      );
    }

    const clarification = clarificationData as ClarificationRequest;

    if (clarification.status === "answered") {
      return NextResponse.json(
        {
          ok: false,
          message: "Esta dúvida já foi respondida.",
        },
        { status: 400 }
      );
    }

    const { data: submissionData, error: submissionError } =
      await supabaseAdmin
        .from("jornada_submissions")
        .select("name, email")
        .eq("id", clarification.submission_id)
        .single();

    if (submissionError || !submissionData) {
      console.error("Clarification answer submission fetch error:", submissionError);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível localizar a pessoa desta análise.",
        },
        { status: 500 }
      );
    }

    const submission = submissionData as Submission;

    // Envia o e-mail antes de marcar como respondida: se o envio falhar, a
    // dúvida continua 'pending' e o admin pode tentar novamente.
    try {
      await sendClarificationAnswerEmail({
        to: submission.email,
        name: submission.name,
        question: clarification.question,
        answer,
      });
    } catch (emailError) {
      console.error("Send clarification answer email error:", emailError);

      return NextResponse.json(
        {
          ok: false,
          message:
            emailError instanceof Error
              ? `Não foi possível enviar o e-mail: ${emailError.message}`
              : "Não foi possível enviar o e-mail de resposta.",
        },
        { status: 500 }
      );
    }

    const now = new Date().toISOString();

    const { error: updateError } = await supabaseAdmin
      .from("clarification_requests")
      .update({
        answer,
        status: "answered",
        answered_at: now,
        updated_at: now,
      })
      .eq("id", id);

    if (updateError) {
      console.error("Clarification answer update error:", updateError);

      return NextResponse.json(
        {
          ok: false,
          message:
            "O e-mail foi enviado, mas não foi possível salvar a resposta. Avise o suporte.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Answer clarification API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao responder dúvida.",
      },
      { status: 500 }
    );
  }
}
