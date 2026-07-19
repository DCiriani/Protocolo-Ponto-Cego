import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { buildAssistantPrompt, PROMPT_VERSION } from "@/lib/assistente/prompt";

export const maxDuration = 120;

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { data: submission, error: fetchError } = await supabaseAdmin
      .from("jornada_submissions")
      .select("id, raw_payload, payment_status, risk_level")
      .eq("id", id)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json({ ok: false, message: "Protocolo não encontrado." }, { status: 404 });
    }

    if (submission.payment_status !== "approved") {
      return NextResponse.json(
        { ok: false, message: "Protocolo ainda não foi pago." },
        { status: 400 }
      );
    }

    const payload = submission.raw_payload ?? {};
    const inputHash = createHash("sha256")
      .update(JSON.stringify(payload) + PROMPT_VERSION)
      .digest("hex");

    const forceNew = new URL(request.url).searchParams.get("force") === "1";

    if (!forceNew) {
      const { data: existing } = await supabaseAdmin
        .from("analysis_assistant_runs")
        .select("id, output, created_at, model")
        .eq("submission_id", id)
        .eq("input_hash", inputHash)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ ok: true, cached: true, run: existing });
      }
    }

    const model = "claude-sonnet-4-5";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 8000,
        system: buildAssistantPrompt(),
        messages: [
          {
            role: "user",
            content: `Protocolo para análise:\n\n${JSON.stringify(payload, null, 2)}\n\nNível de risco já classificado pelo sistema: ${submission.risk_level ?? "não classificado"}.\n\nResponda APENAS com o objeto JSON, sem markdown, sem preâmbulo.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Anthropic API error:", response.status, detail);
      return NextResponse.json(
        { ok: false, message: "Falha ao gerar análise assistida." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const rawText = (data.content ?? [])
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { text: string }) => block.text)
      .join("\n")
      .trim();

    let output;
    try {
      output = JSON.parse(rawText.replace(/^```json\s*/i, "").replace(/```$/, "").trim());
    } catch {
      console.error("Falha ao parsear saída do assistente:", rawText.slice(0, 500));
      return NextResponse.json(
        { ok: false, message: "O assistente respondeu em formato inesperado. Tente novamente." },
        { status: 502 }
      );
    }

    const { data: run, error: insertError } = await supabaseAdmin
      .from("analysis_assistant_runs")
      .insert({
        submission_id: id,
        model,
        prompt_version: PROMPT_VERSION,
        output,
        input_hash: inputHash,
      })
      .select("id, output, created_at, model")
      .single();

    if (insertError) {
      console.error("Insert assistant run error:", insertError);
      return NextResponse.json({ ok: true, cached: false, run: { output } });
    }

    return NextResponse.json({ ok: true, cached: false, run });
  } catch (error) {
    console.error("Assistente API error:", error);
    return NextResponse.json({ ok: false, message: "Erro interno." }, { status: 500 });
  }
}