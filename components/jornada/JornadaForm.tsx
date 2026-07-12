"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Answers = {
  name: string;
  email: string;
  relationshipStatus: string;
  ageRange: string;
  relationshipDuration: string;
  discomfortDuration: string;
  therapyHistory: string;
  mainQuestion: string;
  sceneConflict: string;
  reactionSelections: string[];
  reactionPurpose: string;
  sceneProximity: string;
  mirrorCriticism: string;
  mirrorTruth: string;
  intentionImpact: string;
  patternHypothesis: string;
  desireFear: string;
  consent: boolean;
};

type AnswerKey = keyof Answers;
type AnswerValue = Answers[AnswerKey];
type SetField = (key: AnswerKey, value: AnswerValue) => void;

type Step = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  description: string;
  type:
    | "input"
    | "email"
    | "textarea"
    | "context"
    | "reaction"
    | "mirror"
    | "consent";
  placeholder?: string;
  helper?: string;
  guide?: string;
  fieldLabel?: string;
  secondaryTitle?: string;
  secondaryPlaceholder?: string;
};

const storageKey = "ponto-cego-jornada-v3";

const relationshipStatusOptions = [
  "Estou em um relacionamento",
  "Sou casado(a)",
  "Estou solteiro(a)",
  "Estou em uma relação indefinida",
  "Passei por um término recentemente",
  "Prefiro não responder",
];

const ageRangeOptions = [
  "Até 24 anos",
  "De 25 a 34 anos",
  "De 35 a 44 anos",
  "45 anos ou mais",
  "Prefiro não responder",
];

const relationshipDurationOptions = [
  "Menos de 1 ano",
  "De 1 a 3 anos",
  "De 3 a 7 anos",
  "Mais de 7 anos",
  "Não se aplica",
];

const discomfortDurationOptions = [
  "Começou recentemente",
  "Há alguns meses",
  "Há alguns anos",
  "Aparece desde as minhas primeiras relações",
  "Não sei dizer",
];

const therapyHistoryOptions = [
  "Nunca fiz",
  "Já fiz, mas não faço atualmente",
  "Faço atualmente",
  "Prefiro não responder",
];

const reactionOptions = [
  "Tento resolver na hora, mesmo que a outra pessoa não esteja pronta",
  "Fico frio(a) e me afasto",
  "Cedo pra evitar que piore",
  "Cobro explicação ou garantia",
  "Começo a procurar sinais",
  "Falo mais duro do que queria",
  "Finjo que não me importo",
  "Evito o assunto e espero passar",
  "Penso em terminar ou sumir",
  "Faço algo pra provocar uma reação",
  "Reajo de outro jeito",
];

const initialAnswers: Answers = {
  name: "",
  email: "",
  relationshipStatus: "",
  ageRange: "",
  relationshipDuration: "",
  discomfortDuration: "",
  therapyHistory: "",
  mainQuestion: "",
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

const steps: Step[] = [
  {
    key: "name",
    eyebrow: "Identificação",
    title: "Como você quer ser chamado nesta análise?",
    description:
      "Use o nome pelo qual você se sente confortável em ser chamado na sua Análise Ponto Cego.",
    type: "input",
    placeholder: "Seu nome",
  },
  {
    key: "email",
    eyebrow: "Entrega",
    title: "Para qual e-mail sua análise deve ser enviada?",
    description:
      "Esse e-mail será usado para identificar suas respostas e enviar sua devolutiva quando ela estiver pronta.",
    type: "email",
    placeholder: "seuemail@exemplo.com",
  },
  {
    key: "relationshipStatus",
    eyebrow: "Contexto",
    title: "Antes das cenas, um pouco sobre o seu momento.",
    description:
      "Essas informações ajudam a contextualizar suas respostas. Não existe opção melhor ou mais correta.",
    type: "context",
  },
  {
    key: "mainQuestion",
    eyebrow: "Pergunta central",
    title: "O que te fez procurar a Análise Ponto Cego agora?",
    description:
      "Conta o que está acontecendo, o que vem se repetindo ou o que você sente que ainda não conseguiu entender sozinho.\n\nNão precisa organizar perfeitamente. Escreve do seu jeito.",
    type: "textarea",
    placeholder: "O que está acontecendo na sua vida afetiva neste momento?",
  },
  {
    key: "sceneConflict",
    eyebrow: "Cena 01 — O conflito",
    title: "Uma conversa que começou normal e foi esquentando.",
    description:
      "Pensa numa conversa real que virou briga. Ou que não virou, mas ficou marcada. A pessoa disse algo, você reagiu, e as coisas saíram diferentes do que você planejou.\n\nSe não lembrar de uma briga grande, vale uma pequena. O tamanho não importa, o jeito importa.",
    type: "textarea",
    guide:
      "Conte: o que foi dito · o que você entendeu · o que você fez na hora · o que você fez depois que a poeira baixou",
    placeholder: "Escreve com calma, do jeito que veio à cabeça...",
  },
  {
    key: "reactionSelections",
    eyebrow: "A reação",
    title:
      "Quando você sente que a relação tá ameaçada, o que acontece primeiro?",
    description:
      "Uma distância, uma frieza, uma briga no ar. Antes de pensar, você já reagiu de algum jeito.\n\nEscolhe até duas opções. Não escolhe a mais bonita. Escolhe a que acontece de verdade.",
    type: "reaction",
    secondaryTitle:
      "E o que você tá tentando conseguir, ou evitar, quando reage assim?",
    secondaryPlaceholder: "Quando eu faço isso, eu tô tentando...",
  },
  {
    key: "sceneProximity",
    eyebrow: "Cena 02 — A proximidade",
    title: "Quando alguém chegou de verdade.",
    description:
      "Agora inverte. Pensa numa vez em que alguém demonstrou interesse real em você. Presença, cuidado, vontade de construir. Sem joguinho.\n\nComo foi receber isso? Conta o que te deixou bem e o que te incomodou, se incomodou. E o que você fez com essa aproximação.",
    type: "textarea",
    guide:
      "Conte: o que a pessoa fez · o que te deu segurança · o que te deu dúvida ou vontade de recuar · como terminou",
    placeholder: "Como foi receber alguém que estava realmente disponível...",
  },
  {
    key: "mirrorCriticism",
    eyebrow: "O espelho",
    title: "A crítica que você já ouviu mais de uma vez.",
    description:
      "Pensa nas pessoas que já conviveram de perto com você. Parceiros, ex, amigos, família. Existe alguma reclamação sobre você que se repete? Algo que mais de uma pessoa, em momentos diferentes, já apontou?\n\nEscreve do jeito mais parecido possível com o que você ouviu.",
    type: "mirror",
    fieldLabel: "O que já disseram sobre o seu jeito?",
    placeholder: "“Você sempre...” / “Com você é difícil...”",
    secondaryTitle: "E o que talvez tenha um fundo de verdade nela?",
    secondaryPlaceholder:
      "Olhando com honestidade, o que pode existir de verdadeiro nela...",
  },
  {
    key: "intentionImpact",
    eyebrow: "Intenção e impacto",
    title: "Uma vez em que alguém se magoou com o seu jeito.",
    description:
      "Pensa numa vez em que alguém disse que você magoou, pressionou, ignorou ou afastou. Mesmo que essa não tenha sido a sua intenção.\n\nVocê não precisa concordar com a versão da pessoa. Precisa apenas conseguir contar essa versão.",
    type: "textarea",
    guide:
      "Conte: o que a pessoa diria que você fez · o que você achava que estava fazendo · a diferença que você enxerga hoje",
    placeholder: "Do ponto de vista dela, eu...",
  },
  {
    key: "patternHypothesis",
    eyebrow: "O padrão",
    title: "O que você acha que se repete.",
    description:
      "Olhando pras suas relações até aqui, o que você suspeita que se repete? Pode ser o tipo de pessoa que você escolhe, o jeito como uma relação começa, o jeito como termina ou o papel que você acaba ocupando.\n\nNão precisa ter certeza. Essa é a hipótese que você tem hoje sobre você. A leitura vai colocar essa hipótese ao lado do que apareceu nas outras respostas.",
    type: "textarea",
    placeholder: "Uma frase basta se for a frase certa...",
  },
  {
    key: "desireFear",
    eyebrow: "Desejo e medo",
    title:
      "O que você mais quer encontrar e o que você mais teme viver de novo.",
    description:
      "São duas respostas nessa.\n\nNuma relação, o que você mais quer encontrar? E o que você mais tem medo de repetir?\n\nNão procura a resposta perfeita. Começa pelo que vier primeiro e completa se precisar.",
    type: "textarea",
    placeholder: "Primeiro o que você quer. Depois o que você teme...",
  },
  {
    key: "consent",
    eyebrow: "Antes de enviar",
    title: "Confirme que você compreende o objetivo desta análise.",
    description:
      "A Análise Ponto Cego é uma ferramenta de autoconhecimento. Não é diagnóstico, não substitui psicoterapia e não oferece respostas definitivas sobre outra pessoa.\n\nA leitura é construída a partir do que você contou e do jeito que você contou.",
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
          answers?: Partial<Answers>;
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
      }),
    );
  }, [answers, currentIndex, hasLoaded]);

  function setField(key: AnswerKey, value: AnswerValue) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
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

    if (step.type === "reaction") {
      return (
        answers.reactionSelections.length > 0 &&
        answers.reactionSelections.length <= 2 &&
        answers.reactionPurpose.trim().length > 0
      );
    }

    if (step.type === "mirror") {
      return (
        answers.mirrorCriticism.trim().length > 0 &&
        answers.mirrorTruth.trim().length > 0
      );
    }

    const value = answers[step.key];

    if (step.type === "consent") {
      return value === true;
    }

    if (step.type === "email") {
      return (
        typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      );
    }

    return typeof value === "string" && value.trim().length > 0;
  }

  function getErrorMessage() {
    if (!touched || isReview || isStepValid(currentStep)) return "";

    if (currentStep?.type === "email") {
      return "Digite um e-mail válido para continuar.";
    }

    if (currentStep?.type === "context") {
      return "Responda todos os blocos de contexto antes de continuar.";
    }

    if (currentStep?.type === "reaction") {
      if (answers.reactionSelections.length === 0) {
        return "Escolha uma ou duas reações para continuar.";
      }

      return "Conte também o que você tenta conseguir ou evitar quando reage assim.";
    }

    if (currentStep?.type === "mirror") {
      return "Preencha os dois campos desta etapa antes de continuar.";
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
          "Não foi possível enviar suas respostas agora. Por favor, tente novamente.",
        );

        setIsSubmitting(false);
        return;
      }

      window.localStorage.setItem(
        "ponto-cego-jornada-v3-submission",
        JSON.stringify({
          ...payload,
          submissionId: result?.id,
        }),
      );

      window.localStorage.removeItem(storageKey);

      router.push(`/jornada/concluida?id=${result?.id ?? ""}`);
    } catch (error) {
      console.error("Jornada submit error:", error);

      alert(
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

                <h1 className="max-w-3xl font-satoshi text-[2.15rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#6F8F5E] min-[390px]:text-[2.35rem] md:text-[clamp(2.8rem,5.8vw,6.2rem)] md:leading-[1.02]">
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

function renderField(step: Step, answers: Answers, setField: SetField) {
  const value = answers[step.key];

  if (step.type === "textarea") {
    return (
      <div>
        {step.guide && <FieldGuide>{step.guide}</FieldGuide>}

        <textarea
          value={String(value ?? "")}
          onChange={(event) => setField(step.key, event.target.value)}
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
        onChange={(event) => setField(step.key, event.target.value)}
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
        </div>
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

function ReviewStep({
  answers,
  onBack,
  onSubmit,
  isSubmitting,
}: {
  answers: Answers;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const answeredStages = steps.filter((step) => step.type !== "consent").length;

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

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard label="Nome" value={answers.name} />
        <SummaryCard label="E-mail de entrega" value={answers.email} />
        <SummaryCard
          label="Momento relacional"
          value={answers.relationshipStatus}
        />
        <SummaryCard
          label="Etapas respondidas"
          value={`${answeredStages} de ${answeredStages}`}
        />
        <SummaryCard
          label="Termo"
          value={answers.consent ? "Confirmado" : "Pendente"}
        />
      </div>

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