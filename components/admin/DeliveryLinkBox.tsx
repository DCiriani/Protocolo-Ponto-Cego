"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryLinkBox({
  id,
  name,
  initialToken,
  deliveryEnabled,
}: {
  id: string;
  name: string;
  initialToken: string | null;
  deliveryEnabled: boolean;
}) {
  const router = useRouter();

  const [token, setToken] = useState(initialToken);
  const [isCreating, setIsCreating] = useState(false);

  const deliveryUrl =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/leitura/${token}`
      : "";

  async function createDeliveryLink() {
    setIsCreating(true);

    try {
      const response = await fetch(`/api/admin/analises/${id}/delivery`, {
        method: "POST",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        alert(result?.message ?? "Não foi possível gerar o link.");
        setIsCreating(false);
        return;
      }

      setToken(result.token);
      router.refresh();

      alert("Link de entrega gerado com sucesso.");
    } catch {
      alert("Erro ao gerar link de entrega.");
    } finally {
      setIsCreating(false);
    }
  }

  async function copyLink() {
    if (!deliveryUrl) return;

    await navigator.clipboard.writeText(deliveryUrl);
    alert("Link copiado.");
  }

  async function copyDeliveryMessage() {
    if (!deliveryUrl) return;

    const message = `Olá, ${name}.

Sua Leitura Ponto Cego está pronta.

Você pode acessá-la pelo link abaixo:
${deliveryUrl}

Recomendo que leia com calma, em um momento reservado.

Diego Ciriani`;

    await navigator.clipboard.writeText(message);
    alert("Mensagem de entrega copiada.");
  }

  return (
    <section className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
      <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-zinc-600">
        Entrega ao cliente
      </span>

      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F3] md:text-5xl">
        Link seguro da leitura.
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
        Gere um link privado para a pessoa acessar a Leitura Ponto Cego. O link
        só funciona se a entrega estiver ativada.
      </p>

      {token && deliveryEnabled ? (
        <div className="mt-8 rounded-3xl border border-[#88B39A]/20 bg-[#88B39A]/[0.04] p-5">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#88B39A]">
            Link ativo
          </p>

          <p className="break-all text-sm leading-7 text-zinc-300">
            {deliveryUrl}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyDeliveryMessage}
              className="rounded-full bg-[#88B39A] px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad]"
            >
              Copiar mensagem de entrega
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="rounded-full border border-[#88B39A]/30 px-5 py-3 text-sm font-medium text-[#88B39A] transition hover:bg-[#88B39A]/10"
            >
              Copiar só o link
            </button>

            <a
              href={deliveryUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-zinc-400 transition hover:border-[#88B39A]/40 hover:text-[#F5F5F3]"
            >
              Abrir leitura
            </a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={createDeliveryLink}
          disabled={isCreating}
          className="mt-8 rounded-full bg-[#88B39A] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCreating ? "Gerando..." : "Gerar link de entrega"}
        </button>
      )}
    </section>
  );
}