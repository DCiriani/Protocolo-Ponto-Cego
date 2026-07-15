"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { PrivateAnswers, Step } from "@/lib/jornada/types";

const storageKey = "ponto-cego-jornada-private-v1";

const MIN_SCENE_LENGTH = 250;
const LENGTH_HINT_MESSAGE =
  "Conta um pouco mais. Quanto mais detalhe você trouxer, mais precisa fica a sua leitura.";

const sceneFieldsWithMinLength: readonly string[] = [
  "sceneConflict",
  "reactionPurpose",
  "sceneProximity",
  "mirrorTruth",
  "intentionImpact",
  "desireFear",
];

function isSceneFieldTooShort(value: string) {
  const length = value.trim().length;
  return length > 0 && length < MIN_SCENE_LENGTH;
}

const initialAnswers: PrivateAnswers = {
  sceneConflict: "",
  reactionSelections: [],
  reactionPurpose: "",
  sceneProximity: "",
  mirrorCriticism: "",
  mirrorTruth: "",
  intentionImpact: "",
  patternHypothesis: "",
  desireFear: "",
  consent: false,
};

type Props = {
  orderId: string;
  steps: Step[];
  reactionOptions: string[];
};

export default function PaidJourneyForm({
  orderId,
  steps,
  reactionOptions,
}: Props) {
  const router = useRouter();

  const [answers, setAnswers] = useState<PrivateAnswers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isReview = currentIndex === steps.length;
  const currentStep = steps[currentIndex];
  const totalSteps = steps.length + 1;

  const progress = useMemo(() => {
    return Math.round(((currentIndex + 1) / totalSteps) * 100);
  }, [currentIndex, totalSteps]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          answers?: Partial<PrivateAnswers>;
          currentIndex?: number;
        };

        if (parsed.answers) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
          setAnswers({ ...initialAnswers, ...parsed.answers });
        }

        if (
          typeof parsed.currentIndex === "number" &&
          parsed.currentIndex >= 0 &&
          parsed.currentIndex <= steps.length
        ) {
          setCurrentIndex(parsed.currentIndex);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    setHasLoaded(true);
  }, [steps.length]);

  useEffect(() => {
    if (!hasLoaded) return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ answers, currentIndex }),
    );
  }, [answers, currentIndex, hasLoaded]);

  function setField(
    key: keyof PrivateAnswers,
    value: PrivateAnswers[keyof PrivateAnswers],
  ) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function isStepValid(step?: Step) {
    if (!step) return true;

    if (step.type === "reaction") {
      return (
        answers.reactionSelections.length > 0 &&
        answers.reactionSelections.length <= 2 &&
        answers.reactionPurpose.trim().length >= MIN_SCENE_LENGTH
      );
    }

    if (step.type === "mirror") {
      return (
        answers.mirrorCriticism.trim().length > 0 &&
        answers.mirrorTruth.trim().length >= MIN_SCENE_LENGTH
      );
    }

    const value = answers[step.key as keyof PrivateAnswers];

    if (step.type === "consent") {
      return value === true;
    }

    if (
      typeof value === "string" &&
      sceneFieldsWithMinLength.includes(step.key)
    ) {
      return value.trim().length >= MIN_SCENE_LENGTH;
    }

    return typeof value === "string" && value.trim().length > 0;
  }

  function getErrorMessage() {
    if (!touched || isReview || isStepValid(currentStep)) return "";

    if (currentStep?.type === "reaction") {
      if (answers.reactionSelections.length === 0) {
        return "Escolha uma ou duas reações para continuar.";
      }

      if (answers.reactionPurpose.trim().length === 0) {
        return "Conte também o que você tenta conseguir ou evitar quando reage assim.";
      }

      return LENGTH_HINT_MESSAGE;
    }

    if (currentStep?.type === "mirror") {
      if (
        answers.mirrorCriticism.trim().length === 0 ||
        answers.mirrorTruth.trim().length === 0
      ) {
        return "Preencha os dois campos desta etapa antes de continuar.";
      }

      return LENGTH_HINT_MESSAGE;
    }

    if (currentStep?.type === "consent") {
      return "Confirme que você compreende o objetivo da análise.";
    }

    if (currentStep && sceneFieldsWithMinLength.includes(currentStep.key)) {
      const value = answers[currentStep.key as keyof PrivateAnswers];

      if (typeof value === "string" && value.trim().length === 0) {
        return "Responda esta etapa antes de continuar.";
      }

      return LENGTH_HINT_MESSAGE;
    }

    return "Responda esta etapa antes de continuar.";
  }

  function goNext() {
    setTouched(true);

    if (!isStepValid(currentStep)) return;

    setTouched(false);
    setCurrentIndex((current) => Math.min(current + 1, steps.length));
  }

  function goBack() {
    setTouched(false);
    setCurrentIndex((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit() {
    const invalidIndex = steps.findIndex((step) => !isStepValid(step));

    if (invalidIndex !== -1) {
      setCurrentIndex(invalidIndex);
      setTouched(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/jornada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, answers }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Jornada submit error:", result);

        setErrorMessage(
          result?.message ??
            "Não foi possível enviar suas respostas agora. Por favor, tente novamente.",
        );

        setIsSubmitting(false);
        return;
      }

      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem("ponto-cego-order-id");

      router.push(`/jornada/concluida?id=${result?.id ?? ""}`);
    } catch (error) {
      console.error("Jornada submit error:", error);

      setErrorMessage(
        "Não foi possível enviar suas respostas agora. Verifique sua conexão e tente novamente.",
      );

      setIsSubmitting(false);
    }
  }

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
          {!isReview && currentStep ? (
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
                {renderField(currentStep, answers, setField, reactionOptions)}

                {getErrorMessage() && (
                  <p className="mt-5 text-sm text-[#88B39A]">
                    {getErrorMessage()}
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={goNext}
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#88B39A] px-9 py-5 text-[15px] font-semibold text-[#0A0A0A] transition hover:bg-[#9FC2AD]"
                  >
                    Continuar
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 px-9 py-5 text-[15px] font-semibold text-zinc-400 transition hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
                    >
                      Voltar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <ReviewStep
              onBack={goBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              totalSteps={steps.length}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function renderField(
  step: Step,
  answers: PrivateAnswers,
  setField: (
    key: keyof PrivateAnswers,
    value: PrivateAnswers[keyof PrivateAnswers],
  ) => void,
  reactionOptions: string[],
) {
  const value = answers[step.key as keyof PrivateAnswers];

  if (step.type === "textarea") {
    return (
      <div>
        {step.guide && <FieldGuide>{step.guide}</FieldGuide>}

        <textarea
          value={String(value ?? "")}
          onChange={(event) =>
            setField(step.key as keyof PrivateAnswers, event.target.value)
          }
          placeholder={step.placeholder}
          rows={10}
          className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 text-lg leading-8 text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
        />

        <LengthHint value={String(value ?? "")} />
      </div>
    );
  }

  if (step.type === "reaction") {
    const selectedOptions = answers.reactionSelections;
    const reachedLimit = selectedOptions.length >= 2;

    function toggleOption(option: string) {
      if (selectedOptions.includes(option)) {
        setField(
          "reactionSelections",
          selectedOptions.filter((item) => item !== option),
        );
        return;
      }

      if (reachedLimit) return;

      setField("reactionSelections", [...selectedOptions, option]);
    }

    return (
      <div className="space-y-9">
        <div>
          <p className="mb-4 font-satoshi text-[0.82rem] font-medium uppercase tracking-[0.24em] text-[#6F8F5E] md:text-[0.9rem]">
            Escolha até duas opções
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {reactionOptions.map((option) => {
              const selected = selectedOptions.includes(option);
              const disabled = reachedLimit && !selected;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  disabled={disabled}
                  className={`rounded-2xl border px-5 py-4 text-left text-sm leading-6 transition ${
                    selected
                      ? "border-[#88B39A] bg-[#88B39A]/10 text-[#F5F5F3]"
                      : disabled
                        ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-zinc-700"
                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-4 font-satoshi text-[0.82rem] font-medium uppercase tracking-[0.24em] text-[#6F8F5E] md:text-[0.9rem]">
            {step.secondaryTitle}
          </p>

          <textarea
            value={answers.reactionPurpose}
            onChange={(event) =>
              setField("reactionPurpose", event.target.value)
            }
            placeholder={step.secondaryPlaceholder}
            rows={5}
            className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 text-lg leading-8 text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
          />

          <LengthHint value={answers.reactionPurpose} />
        </div>
      </div>
    );
  }

  if (step.type === "mirror") {
    return (
      <div className="space-y-8">
        <div>
          <label className="mb-4 block font-satoshi text-[0.88rem] font-medium uppercase tracking-[0.24em] text-[#6F8F5E] md:text-[0.95rem]">
            {step.fieldLabel}
          </label>
          <input
            value={answers.mirrorCriticism}
            onChange={(event) =>
              setField("mirrorCriticism", event.target.value)
            }
            placeholder={step.placeholder}
            type="text"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] px-7 py-5 text-lg text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
          />
        </div>

        <div>
          <label className="mb-4 block font-satoshi text-[0.88rem] font-medium uppercase tracking-[0.24em] text-[#6F8F5E] md:text-[0.95rem]">
            {step.secondaryTitle}
          </label>

          <textarea
            value={answers.mirrorTruth}
            onChange={(event) => setField("mirrorTruth", event.target.value)}
            placeholder={step.secondaryPlaceholder}
            rows={6}
            className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 text-lg leading-8 text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
          />

          <LengthHint value={answers.mirrorTruth} />
        </div>
      </div>
    );
  }

  if (step.type === "consent") {
    const checked = Boolean(value);

    return (
      <button
        type="button"
        onClick={() => setField(step.key as keyof PrivateAnswers, !checked)}
        className={`flex gap-5 rounded-[2rem] border p-7 text-left transition ${
          checked
            ? "border-[#88B39A] bg-[#88B39A]/10"
            : "border-white/10 bg-white/[0.03] hover:border-[#88B39A]/50"
        }`}
      >
        <span
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
            checked
              ? "border-[#88B39A] bg-[#88B39A] text-[#0A0A0A]"
              : "border-white/20"
          }`}
        >
          {checked ? "✓" : ""}
        </span>

        <span className="text-lg leading-8 text-zinc-300">{step.helper}</span>
      </button>
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

function LengthHint({ value }: { value: string }) {
  if (!isSceneFieldTooShort(value)) return null;

  return <p className="mt-3 text-sm text-zinc-500">{LENGTH_HINT_MESSAGE}</p>;
}

function ReviewStep({
  onBack,
  onSubmit,
  isSubmitting,
  errorMessage,
  totalSteps,
}: {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errorMessage: string;
  totalSteps: number;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
        Envio
      </span>

      <h1 className="max-w-4xl font-satoshi text-[2.15rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#6F8F5E] min-[390px]:text-[2.35rem] md:text-[clamp(2.8rem,5.8vw,6.2rem)] md:leading-[1.02]">
        Suas respostas estão prontas.
      </h1>

      <p className="mt-8 max-w-3xl text-[18px] leading-8 text-zinc-400 md:text-[20px] md:leading-10">
        Antes de enviar, confere uma coisa só: se o que você escreveu representa
        o que você viveu de verdade. Não precisa estar bonito. Quanto mais
        honesto o relato, mais individual a leitura.
        <br />
        <br />
        Depois do envio, suas respostas são lidas pessoalmente por Diego
        Ciriani. A devolutiva chega no seu e-mail em até 48 horas.
      </p>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Etapas respondidas"
          value={`${totalSteps} de ${totalSteps}`}
        />
      </div>

      {errorMessage && (
        <p className="mt-8 text-sm text-red-300">{errorMessage}</p>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#88B39A] px-9 py-5 text-[15px] font-semibold text-[#0A0A0A] transition hover:bg-[#9FC2AD] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar para análise"}
          <span className="transition group-hover:translate-x-1">→</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-9 py-5 text-[15px] font-semibold text-zinc-400 transition hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
        >
          Voltar e revisar
        </button>
      </div>

      <p className="mt-6 text-sm leading-6 text-zinc-600">
        Ao enviar, suas respostas serão registradas para a elaboração da sua
        Análise Ponto Cego.
      </p>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-zinc-600">
        {label}
      </span>
      <p className="mt-3 break-words text-sm leading-6 text-zinc-300">
        {value}
      </p>
    </div>
  );
}
