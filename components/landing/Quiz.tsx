"use client";

import { useState } from "react";
import tokens from "./tokens.module.css";
import styles from "./Quiz.module.css";

type Letter = "A" | "B" | "C" | "D";

const profileIntros: Record<Letter, string> = {
  A: "Você está em um relacionamento e, de modo geral, as coisas vão bem. Ainda assim, este padrão específico continua se repetindo.",
  B: "Você está em um relacionamento que já chegou perto do limite. Este padrão costuma aparecer justamente nesses momentos.",
  C: "Você está em um relacionamento, mas sente uma solidão dentro dele. Este padrão pode ajudar a entender por quê.",
  D: "Você está solteiro(a) e as relações não avançam ou se repetem do mesmo jeito. Este padrão aparece com frequência nesse cenário.",
};

const results: Record<
  Letter,
  { tag: string; title: string; text: string; question: string }
> = {
  A: {
    tag: "Predominância A",
    title: "Padrão de sustentação excessiva",
    text: "Você parece assumir muito rápido a responsabilidade de manter a relação funcionando. Quando percebe distância, conflito ou risco de perder o vínculo, tende a conversar mais, insistir mais, correr atrás e tentar consertar o que está acontecendo. O ponto cego pode estar menos no quanto você ama e mais no que teme descobrir se parar de sustentar tudo sozinho.",
    question:
      "O que você acredita que aconteceria se, pela primeira vez, você não corresse atrás?",
  },
  B: {
    tag: "Predominância B",
    title: "Padrão de saída antecipada",
    text: "Você parece se proteger tentando sair antes que a situação saia do seu controle. Quando o vínculo fica incerto, se afastar, cortar contato ou pensar em terminar pode devolver uma sensação de controle. Às vezes isso parece clareza ou independência, mas também pode ser uma forma de evitar a possibilidade de ser deixado primeiro.",
    question:
      "Você está indo embora porque realmente quer sair ou porque precisa sair antes que possam te deixar?",
  },
  C: {
    tag: "Predominância C",
    title: "Padrão de espera e concessão",
    text: "Você tende a esperar sinais do outro antes de se posicionar e a ceder para diminuir o desconforto de uma discussão. Isso pode parecer cautela, paciência ou capacidade de adaptação. Mas, aos poucos, sua vontade pode começar a entrar na relação só depois que você sente que existe espaço ou segurança para ela.",
    question:
      "Quanto das suas escolhas só acontece depois que você sente que tem permissão, segurança ou confirmação do outro?",
  },
  D: {
    tag: "Predominância D",
    title: "Padrão de antecipação da dor",
    text: "Você parece tentar se preparar para a rejeição antes mesmo de saber se ela realmente vai acontecer. Guarda o que sente, revisa o que pode ter feito de errado e começa a imaginar o pior antes de considerar outras possibilidades. Isso pode parecer uma tentativa de se proteger, mas também faz você viver parte da relação já se defendendo de uma dor que ainda nem chegou.",
    question:
      "Quantas vezes você já começou a se culpar ou se afastar por uma rejeição que ainda nem tinha acontecido?",
  },
};

type Question = { name: string; prompt: string; options: { value: Letter; label: string }[] };

const questions: Question[] = [
  {
    name: "profile",
    prompt: "Qual dessas situações descreve melhor o seu momento atual?",
    options: [
      { value: "A", label: "Estou em um relacionamento e, de modo geral, as coisas vão bem" },
      { value: "B", label: "Estou em um relacionamento, mas já penso em desistir" },
      { value: "C", label: "Estou em um relacionamento, mas me sinto sozinho(a) dentro dele" },
      { value: "D", label: "Estou solteiro(a) e não consigo manter uma relação por muito tempo" },
    ],
  },
  {
    name: "p1",
    prompt:
      "Pensando na relação atual (ou na mais recente, se você está solteiro), quando o clima começa a piorar, o que você faz primeiro?",
    options: [
      { value: "A", label: "Tento resolver na hora: pergunto, cobro explicação, corro atrás, mesmo que desgaste" },
      { value: "B", label: "Já considero terminar antes que a situação piore mais" },
      { value: "C", label: "Espero a outra pessoa se posicionar antes de agir" },
      { value: "D", label: "Reviso tudo o que fiz de errado antes de considerar a parte do outro" },
    ],
  },
  {
    name: "p2",
    prompt:
      "Nas brigas mais recentes, ou nas últimas tentativas de relacionamento que não foram adiante, qual reação é mais sua?",
    options: [
      { value: "A", label: "Insisto até resolver, mesmo que a conversa se estenda por horas" },
      { value: "B", label: "Saio, corto contato por um tempo, às vezes por dias" },
      { value: "C", label: "Concordo na hora para encerrar o desconforto, mesmo sem concordar de verdade" },
      { value: "D", label: "Guardo o que sinto e só falo (se falar) muito tempo depois" },
    ],
  },
  {
    name: "p3",
    prompt:
      "Olhando para as suas últimas relações, ou para a atual, se ela está perto do fim, o que mais se repete?",
    options: [
      { value: "A", label: "Eu dei mais do que recebi, e demorei a perceber isso" },
      { value: "B", label: "Eu me envolvi rápido demais e me arrependi depois" },
      { value: "C", label: "Escolhi alguém menos disponível do que eu estava disposto a ser" },
      { value: "D", label: "Terminei (ou quis terminar) antes que a outra pessoa terminasse comigo" },
    ],
  },
  {
    name: "p4",
    prompt:
      'Se alguém dissesse "você sempre repete esse padrão nos seus relacionamentos", qual seria sua primeira reação?',
    options: [
      { value: "A", label: '"Eu sei, mas não sei como agir diferente"' },
      { value: "B", label: '"Talvez, mas cada relação foi diferente"' },
      { value: "C", label: 'Defesa imediata: "não é bem assim"' },
      { value: "D", label: 'Curiosidade genuína: "me mostra onde"' },
    ],
  },
];

const anonymousIdKey = "ponto-cego-quiz-anonymous-id-v1";

function getAnonymousId() {
  const saved = window.localStorage.getItem(anonymousIdKey);

  if (saved) return saved;

  const id = crypto.randomUUID();
  window.localStorage.setItem(anonymousIdKey, id);
  return id;
}

export default function Quiz({
  pricingHref = "#planos",
  source = "direto",
}: {
  pricingHref?: string;
  source?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const q = questions[current];
  const selected = answers[q.name];
  const isLast = current === total - 1;

  function pick(value: Letter) {
    setAnswers((prev) => ({ ...prev, [q.name]: value }));
  }

  async function registerCompletion() {
    try {
      const anonymousId = getAnonymousId();

      await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymousId, source }),
        keepalive: true,
      });
    } catch (error) {
      console.error("Não foi possível registrar a conclusão do quiz.", error);
    }
  }

  function next() {
    if (!isLast) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
      void registerCompletion();
    }
  }

  function back() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  const winner: Letter = (() => {
    const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
    (["p1", "p2", "p3", "p4"] as const).forEach((k) => {
      const a = answers[k];
      if (a) counts[a]++;
    });
    return (Object.keys(counts) as Letter[]).reduce(
      (best, k) => (counts[k] > counts[best] ? k : best),
      "A"
    );
  })();

  return (
    <section className={styles.section} id="quiz">
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          Avaliação preliminar
        </div>
        <h2 className={styles.title} data-reveal>
          Qual é o padrão por trás das suas brigas, términos ou dificuldade em
          manter um relacionamento?
        </h2>
        <p className={styles.lede} data-reveal>
          São 5 perguntas objetivas, leva menos de 2 minutos, e o resultado te dá
          uma primeira orientação sobre o padrão em questão.
        </p>

        <div className={styles.card} data-reveal>
          {!finished ? (
            <>
              <p className={styles.progress}>
                Pergunta {current + 1} de {total}
              </p>
              <div className={styles.track}>
                <div
                  className={styles.fill}
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>

              <h3 className={styles.q}>{q.prompt}</h3>
              <div className={styles.options}>
                {q.options.map((opt) => (
                  <label
                    key={opt.value}
                    className={`${styles.option} ${
                      selected === opt.value ? styles.optionSel : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={opt.value}
                      checked={selected === opt.value}
                      onChange={() => pick(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className={styles.nav}>
                <button
                  className={styles.back}
                  onClick={back}
                  disabled={current === 0}
                  type="button"
                >
                  Voltar
                </button>
                <button
                  className={styles.next}
                  onClick={next}
                  disabled={!selected}
                  type="button"
                >
                  {isLast ? "Ver meu resultado" : "Próxima"}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.result}>
              <p className={styles.profileLine}>
                {profileIntros[answers.profile] || ""}
              </p>
              <p className={styles.resultTag}>{results[winner].tag}</p>
              <h3 className={styles.resultTitle}>{results[winner].title}</h3>
              <p className={styles.resultText}>{results[winner].text}</p>
              <div className={styles.resultQuestion}>
                <span>Uma pergunta importante:</span>
                <strong>{results[winner].question}</strong>
              </div>
              <div className={styles.resultCta}>
                <p>
                  Essa avaliação consegue apontar uma direção, mas não consegue
                  entender por que isso acontece justamente com você. A leitura
                  completa aprofunda os gatilhos, o que você pode estar fazendo
                  sem perceber para manter esse padrão, o impacto disso nas suas
                  relações e por onde começar a agir diferente.
                </p>
                <p>
                  A leitura completa tenta entender por que esse padrão continua
                  se repetindo justamente na sua história e como começar a mudar
                  isso.
                </p>
                <a href={pricingHref} className={styles.resultBtn}>
                  Quero a leitura completa sobre o meu caso · R$147
                </a>
              </div>
            </div>
          )}
        </div>

        <p className={styles.note} data-reveal>
          Este questionário é uma triagem inicial, não uma avaliação clínica. Se
          você está em crise aguda ou pensando em se machucar, ligue{" "}
          <a href="tel:188">188 (CVV)</a> ou procure o CAPS mais próximo. Este não
          é o canal certo para isso.
        </p>
      </div>
    </section>
  );
}
