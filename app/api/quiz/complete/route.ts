import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type QuizCompletionPayload = {
  anonymousId?: string;
  source?: string;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeSource(value?: string) {
  const source = value?.trim().slice(0, 80);
  return source || "direto";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as QuizCompletionPayload;
    const anonymousId = payload.anonymousId?.trim();

    if (!anonymousId || !UUID_PATTERN.test(anonymousId)) {
      return NextResponse.json(
        { ok: false, message: "Identificador anônimo inválido." },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin.from("quiz_completions").insert({
      anonymous_id: anonymousId,
      source: normalizeSource(payload.source),
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, alreadyCounted: true });
      }

      console.error("quiz/complete insert error:", error);

      return NextResponse.json(
        { ok: false, message: "Não foi possível registrar a conclusão." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, alreadyCounted: false });
  } catch (error) {
    console.error("quiz/complete API error:", error);

    return NextResponse.json(
      { ok: false, message: "Erro interno ao registrar conclusão." },
      { status: 500 },
    );
  }
}
