"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClarificationAnswerForm({ id }: { id: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function sendAnswer() {
    if (!answer.trim()) {
      alert("Escreva uma resposta antes de enviar.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`/api/admin/duvidas/${id}/responder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: answer.trim() }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        alert(result?.message ?? "Não foi possível enviar a resposta.");
        setIsSending(false);
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao enviar resposta.");
      setIsSending(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-6 rounded-full border border-[#C08552]/35 px-5 py-2.5 text-xs font-medium text-[#E0B877] transition hover:bg-[#C08552]/10"
      >
        Responder
      </button>
    );
  }

  return (
    <div className="mt-6">
      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Escreva a resposta que será enviada por e-mail..."
        className="min-h-[160px] w-full resize-y rounded-3xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-[#DCE2E8] outline-none transition placeholder:text-[#5B6673] focus:border-[#C08552]/50"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={sendAnswer}
          disabled={isSending}
          className="rounded-full bg-[#C08552] px-5 py-2.5 text-sm font-semibold text-[#0F2032] transition hover:bg-[#d19765] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? "Enviando..." : "Enviar resposta"}
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={isSending}
          className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-[#8E9BA7] transition hover:text-[#DCE2E8]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
