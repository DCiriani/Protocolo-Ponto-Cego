"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState<string | null>(null);
  const [status, setStatus] = useState<"checking" | "ready" | "blocked">(
    "checking",
  );
  const [price, setPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const id =
      searchParams.get("order") ??
      window.localStorage.getItem("ponto-cego-order-id");

    if (!id) {
      router.replace("/jornada");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- order id resolved once from URL/localStorage on mount
    setOrderId(id);

    fetch(`/api/checkout/status?orderId=${encodeURIComponent(id)}`)
      .then((response) => response.json())
      .then((result) => {
        if (!result?.ok || !result.allowed) {
          router.replace("/jornada");
          return;
        }

        setPrice(result.price ?? null);
        setStatus("ready");
      })
      .catch(() => {
        router.replace("/jornada");
      });
  }, [router, searchParams]);

  async function handleConfirm() {
    if (!orderId) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.checkoutUrl) {
        setErrorMessage(
          result?.message ?? "Não foi possível iniciar o pagamento.",
        );
        setIsSubmitting(false);
        return;
      }

      window.location.href = result.checkoutUrl;
    } catch {
      setErrorMessage("Erro ao iniciar o checkout.");
      setIsSubmitting(false);
    }
  }

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
        <div className="mx-auto max-w-3xl">
          <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
            Checkout
          </span>

          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em]">
            Verificando sua jornada...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-3xl">
        <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Checkout
        </span>

        <h1 className="font-satoshi text-[2rem] font-medium leading-[1.08] tracking-[-0.04em] text-[#6F8F5E] min-[390px]:text-[2.2rem] md:text-[3.8rem] md:leading-[1.02] lg:text-[4.4rem]">
          Antes de seguir para o pagamento.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Você vai receber uma leitura escrita, individual, feita por Diego
          Ciriani a partir das suas respostas. Ela chega no seu e-mail em até
          48 horas.
        </p>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Análise Ponto Cego
            </span>

            {price !== null && (
              <span className="text-2xl font-semibold text-[#F5F5F3]">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-400">
            <li>Leitura escrita e individual, feita por um psicólogo</li>
            <li>Entrega em até 48 horas no seu e-mail</li>
            <li>Pagamento único, sem assinatura</li>
          </ul>

          {errorMessage && (
            <p className="mt-6 text-sm text-red-300">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="mt-8 rounded-full bg-[#88B39A] px-7 py-4 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Iniciando pagamento..." : "Ir para pagamento"}
          </button>

          <p className="mt-6 text-xs leading-6 text-zinc-600">
            Seu pagamento será processado pelo Mercado Pago. Ao continuar,
            você declara estar ciente dos{" "}
            <a href="/termos" className="text-[#88B39A] hover:text-[#9fcaad]">
              Termos de Uso
            </a>{" "}
            e da{" "}
            <a
              href="/politica-de-privacidade"
              className="text-[#88B39A] hover:text-[#9fcaad]"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
