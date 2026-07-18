"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  publicSteps,
  relationshipStatusOptions,
  ageRangeOptions,
  relationshipDurationOptions,
  discomfortDurationOptions,
  therapyHistoryOptions,
  screeningMoodOptions,
  screeningFunctioningOptions,
  screeningIdeationOptions,
  screeningCopy,
} from "@/lib/jornada/publicSteps";
import type { PublicAnswers, Step } from "@/lib/jornada/types";

const storageKey = "ponto-cego-jornada-public-v1";

const MIN_MAIN_QUESTION_LENGTH = 10;
const LENGTH_HINT_MESSAGE =
  "Conta um pouco mais. Quanto mais detalhe você trouxer, mais precisa fica a sua leitura.";

const initialAnswers: PublicAnswers = {
  name: "",
  email: "",
  relationshipStatus: "",
  ageRange: "",
  relationshipDuration: "",
  discomfortDuration: "",
  therapyHistory: "",
  mainQuestion: "",
  screeningMood: "",
  screeningFunctioning: "",
  screeningIdeation: "",
};

type StoredState = {
  answers?: Partial<PublicAnswers>;
  currentIndex?: number;
  orderId?: string | null;
};

export default function PublicJourneyForm() {
  const router = useRouter();

  const [answers, setAnswers] = useState<PublicAnswers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isCheckingGate, setIsCheckingGate] = useState(false);
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

        if (typeof parsed.orderId === "string") {
          setOrderId(parsed.orderId);
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
      JSON.stringify({ answers, currentIndex, orderId }),
    );
  }, [answers, currentIndex, orderId, hasLoaded]);

  function setField(key: keyof PublicAnswers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function isStepValid(step?: Step) {
    if (!step) return true;

    if (step.type === "context") {
      return [
        answers.relationshipStatus,
        answers.ageRange,
        answers.relationshipDuration,
        answers.discomfortDuration,
        answers.therapyHistory,
      ].every((value) => value.trim().length > 0);
    }

    if (step.key === "mainQuestion") {
      return (
        answers.mainQuestion.trim().length > 0 &&
        answers.screeningMood.trim().length > 0 &&
        answers.screeningFunctioning.trim().length > 0 &&
        answers.screeningIdeation.trim().length > 0
      );
    }

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

    if (currentStep?.type === "context") {
      return "Responda todos os blocos de contexto antes de continuar.";
    }

    if (currentStep?.key === "mainQuestion") {
      return "Responda a pergunta central e as 3 perguntas do rastreio antes de continuar.";
    }

    return "Responda esta etapa antes de continuar.";
  }

  async function startJornada() {
    if (orderId || isStarting) return orderId;

    setIsStarting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/jornada/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: answers.name, email: answers.email }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.orderId) {
        setErrorMessage(
          result?.message ?? "Não foi possível iniciar sua jornada agora.",
        );
        return null;
      }

      setOrderId(result.orderId);
      return result.orderId as string;
    } catch {
      setErrorMessage(
        "Não foi possível iniciar sua jornada. Verifique sua conexão.",
      );
      return null;
    } finally {
      setIsStarting(false);
    }
  }

  async function submitGate(currentOrderId: string) {
    setIsCheckingGate(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/jornada/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: currentOrderId,
          publicAnswers: {
            relationshipStatus: answers.relationshipStatus,
            ageRange: answers.ageRange,
            relationshipDuration: answers.relationshipDuration,
            discomfortDuration: answers.discomfortDuration,
            therapyHistory: answers.therapyHistory,
            mainQuestion: answers.mainQuestion,
            screeningMood: answers.screeningMood,
            screeningFunctioning: answers.screeningFunctioning,
            screeningIdeation: answers.screeningIdeation,
          },
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (!result?.tooShort) {
          setErrorMessage(
            result?.message ?? "Não foi possível continuar agora.",
          );
        }
        setIsCheckingGate(false);
        return;
      }

      window.localStorage.setItem("ponto-cego-order-id", currentOrderId);
      window.localStorage.removeItem(storageKey);

      if (result.allowed) {
        router.push("/checkout");
      } else {
        router.push("/acolhimento");
      }
    } catch {
      setErrorMessage(
        "Não foi possível continuar. Verifique sua conexão e tente novamente.",
      );
      setIsCheckingGate(false);
    }
  }

  async function goNext() {
    setTouched(true);

    if (!isStepValid(currentStep)) return;

    setTouched(false);

    if (currentStep?.key === "email") {
      const id = await startJornada();
      if (!id) return;
    }

    if (isLastStep) {
      const id = orderId ?? (await startJornada());
      if (!id) return;
      await submitGate(id);
      return;
    }

    setCurrentIndex((current) => Math.min(current + 1, publicSteps.length - 1));
  }

  function goBack() {
    setTouched(false);
    setErrorMessage("");
    setCurrentIndex((current) => Math.max(current - 1, 0));
  }

  const isBusy = isStarting || isCheckingGate;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F5F5F3]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(136,179,154,0.1),transparent_34%)]" />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full border border-[#88B39A]" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">
              Ponto Cego
            </span>
          </Link>

          <span className="text-xs uppercase tracking-[0.25em] text-zinc-600">
            {currentIndex + 1} / {totalSteps}
          </span>
        </div>

        <div className="h-px w-full bg-white/10">
          <div
            className="h-px bg-[#88B39A] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-5 pb-16 pt-32 md:px-8">
        <div className="w-full">
          {currentStep ? (
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <div>
                <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
                  {currentStep.eyebrow}
                </span>

                <h1 className="max-w-3xl font-satoshi text-[2.15rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#6F8F5E] min-[390px]:text-[2.35rem] md:text-[clamp(2.8rem,5.8vw,6.2rem)] md:leading-[1.02]">
                  {currentStep.title}
                </h1>
                <p className="mt-8 max-w-xl whitespace-pre-wrap text-[18px] leading-8 text-zinc-400 md:text-[20px] md:leading-10">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                {renderField(currentStep, answers, setField)}

                {currentStep.key === "mainQuestion" && (
                  <>
                    {answers.mainQuestion.trim().length > 0 &&
                      answers.mainQuestion.trim().length <
                        MIN_MAIN_QUESTION_LENGTH && (
                        <p className="mt-4 text-sm text-zinc-500">
                          {LENGTH_HINT_MESSAGE}
                        </p>
                      )}

                    <ScreeningCard answers={answers} setField={setField} />
                  </>
                )}

                {(getErrorMessage() || errorMessage) && (
                  <p className="mt-5 text-sm text-[#88B39A]">
                    {getErrorMessage() || errorMessage}
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isBusy}
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#88B39A] px-9 py-5 text-[15px] font-semibold text-[#0A0A0A] transition hover:bg-[#9FC2AD] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isBusy
                      ? "Enviando..."
                      : isLastStep
                        ? "Continuar"
                        : "Continuar"}
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isBusy}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 px-9 py-5 text-[15px] font-semibold text-zinc-400 transition hover:border-[#88B39A]/50 hover:text-[#F5F5F3] disabled:cursor-not-allowed disabled:opacity-60"
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

function renderField(
  step: Step,
  answers: PublicAnswers,
  setField: (key: keyof PublicAnswers, value: string) => void,
) {
  const value = answers[step.key as keyof PublicAnswers];

  if (step.type === "textarea") {
    return (
      <div>
        {step.guide && <FieldGuide>{step.guide}</FieldGuide>}

        <textarea
          value={String(value ?? "")}
          onChange={(event) =>
            setField(step.key as keyof PublicAnswers, event.target.value)
          }
          placeholder={step.placeholder}
          rows={10}
          className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 text-lg leading-8 text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
        />
      </div>
    );
  }

  if (step.type === "input" || step.type === "email") {
    return (
      <input
        value={String(value ?? "")}
        onChange={(event) =>
          setField(step.key as keyof PublicAnswers, event.target.value)
        }
        placeholder={step.placeholder}
        type={step.type === "email" ? "email" : "text"}
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-7 py-5 text-lg text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
      />
    );
  }

  if (step.type === "context") {
    return (
      <div className="space-y-8">
        <ContextChoiceGroup
          label="Qual é o seu momento relacional hoje?"
          options={relationshipStatusOptions}
          selected={answers.relationshipStatus}
          onSelect={(option) => setField("relationshipStatus", option)}
          variant="list"
        />

        <ContextChoiceGroup
          label="Pensando na relação atual ou na última que mais te marcou, quanto tempo ela dura ou durou?"
          options={relationshipDurationOptions}
          selected={answers.relationshipDuration}
          onSelect={(option) => setField("relationshipDuration", option)}
        />

        <ContextChoiceGroup
          label="Há quanto tempo esse incômodo aparece nas suas relações?"
          options={discomfortDurationOptions}
          selected={answers.discomfortDuration}
          onSelect={(option) => setField("discomfortDuration", option)}
        />

        <ContextChoiceGroup
          label="Qual é a sua faixa etária?"
          options={ageRangeOptions}
          selected={answers.ageRange}
          onSelect={(option) => setField("ageRange", option)}
        />

        <ContextChoiceGroup
          label="Você já fez ou faz terapia?"
          options={therapyHistoryOptions}
          selected={answers.therapyHistory}
          onSelect={(option) => setField("therapyHistory", option)}
        />
      </div>
    );
  }

  return null;
}

function FieldGuide({ children }: { children: string }) {
  return (
    <p className="mb-4 text-[0.95rem] font-medium leading-7 text-[#6F8F5E] md:text-[1.3rem]">
      {children}
    </p>
  );
}

function ContextChoiceGroup({
  label,
  options,
  selected,
  onSelect,
  variant = "pills",
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  variant?: "list" | "pills";
}) {
  return (
    <div>
      <p className="mb-4 font-satoshi text-[0.82rem] font-medium uppercase tracking-[0.24em] text-[#6F8F5E] md:text-[0.9rem]">
        {label}
      </p>

      <div
        className={variant === "list" ? "grid gap-3" : "flex flex-wrap gap-3"}
      >
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`border text-left transition ${
                variant === "list"
                  ? "rounded-2xl px-6 py-4 text-base leading-7"
                  : "rounded-full px-5 py-3 text-sm leading-6"
              } ${
                isSelected
                  ? "border-[#88B39A] bg-[#88B39A]/10 text-[#F5F5F3]"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScreeningCard({
  answers,
  setField,
}: {
  answers: PublicAnswers;
  setField: (key: keyof PublicAnswers, value: string) => void;
}) {
  return (
    <div className="mt-10 rounded-[1.75rem] border border-zinc-700/60 bg-zinc-900/40 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
        {screeningCopy.eyebrow}
      </p>

      <h3 className="mt-4 text-xl font-medium leading-tight text-zinc-100 md:text-2xl">
        {screeningCopy.title}
      </h3>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-400">
        {screeningCopy.description}
      </p>

      <div className="mt-8 space-y-7">
        <GrayChoiceGroup
          label={screeningCopy.moodLabel}
          options={screeningMoodOptions}
          selected={answers.screeningMood}
          onSelect={(value) => setField("screeningMood", value)}
        />

        <GrayChoiceGroup
          label={screeningCopy.functioningLabel}
          options={screeningFunctioningOptions}
          selected={answers.screeningFunctioning}
          onSelect={(value) => setField("screeningFunctioning", value)}
        />

        <GrayChoiceGroup
          label={screeningCopy.ideationLabel}
          options={screeningIdeationOptions}
          selected={answers.screeningIdeation}
          onSelect={(value) => setField("screeningIdeation", value)}
        />
      </div>

      <p className="mt-8 border-t border-zinc-800 pt-6 text-xs leading-6 text-zinc-500">
        {screeningCopy.footer}
      </p>
    </div>
  );
}

function GrayChoiceGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
<p className="mb-3 text-sm leading-6 text-[#6F8F5E]">{label}</p>

      <div className="grid gap-2">
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-xl border px-4 py-3 text-left text-sm leading-6 transition ${
                isSelected
                  ? "border-zinc-400 bg-white/10 text-zinc-100"
                  : "border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
