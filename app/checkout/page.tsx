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
      <main
        className="min-h-screen bg-[#0F2032] px-6 py-24 text-[#EDEAE3]"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <div className="mx-auto max-w-3xl">
          <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#8E9BA7]">
            Checkout
          </span>

          <h1
            className="text-4xl leading-tight tracking-[-0.02em] text-white"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
            }}
          >
            Verificando sua jornada...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#0F2032] px-6 py-24 text-[#EDEAE3]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#8E9BA7]">
          Checkout
        </span>

        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-[#C08552]">
          1º passo concluído ✔
        </span>

        <h1
          className="text-[2rem] leading-[1.12] tracking-[-0.01em] text-[#C08552] min-[390px]:text-[2.2rem] md:text-[3.4rem] md:leading-[1.08] lg:text-[3.8rem]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
          }}
        >
          Você deu o primeiro passo. Agora vem o que revela o padrão.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#AFBAC5]">
          Você contou o que te trouxe aqui. Agora você desbloqueia o
          questionário completo: cenas reais das suas relações, que revelam o
          que os testes comuns não alcançam. Depois que você responder, o
          psicólogo Diego Ciriani lê tudo pessoalmente e te mostra o padrão
          que se repete nas suas relações, o papel que você ocupa, o que ele
          te custa e por onde começa a mudança.
        </p>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#E0B877]">
          Não é teste automático. Não é conselho pronto. É uma leitura feita
          por um psicólogo, sobre você, no seu e-mail em até 48 horas.
        </p>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <ul className="space-y-3 text-sm leading-6 text-[#AFBAC5]">
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
            className="mt-8 rounded-full bg-[#7C8F6A] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#67795A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Iniciando pagamento..."
              : "Desbloquear meu questionário →"}
          </button>

          <p className="mt-4 text-xs text-[#E0B877]">
            Pagamento único e seguro via InfinityPay
          </p>

          <p className="mt-6 text-xs leading-6 text-[#7E8A96]">
            Seu pagamento será processado pela InfinityPay. Ao continuar,
            você declara estar ciente dos{" "}
            <a href="/termos" className="text-[#C08552] hover:text-[#E0B877]">
              Termos de Uso
            </a>{" "}
            e da{" "}
            <a
              href="/politica-de-privacidade"
              className="text-[#C08552] hover:text-[#E0B877]"
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
