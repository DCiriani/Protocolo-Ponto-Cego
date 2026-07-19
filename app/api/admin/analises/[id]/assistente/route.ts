import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { buildAssistantPrompt, PROMPT_VERSION } from "@/lib/assistente/prompt";

export const maxDuration = 300;

type Params = { params: Promise<{ id: string }> };

function sse(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  const { data: submission, error: fetchError } = await supabaseAdmin
    .from("jornada_submissions")
    .select("id, raw_payload, payment_status, risk_level")
    .eq("id", id)
    .single();

  if (fetchError || !submission) {
    return new Response(
      sse("error", { message: "Protocolo não encontrado." }),
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }

  if (submission.payment_status !== "approved") {
    return new Response(
      sse("error", { message: "Protocolo ainda não foi pago." }),
      { headers: { "Content-Type": "text/event-stream" } }
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
      return new Response(sse("done", { cached: true, run: existing }), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }
  }

  const model = "claude-sonnet-4-5";

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(sse(event, data)));
      };

      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(": keep-alive\n\n"));
      }, 10000);

      try {
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
            stream: true,
            system: buildAssistantPrompt(),
            messages: [
              {
                role: "user",
                content: `Protocolo para análise:\n\n${JSON.stringify(payload, null, 2)}\n\nNível de risco já classificado pelo sistema: ${submission.risk_level ?? "não classificado"}.\n\nResponda APENAS com o objeto JSON, sem markdown, sem preâmbulo.`,
              },
            ],
          }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.text().catch(() => "");
          console.error("Anthropic API error:", response.status, detail);
          send("error", { message: "Falha ao gerar análise assistida." });
          clearInterval(keepAlive);
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";
        let charCount = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const raw = line.slice(6).trim();
            if (!raw || raw === "[DONE]") continue;

            try {
              const parsed = JSON.parse(raw);

              if (
                parsed.type === "content_block_delta" &&
                parsed.delta?.type === "text_delta"
              ) {
                fullText += parsed.delta.text;
                charCount += parsed.delta.text.length;
                send("progress", { chars: charCount });
              }
            } catch {
              // linha parcial, ignora
            }
          }
        }

        let output;
        try {
          output = JSON.parse(
            fullText
              .replace(/^```json\s*/i, "")
              .replace(/```$/, "")
              .trim()
          );
        } catch {
          console.error("Falha ao parsear saída:", fullText.slice(0, 500));
          send("error", {
            message: "O assistente respondeu em formato inesperado. Tente novamente.",
          });
          clearInterval(keepAlive);
          controller.close();
          return;
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
          send("done", {
            cached: false,
            run: {
              id: "temp",
              output,
              created_at: new Date().toISOString(),
              model,
            },
          });
        } else {
          send("done", { cached: false, run });
        }
      } catch (error) {
        console.error("Assistente stream error:", error);
        send("error", { message: "Erro interno ao gerar análise." });
      } finally {
        clearInterval(keepAlive);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}