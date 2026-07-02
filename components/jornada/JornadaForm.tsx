"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Answers = {
  name: string;
  email: string;
  relationshipStatus: string;
  mainQuestion: string;
  sceneConflict: string;
  sceneSilence: string;
  sceneLimit: string;
  sceneShrunkLife: string;
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

const storageKey = "ponto-cego-jornada-v2";

const initialAnswers: Answers = {
  name: "",
  email: "",
  relationshipStatus: "",
  mainQuestion: "",
  sceneConflict: "",
  sceneSilence: "",
  sceneLimit: "",
  sceneShrunkLife: "",
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
    title: "O que te fez procurar a Análise Ponto Cego agora?",
    description:
      "O que doeu, o que travou, o que te trouxe até aqui. Escreve do seu jeito.",
    type: "textarea",
    placeholder:
      "Exemplo: sinto que sempre acabo me envolvendo com pessoas emocionalmente indisponíveis...",
  },
  {
    key: "sceneConflict",
    eyebrow: "Cena 01 — O conflito",
    title: "Uma conversa que começou normal e foi esquentando.",
    description:
      "Imagina a cena. A outra pessoa fala algo que te atinge. Você sente o corpo reagir antes da cabeça: o peito aperta, a voz muda, as palavras começam a sair diferentes do que você planejou.\n\nIsso já aconteceu com você. Conta uma dessas vezes. O que foi dito, o que você fez na hora e o que você fez depois que a poeira baixou.\n\nSe não lembrar de uma briga grande, vale uma pequena. O tamanho não importa, o jeito importa.",
    type: "textarea",
    placeholder:
      "Escreve com calma, do jeito que veio à cabeça...",
  },
  {
    key: "sceneSilence",
    eyebrow: "Cena 02 — O silêncio",
    title: "A mensagem visualizada e sem resposta.",
    description:
      "Você manda uma mensagem que importa. A pessoa visualiza. Não responde. Passa uma hora. Passam três. Você relê o que escreveu procurando o erro. Pensa em mandar outra. Apaga. Escreve de novo.\n\nConta uma vez que foi assim pra você. Pode ser mensagem, pode ser uma distância que foi crescendo sem explicação. O que você sentiu e o que você fez enquanto esperava?\n\nSe nunca viveu exatamente isso, conta a situação mais parecida: um afastamento, uma frieza, um sumiço.",
    type: "textarea",
    placeholder:
      "Sem filtro. O que passou pela sua cabeça também conta...",
  },
  {
    key: "sceneLimit",
    eyebrow: "Cena 03 — O limite",
    title: "Aquilo que passa do seu limite e você fica entre falar e engolir.",
    description:
      "Tem coisa que te incomoda faz tempo. Você já tentou falar, ou nunca falou porque sabia como ia terminar. Aí acontece de novo. Aquilo que passa do seu limite. E você fica entre falar e engolir, medindo se vale a briga.\n\nConta uma situação em que um limite seu foi atropelado. O que era, o que você fez e o que aconteceu quando você falou. Ou o que te fez não falar.",
    type: "textarea",
    placeholder:
      "Se não falou, também conta o porquê...",
  },
  {
    key: "sceneShrunkLife",
    eyebrow: "Cena 04 — A vida que encolheu",
    title: "O que foi sumindo sem você perceber.",
    description:
      "Pensa na sua vida antes dessa relação. Ou antes da última que marcou. As amizades que você tinha, o que você fazia no tempo livre, os planos que eram só seus.\n\nAgora olha pra hoje. O que ainda existe e o que foi sumindo?\n\nConta o que você deixou de lado. E tenta lembrar como foi: alguém pediu, ou você foi abrindo mão sozinho, aos poucos, sem perceber?",
    type: "textarea",
    placeholder:
      "Vale coisa pequena. Amizade que espaçou, hobby que parou...",
  },
  {
    key: "sceneRepetition",
    eyebrow: "Cena 05 — O padrão",
    title: "O que se repete nas suas relações.",
    description:
      "Agora sem cena pronta. Olhando pras suas relações até aqui, existe algo que se repete? Tipo de pessoa que você escolhe, jeito que começa, jeito que termina, papel que você acaba ocupando.\n\nEscreve o que você já percebeu. Mesmo que seja só uma suspeita.",
    type: "textarea",
    placeholder:
      "Uma frase basta se for a frase certa...",
  },
  {
    key: "sceneChoice",
    eyebrow: "Cena 06 — A escolha revista",
    title: "Aquilo que na época parecia amor e hoje tem outro nome.",
    description:
      "Pensa numa escolha afetiva que hoje você enxerga diferente. Alguém que você idealizou, uma relação onde ficou mais tempo do que devia, algo que na época parecia amor e hoje tem outro nome.\n\nConta o que era e o que você vê agora.\n\nE uma pergunta a mais, respira antes de responder: naquela época, o que te segurava ali? Era a pessoa, ou era o medo do que vinha depois dela?",
    type: "textarea",
    placeholder:
      "A última pergunta é a mais importante. Responde ela.",
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
  const searchParams = useSearchParams();
  const checkoutOrderId = searchParams.get("order");

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

  async function handleSubmit() {
    const invalidIndex = steps.findIndex((step) => !isStepValid(step));

    if (invalidIndex !== -1) {
      setCurrentIndex(invalidIndex);
      setTouched(true);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...answers,
      checkoutOrderId,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/jornada", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Jornada submit error:", result);

        alert(
          "Não foi possível enviar suas respostas agora. Por favor, tente novamente."
        );

        setIsSubmitting(false);
        return;
      }

      window.localStorage.setItem(
        "ponto-cego-jornada-v2-submission",
        JSON.stringify({
          ...payload,
          submissionId: result?.id,
        })
      );

      window.localStorage.removeItem(storageKey);

      router.push(`/jornada/concluida?id=${result?.id ?? ""}`);
    } catch (error) {
      console.error("Jornada submit error:", error);

      alert(
        "Não foi possível enviar suas respostas agora. Verifique sua conexão e tente novamente."
      );

      setIsSubmitting(false);
    }
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

                <p className="mt-8 max-w-xl whitespace-pre-wrap text-[18px] leading-8 text-zinc-400 md:text-[20px] md:leading-10">
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
