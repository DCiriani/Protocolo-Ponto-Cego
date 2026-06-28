"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Answers = {
  name: string;
  email: string;
  relationshipStatus: string;
  mainQuestion: string;
  sceneConflict: string;
  sceneSilence: string;
  sceneLimit: string;
  sceneRepetition: string;
  sceneChoice: string;
  expectedClarity: string;
  consent: boolean;
};

type AnswerKey = keyof Answers;

type Step = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  description: string;
  type: "input" | "email" | "textarea" | "select" | "consent";
  placeholder?: string;
  options?: string[];
  helper?: string;
};

const storageKey = "ponto-cego-jornada-v1";

const initialAnswers: Answers = {
  name: "",
  email: "",
  relationshipStatus: "",
  mainQuestion: "",
  sceneConflict: "",
  sceneSilence: "",
  sceneLimit: "",
  sceneRepetition: "",
  sceneChoice: "",
  expectedClarity: "",
  consent: false,
};

const steps: Step[] = [
  {
    key: "name",
    eyebrow: "Identificação",
    title: "Como você quer ser chamado nesta análise?",
    description:
      "Use o nome pelo qual você se sente confortável em ser chamado na sua Leitura Ponto Cego.",
    type: "input",
    placeholder: "Seu nome",
  },
  {
    key: "email",
    eyebrow: "Entrega",
    title: "Para qual e-mail sua leitura deve ser enviada?",
    description:
      "Esse e-mail será usado para identificar sua jornada e, futuramente, para envio da sua devolutiva.",
    type: "email",
    placeholder: "seuemail@exemplo.com",
  },
  {
    key: "relationshipStatus",
    eyebrow: "Contexto",
    title: "Qual é o seu momento relacional hoje?",
    description:
      "Não existe resposta ideal. Essa informação apenas ajuda a contextualizar a sua análise.",
    type: "select",
    options: [
      "Estou em um relacionamento",
      "Sou casado(a)",
      "Estou solteiro(a)",
      "Estou em uma relação indefinida",
      "Passei por um término recentemente",
      "Prefiro não responder",
    ],
  },
  {
    key: "mainQuestion",
    eyebrow: "Pergunta central",
    title: "O que fez você buscar a Análise Ponto Cego agora?",
    description:
      "Conte, com suas palavras, o que você sente que precisa compreender melhor nos seus relacionamentos.",
    type: "textarea",
    placeholder:
      "Exemplo: sinto que sempre acabo me envolvendo com pessoas emocionalmente indisponíveis...",
  },
  {
    key: "sceneConflict",
    eyebrow: "Cena 01",
    title: "Descreva uma cena recente de conflito.",
    description:
      "Pode ser uma discussão, um afastamento, uma cobrança, uma reação sua ou algo que ficou mal resolvido.",
    type: "textarea",
    placeholder:
      "O que aconteceu? Como você interpretou? O que você sentiu? Como reagiu?",
  },
  {
    key: "sceneSilence",
    eyebrow: "Cena 02",
    title: "Descreva uma cena em que o silêncio ou a distância te afetou.",
    description:
      "Pode ser uma demora para responder, uma mudança no tom, uma ausência ou uma sensação de rejeição.",
    type: "textarea",
    placeholder:
      "O que o silêncio ou a distância significou para você naquele momento?",
  },
  {
    key: "sceneLimit",
    eyebrow: "Cena 03",
    title: "Descreva uma situação em que você ultrapassou ou silenciou um limite seu.",
    description:
      "Pense em momentos em que você aceitou algo, cedeu demais ou deixou de dizer o que realmente sentia.",
    type: "textarea",
    placeholder:
      "O que você deixou passar? O que temeu que acontecesse se colocasse um limite?",
  },
  {
    key: "sceneRepetition",
    eyebrow: "Cena 04",
    title: "Que padrão parece se repetir nos seus relacionamentos?",
    description:
      "Pode ser uma escolha, uma reação, uma insegurança, uma dinâmica ou um tipo de pessoa que aparece com frequência.",
    type: "textarea",
    placeholder:
      "Exemplo: eu me aproximo, depois sinto medo, começo a cobrar e a pessoa se afasta...",
  },
  {
    key: "sceneChoice",
    eyebrow: "Cena 05",
    title: "Descreva uma escolha afetiva que hoje você enxerga de outra forma.",
    description:
      "Pode ser alguém que você escolheu, algo que tolerou, uma insistência, uma ruptura ou um retorno.",
    type: "textarea",
    placeholder:
      "O que você escolheu naquele momento? O que percebe hoje olhando para trás?",
  },
  {
    key: "expectedClarity",
    eyebrow: "Clareza",
    title: "O que você gostaria de conseguir enxergar com mais clareza?",
    description:
      "Essa resposta ajuda a orientar a leitura para aquilo que mais importa para você neste momento.",
    type: "textarea",
    placeholder:
      "Exemplo: quero entender por que tenho tanto medo de ser abandonado(a)...",
  },
  {
    key: "consent",
    eyebrow: "Antes de enviar",
    title: "Confirme que você compreende o objetivo desta análise.",
    description:
      "A Análise Ponto Cego é uma ferramenta de autoconhecimento. Não é diagnóstico, não substitui psicoterapia e não oferece respostas definitivas sobre outra pessoa.",
    type: "consent",
    helper:
      "Li e compreendo que esta análise tem finalidade de autoconhecimento e orientação inicial.",
  },
];

export default function JornadaForm() {
  const router = useRouter();

  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          answers?: Answers;
          currentIndex?: number;
        };

        if (parsed.answers) {
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
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        answers,
        currentIndex,
      })
    );
  }, [answers, currentIndex, hasLoaded]);

  function setField(key: AnswerKey, value: string | boolean) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function isStepValid(step?: Step) {
    if (!step) return true;

    const value = answers[step.key];

    if (step.type === "consent") {
      return value === true;
    }

    if (step.type === "email") {
      return (
        typeof value === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      );
    }

    return typeof value === "string" && value.trim().length > 0;
  }

  function getErrorMessage() {
    if (!touched || isReview || isStepValid(currentStep)) return "";

    if (currentStep?.type === "email") {
      return "Digite um e-mail válido para continuar.";
    }

    if (currentStep?.type === "consent") {
      return "Confirme que você compreende o objetivo da análise.";
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

  function handleSubmit() {
    const invalidIndex = steps.findIndex((step) => !isStepValid(step));

    if (invalidIndex !== -1) {
      setCurrentIndex(invalidIndex);
      setTouched(true);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...answers,
      submittedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      "ponto-cego-jornada-v1-submission",
      JSON.stringify(payload)
    );

    window.localStorage.removeItem(storageKey);

    setTimeout(() => {
      router.push("/jornada/concluida");
    }, 450);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F5F5F3]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(136,179,154,0.1),transparent_34%)]" />

      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full border border-[#88B39A]" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">
              Ponto Cego
            </span>
          </a>

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

                <h1 className="max-w-3xl text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
                  {currentStep.title}
                </h1>

                <p className="mt-8 max-w-xl text-[18px] leading-8 text-zinc-400 md:text-[20px] md:leading-10">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                {renderField(currentStep, answers, setField)}

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
              answers={answers}
              onEdit={(index) => setCurrentIndex(index)}
              onBack={goBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function renderField(
  step: Step,
  answers: Answers,
  setField: (key: AnswerKey, value: string | boolean) => void
) {
  const value = answers[step.key];

  if (step.type === "textarea") {
    return (
      <textarea
        value={String(value ?? "")}
        onChange={(event) => setField(step.key, event.target.value)}
        placeholder={step.placeholder}
        rows={10}
        className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 text-lg leading-8 text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
      />
    );
  }

  if (step.type === "input" || step.type === "email") {
    return (
      <input
        value={String(value ?? "")}
        onChange={(event) => setField(step.key, event.target.value)}
        placeholder={step.placeholder}
        type={step.type === "email" ? "email" : "text"}
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-7 py-5 text-lg text-[#F5F5F3] outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/60"
      />
    );
  }

  if (step.type === "select") {
    return (
      <div className="grid gap-3">
        {step.options?.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setField(step.key, option)}
              className={`rounded-2xl border px-6 py-5 text-left text-base leading-7 transition ${
                selected
                  ? "border-[#88B39A] bg-[#88B39A]/10 text-[#F5F5F3]"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (step.type === "consent") {
    const checked = Boolean(value);

    return (
      <button
        type="button"
        onClick={() => setField(step.key, !checked)}
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

function ReviewStep({
  answers,
  onEdit,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  answers: Answers;
  onEdit: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const reviewSteps = steps.filter((step) => step.type !== "consent");

  return (
    <div className="mx-auto max-w-5xl">
      <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
        Revisão
      </span>

      <h1 className="max-w-4xl text-[clamp(3rem,6vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
        Revise sua Jornada Ponto Cego.
      </h1>

      <p className="mt-8 max-w-2xl text-[18px] leading-8 text-zinc-400 md:text-[20px] md:leading-10">
        Antes de finalizar, veja se suas respostas representam com honestidade o
        que você gostaria que fosse analisado.
      </p>

      <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
        {reviewSteps.map((step, index) => (
          <div key={step.key} className="py-8">
            <div className="flex items-start justify-between gap-8">
              <div>
                <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-zinc-600">
                  {step.eyebrow}
                </span>

                <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                  {step.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onEdit(index)}
                className="shrink-0 text-sm text-[#88B39A] transition hover:text-[#9FC2AD]"
              >
                Editar
              </button>
            </div>

            <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-zinc-400">
              {String(answers[step.key] || "Não respondido")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#88B39A] px-9 py-5 text-[15px] font-semibold text-[#0A0A0A] transition hover:bg-[#9FC2AD] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Finalizando..." : "Finalizar minha jornada"}
          <span className="transition group-hover:translate-x-1">→</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-9 py-5 text-[15px] font-semibold text-zinc-400 transition hover:border-[#88B39A]/50 hover:text-[#F5F5F3]"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}