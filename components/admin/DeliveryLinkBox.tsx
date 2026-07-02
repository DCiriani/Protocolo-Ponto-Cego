"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeliveryLinkBox({
  id,
  name,
  initialToken,
  deliveryEnabled,
  deliveryEmailSentAt,
  deliveryEmailError,
}: {
  id: string;
  name: string;
  initialToken: string | null;
  deliveryEnabled: boolean;
  deliveryEmailSentAt: string | null;
  deliveryEmailError: string | null;
}) {
  const router = useRouter();

  const [token, setToken] = useState(initialToken);
  const [emailSentAt, setEmailSentAt] = useState(deliveryEmailSentAt);
  const [emailError, setEmailError] = useState(deliveryEmailError);

  const [isCreating, setIsCreating] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const deliveryUrl =
    token && typeof window !== "undefined"
      ? `${window.location.origin}/leitura/${token}`
      : "";

  function formatDateTime(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  }

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

      if (result?.emailSent) {
        setEmailSentAt(new Date().toISOString());
        setEmailError(null);
        alert("Link gerado e e-mail enviado com sucesso.");
      } else if (result?.emailError) {
        setEmailError(result.emailError);
        alert(
          `Link gerado, mas o e-mail não foi enviado. Erro: ${result.emailError}`
        );
      } else {
        alert("Link de entrega gerado com sucesso.");
      }

      router.refresh();
    } catch {
      alert("Erro ao gerar link de entrega.");
    } finally {
      setIsCreating(false);
    }
  }

  async function sendDeliveryEmail() {
    setIsSendingEmail(true);

    try {
      const response = await fetch(`/api/admin/analises/${id}/delivery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          forceEmail: true,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        alert(result?.message ?? "Não foi possível enviar o e-mail.");
        setIsSendingEmail(false);
        return;
      }

      if (result?.token) {
        setToken(result.token);
      }

      if (result?.emailSent) {
        setEmailSentAt(new Date().toISOString());
        setEmailError(null);
        alert("E-mail da leitura enviado com sucesso.");
      } else {
        setEmailError(result?.emailError ?? "Não foi possível enviar o e-mail.");
        alert(result?.emailError ?? "Não foi possível enviar o e-mail.");
      }

      router.refresh();
    } catch {
      setEmailError("Erro ao enviar e-mail da leitura.");
      alert("Erro ao enviar e-mail da leitura.");
    } finally {
      setIsSendingEmail(false);
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
        Gere um link privado para a pessoa acessar a Leitura Ponto Cego. Ao
        gerar o link, o sistema envia automaticamente o e-mail para o cliente.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
        <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-600">
          E-mail da leitura
        </span>

        {emailSentAt ? (
          <div>
            <p className="text-sm font-medium text-[#88B39A]">
              E-mail enviado
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Enviado em {formatDateTime(emailSentAt)}
            </p>
          </div>
        ) : emailError ? (
          <div>
            <p className="text-sm font-medium text-red-300">
              Erro no envio do e-mail
            </p>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              {emailError}
            </p>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            Ainda não enviado.
          </p>
        )}
      </div>

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
              onClick={sendDeliveryEmail}
              disabled={isSendingEmail}
              className="rounded-full bg-[#88B39A] px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSendingEmail ? "Enviando..." : "Enviar por e-mail"}
            </button>

            <button
              type="button"
              onClick={copyDeliveryMessage}
              className="rounded-full border border-[#88B39A]/30 px-5 py-3 text-sm font-medium text-[#88B39A] transition hover:bg-[#88B39A]/10"
            >
              Copiar mensagem
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