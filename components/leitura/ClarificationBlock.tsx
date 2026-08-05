"use client";

import { useState } from "react";

type ExistingClarification = {
  question: string;
  answer: string | null;
  status: "pending" | "answered";
};

const MIN_QUESTION_LENGTH = 10;
const MAX_QUESTION_LENGTH = 1000;

export default function ClarificationBlock({
  token,
  withinWindow,
  existing,
}: {
  token: string;
  withinWindow: boolean;
  existing: ExistingClarification | null;
}) {
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sent, setSent] = useState<ExistingClarification | null>(existing);

  async function sendQuestion() {
    setErrorMessage(null);

    const trimmed = question.trim();

    if (trimmed.length < MIN_QUESTION_LENGTH) {
      setErrorMessage(
        `Escreva ao menos ${MIN_QUESTION_LENGTH} caracteres para enviar sua dúvida.`
      );
      return;
    }

    if (trimmed.length > MAX_QUESTION_LENGTH) {
      setErrorMessage(
        `Sua dúvida pode ter no máximo ${MAX_QUESTION_LENGTH} caracteres.`
      );
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`/api/leitura/${token}/duvida`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(
          result?.message ?? "Não foi possível enviar sua dúvida."
        );
        setIsSending(false);
        return;
      }

      setSent({ question: trimmed, answer: null, status: "pending" });
    } catch {
      setErrorMessage("Erro ao enviar sua dúvida. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  }

  // Caso C — já respondida
  if (sent?.status === "answered") {
    return (
      <section className="mt-10 rounded-[2rem] border border-[#88B39A]/20 bg-[#88B39A]/[0.04] p-8 md:p-10 print:hidden">
        <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#88B39A]">
          Sua dúvida
        </span>

        <p className="text-lg text-[#F5F5F3]">
          Sua dúvida já foi respondida. Confira sua resposta no e-mail que
          enviamos.
        </p>

        <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-400">
          <p>
            <span className="text-zinc-600">Pergunta: </span>“{sent.question}”
          </p>
          <p>
            <span className="text-zinc-600">Resposta: </span>“{sent.answer}”
          </p>
        </div>
      </section>
    );
  }

  // Caso B — enviada, aguardando resposta
  if (sent?.status === "pending") {
    return (
      <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 print:hidden">
        <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-zinc-600">
          Sua dúvida
        </span>

        <p className="text-lg text-[#F5F5F3]">Sua dúvida foi enviada.</p>

        <p className="mt-2 text-sm leading-7 text-zinc-500">
          Você vai receber a resposta no seu e-mail assim que ela estiver
          pronta.
        </p>

        <p className="mt-6 text-sm leading-7 text-zinc-400">
          “{sent.question}”
        </p>
      </section>
    );
  }

  // Caso D — prazo encerrado, nenhuma dúvida enviada
  if (!withinWindow) {
    return (
      <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 print:hidden">
        <p className="text-sm text-zinc-500">
          Prazo para enviar a dúvida foi encerrado
        </p>
      </section>
    );
  }

  // Caso A — formulário disponível
  return (
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10 print:hidden">
      <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#88B39A]">
        Ficou alguma dúvida?
      </span>

      <p className="max-w-2xl text-sm leading-7 text-zinc-500">
        Você tem até 7 dias a contar da data do envio da sua análise para
        enviar uma dúvida pontual sobre o que recebeu.
      </p>

      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Escreva aqui sua dúvida..."
        maxLength={MAX_QUESTION_LENGTH}
        className="mt-6 min-h-[160px] w-full resize-y rounded-3xl border border-white/10 bg-black/30 p-6 text-base leading-8 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/50"
      />

      {errorMessage && (
        <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={sendQuestion}
          disabled={isSending}
          className="rounded-full bg-[#88B39A] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Enviando..." : "Enviar dúvida"}
        </button>
      </div>
    </section>
  );
}
