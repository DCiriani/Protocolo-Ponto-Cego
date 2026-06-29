"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnalysisNotesForm({
  id,
  initialNotes,
}: {
  id: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);

  async function saveNotes() {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/analises/${id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes,
        }),
      });

      if (!response.ok) {
        alert("Não foi possível salvar a leitura.");
        setIsSaving(false);
        return;
      }

      router.refresh();
      alert("Leitura salva com sucesso.");
    } catch {
      alert("Erro ao salvar leitura.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mb-12 rounded-[2rem] border border-[#88B39A]/20 bg-[#88B39A]/[0.04] p-8 md:p-10">
      <div className="mb-8">
        <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#88B39A]">
          Leitura Ponto Cego
        </span>

        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F3] md:text-5xl">
          Construção da leitura.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
          Use este campo para registrar a leitura clínica, hipóteses de padrão,
          pontos de atenção e direção da devolutiva.
        </p>
      </div>

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Escreva aqui a Leitura Ponto Cego..."
        className="min-h-[320px] w-full resize-y rounded-3xl border border-white/10 bg-black/30 p-6 text-base leading-8 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/50"
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={saveNotes}
          disabled={isSaving}
          className="rounded-full bg-[#88B39A] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Salvando..." : "Salvar leitura"}
        </button>
      </div>
    </section>
  );
}