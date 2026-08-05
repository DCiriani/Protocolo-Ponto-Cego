"use client";

import { useState } from "react";

export default function PrintReadingButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);

    try {
      const response = await fetch(`/api/leitura/${token}/pdf`);

      if (!response.ok) {
        throw new Error("Falha ao gerar o PDF.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "leitura-ponto-cego.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      alert(
        "Não foi possível gerar o PDF agora. Tente novamente em alguns instantes.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="rounded-full bg-[#88B39A] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Gerando PDF..." : "Baixar PDF"}
    </button>
  );
}