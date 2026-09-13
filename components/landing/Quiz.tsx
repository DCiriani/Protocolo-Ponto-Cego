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

const results: Record<Letter, { tag: string; title: string; text: string }> = {
  A: {
    tag: "Predominância A",
    title: "Padrão de sustentação excessiva",
    text: "Nas relações que chegam perto do limite, você costuma ser quem segura a estrutura: insiste na conversa, corre atrás, tenta consertar sozinho. Em relações que não avançam, o mesmo padrão aparece como excesso de esforço para manter algo que a outra parte não está sustentando na mesma medida. Isso não é excesso de amor, é uma forma de evitar confirmar que, se você parar de segurar, a relação pode não se manter.",
  },
  B: {
    tag: "Predominância B",
    title: "Padrão de saída antecipada",
    text: "Você tende a se envolver rápido e recuar rápido: seja cortando contato em uma briga, seja encerrando uma relação (ou uma possibilidade) antes que ela avance de verdade. Não costuma ser impulsividade. É uma forma de nunca ser pego de surpresa por um término: sair primeiro dói menos do que ser deixado.",
  },
  C: {
    tag: "Predominância C",
    title: "Padrão de espera e concessão",
    text: "Você tende a ceder rápido para encerrar o desconforto de uma briga, e a esperar sinais claros antes de se permitir agir em uma relação nova. Isso costuma parecer cautela ou capacidade de adaptação, mas com frequência significa que sua vontade só entra em jogo depois de confirmada por fora, o que também explica relações em que você sente que deu mais espaço do que recebeu.",
  },
  D: {
    tag: "Predominância D",
    title: "Padrão de antecipação da dor",
    text: "Você tende a guardar o que sente e revisar internamente o que fez de errado antes mesmo de considerar a outra parte: seja em uma briga, seja ao avaliar por que uma relação não foi adiante. É uma forma de se antecipar à dor de um término ou de uma rejeição, mesmo que o custo disso seja nunca se envolver por completo.",
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

export default function Quiz({
  pricingHref = "#planos",
}: {
  pricingHref?: string;
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

  function next() {
    if (!isLast) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
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
              <div className={styles.resultCta}>
                <p>
                  Isso é uma orientação inicial, não um diagnóstico. A Análise
                  Ponto Cego aprofunda esse padrão a partir do seu caso
                  específico: o gatilho exato, o que ele te custa e por onde
                  começar a mudar. Escrita por mim, não gerada a partir de uma
                  combinação de respostas.
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
