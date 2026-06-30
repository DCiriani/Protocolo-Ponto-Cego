"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAnalysisButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteAnalysis() {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a análise de ${name}? Esta ação apaga respostas, leitura e link de entrega. Não dá para desfazer.`
    );

    if (!confirmed) {
      return;
    }

    const doubleConfirmed = window.confirm(
      "Confirma novamente? Esta análise será removida definitivamente do banco."
    );

    if (!doubleConfirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/analises/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Não foi possível excluir a análise.");
        setIsDeleting(false);
        return;
      }

      alert("Análise excluída com sucesso.");
      router.push("/admin");
      router.refresh();
    } catch {
      alert("Erro ao excluir análise.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="mt-12 rounded-[2rem] border border-red-500/20 bg-red-500/[0.04] p-8 md:p-10">
      <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-red-300">
        Zona de exclusão
      </span>

      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F3] md:text-5xl">
        Excluir análise.
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
        Use esta opção apenas para testes ou quando você realmente quiser apagar
        todos os dados desta submissão: respostas, leitura e link público.
      </p>

      <button
        type="button"
        onClick={deleteAnalysis}
        disabled={isDeleting}
        className="mt-8 rounded-full border border-red-500/30 px-6 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "Excluindo..." : "Excluir análise inteira"}
      </button>
    </section>
  );
}