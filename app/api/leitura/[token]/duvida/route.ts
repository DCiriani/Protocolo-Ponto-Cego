import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendClarificationAlert } from "@/lib/alerts";
import { getClarificationWindow } from "@/lib/clarification/deadline";

type Params = {
  params: Promise<{
    token: string;
  }>;
};

type DuvidaRequestBody = {
  question?: string;
};

type Submission = {
  id: string;
  name: string;
  email: string;
  delivery_created_at: string | null;
};

const MIN_QUESTION_LENGTH = 10;
const MAX_QUESTION_LENGTH = 1000;

export async function POST(request: Request, { params }: Params) {
  try {
    const { token } = await params;

    const body = (await request.json().catch(() => ({}))) as DuvidaRequestBody;
    const question = typeof body.question === "string" ? body.question.trim() : "";

    const { data: submissionData, error: submissionError } = await supabaseAdmin
      .from("jornada_submissions")
      .select("id, name, email, delivery_created_at")
      .eq("delivery_token", token)
      .eq("delivery_enabled", true)
      .single();

    if (submissionError || !submissionData) {
      return NextResponse.json(
        {
          ok: false,
          message: "Leitura não encontrada.",
        },
        { status: 404 }
      );
    }

    const submission = submissionData as Submission;

    const { withinWindow } = getClarificationWindow(
      submission.delivery_created_at
    );

    if (!withinWindow) {
      return NextResponse.json(
        {
          ok: false,
          message: "O prazo para enviar dúvidas foi encerrado.",
        },
        { status: 403 }
      );
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("clarification_requests")
      .select("id")
      .eq("submission_id", submission.id)
      .maybeSingle();

    if (existingError) {
      console.error("Clarification existing lookup error:", existingError);

      return NextResponse.json(
        {
          ok: false,
          message: "Erro interno ao enviar dúvida.",
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          ok: false,
          message: "Você já enviou uma dúvida sobre esta análise.",
        },
        { status: 409 }
      );
    }

    if (
      question.length < MIN_QUESTION_LENGTH ||
      question.length > MAX_QUESTION_LENGTH
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: `A dúvida precisa ter entre ${MIN_QUESTION_LENGTH} e ${MAX_QUESTION_LENGTH} caracteres.`,
        },
        { status: 400 }
      );
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("clarification_requests")
      .insert({
        submission_id: submission.id,
        question,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      // A unique constraint em submission_id cobre corridas de duas
      // submissões simultâneas para a mesma leitura.
      console.error("Clarification insert error:", insertError);

      return NextResponse.json(
        {
          ok: false,
          message: "Você já enviou uma dúvida sobre esta análise.",
        },
        { status: 409 }
      );
    }

    await sendClarificationAlert({
      name: submission.name,
      email: submission.email,
      question,
      clarificationId: inserted.id,
      submissionId: submission.id,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Send clarification API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao enviar dúvida.",
      },
      { status: 500 }
    );
  }
}
