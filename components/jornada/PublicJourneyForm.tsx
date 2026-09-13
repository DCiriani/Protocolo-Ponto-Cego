"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { publicSteps } from "@/lib/jornada/publicSteps";
import type { PublicAnswers, Step } from "@/lib/jornada/types";

const storageKey = "ponto-cego-jornada-public-v1";

const initialAnswers: PublicAnswers = {
  name: "",
  email: "",
};

type StoredState = {
  answers?: Partial<PublicAnswers>;
  currentIndex?: number;
};

export default function PublicJourneyForm() {
  const searchParams = useSearchParams();
  const plano =
    searchParams.get("plano") === "leitura_devolutiva"
      ? "leitura_devolutiva"
      : "leitura";

  const [answers, setAnswers] = useState<PublicAnswers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentStep = publicSteps[currentIndex];
  const totalSteps = publicSteps.length;
  const isLastStep = currentIndex === publicSteps.length - 1;

  const progress = useMemo(() => {
    return Math.round(((currentIndex + 1) / totalSteps) * 100);
  }, [currentIndex, totalSteps]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredState;

        if (parsed.answers) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
          setAnswers({ ...initialAnswers, ...parsed.answers });
        }

        if (
          typeof parsed.currentIndex === "number" &&
          parsed.currentIndex >= 0 &&
          parsed.currentIndex < publicSteps.length
        ) {
          setCurrentIndex(parsed.currentIndex);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ answers, currentIndex }),
    );
  }, [answers, currentIndex, hasLoaded]);

  function setField(key: keyof PublicAnswers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function isStepValid(step?: Step) {
    if (!step) return true;

    if (step.type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email);
    }

    const value = answers[step.key as keyof PublicAnswers];
    return typeof value === "string" && value.trim().length > 0;
  }

  function getErrorMessage() {
    if (!touched || isStepValid(currentStep)) return "";

    if (currentStep?.type === "email") {
      return "Digite um e-mail válido para continuar.";
    }

    return "Responda esta etapa antes de continuar.";
  }

  async function startJornada() {
    const response = await fetch("/api/jornada/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: answers.name,
        email: answers.email,
        plano,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.orderId) {
      throw new Error(
        result?.message ?? "Não foi possível iniciar sua jornada agora.",
      );
    }

    return result.orderId as string;
  }

  async function goToPayment(orderId: string) {
    const response = await fetch("/api/checkout/preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.checkoutUrl) {
      throw new Error(
        result?.message ?? "Não foi possível iniciar o pagamento agora.",
      );
    }

    window.location.href = result.checkoutUrl as string;
  }

  async function goNext() {
    setTouched(true);

    if (!isStepValid(currentStep)) return;

    setTouched(false);

    if (isLastStep) {
      setIsProcessing(true);
      setErrorMessage("");

      try {
        const orderId = await startJornada();

        window.localStorage.setItem("ponto-cego-order-id", orderId);
        window.localStorage.removeItem(storageKey);

        await goToPayment(orderId);
        // Se chegou aqui sem lançar erro, o navegador já está sendo
        // redirecionado para o InfinityPay — não precisa desligar o loading.
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível iniciar o pagamento. Verifique sua conexão.",
        );
        setIsProcessing(false);
      }

      return;
    }

    setCurrentIndex((current) => Math.min(current + 1, publicSteps.length - 1));
  }

  function goBack() {
    setTouched(false);
    setErrorMessage("");
    setCurrentIndex((current) => Math.max(current - 1, 0));
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#F1F4F1] text-[#1E2B29]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(46,102,136,0.10),transparent_36%)]" />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-[#C9D3D6] bg-[#F1F4F1]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2E6688"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="12" r="3.4" />
              <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
            </svg>
            <span
              className="text-lg"
              style={{
                fontFamily: "var(--font-manrope), system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              Análise Ponto Cego
            </span>
          </Link>

          <span className="text-xs uppercase tracking-[0.25em] text-[#8A9992]">
            {currentIndex + 1} / {totalSteps}
          </span>
        </div>

        <div className="h-px w-full bg-[#C9D3D6]">
          <div
            className="h-px bg-[#2E6688] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-16 pt-32 md:px-8">
        <div className="w-full">
          {currentStep ? (
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <div>
                <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-[#8A9992]">
                  {currentStep.eyebrow}
                </span>

                <h1
                  className="max-w-3xl text-[1.75rem] leading-[1.15] tracking-[-0.015em] text-[#2E6688] min-[390px]:text-[1.9rem] md:text-[clamp(2rem,3.4vw,2.75rem)] md:leading-[1.15]"
                  style={{
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {currentStep.title}
                </h1>
                <p className="mt-8 max-w-xl whitespace-pre-wrap text-[18px] leading-8 text-[#52625D] md:text-[20px] md:leading-10">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <input
                  value={String(answers[currentStep.key as keyof PublicAnswers] ?? "")}
                  onChange={(event) =>
                    setField(currentStep.key as keyof PublicAnswers, event.target.value)
                  }
                  placeholder={currentStep.placeholder}
                  type={currentStep.type === "email" ? "email" : "text"}
                  className="w-full rounded-full border border-[#C9D3D6] bg-white px-7 py-5 text-lg text-[#1E2B29] outline-none transition placeholder:text-[#8A9992] focus:border-[#2E6688]/60"
                />

                {(getErrorMessage() || errorMessage) && (
                  <p className="mt-5 text-sm text-[#8C3A3A]">
                    {getErrorMessage() || errorMessage}
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isProcessing}
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#2E6688] px-9 py-5 text-[15px] font-semibold text-white transition hover:bg-[#234E68] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing
                      ? isLastStep
                        ? "Preparando pagamento..."
                        : "Enviando..."
                      : isLastStep
                        ? "Ir para o pagamento"
                        : "Continuar"}
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isProcessing}
                      className="inline-flex items-center justify-center rounded-full border border-[#C9D3D6] px-9 py-5 text-[15px] font-semibold text-[#52625D] transition hover:border-[#2E6688]/50 hover:text-[#1E2B29] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Voltar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
