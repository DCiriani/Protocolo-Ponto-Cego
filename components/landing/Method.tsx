import tokens from "./tokens.module.css";
import styles from "./Method.module.css";

const negations = [
  "Não é teste automático.",
  "Não é texto gerado por robô.",
  "Não é psicoterapia.",
  "Não é leitura sobre a outra pessoa. É sobre você.",
];

export default function Method() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          O método
        </div>
        <h2 className={styles.title} data-reveal>
          A Análise Ponto Cego segue o Método Ponto Cego, que desenvolvi ao longo
          de mais de uma década de prática clínica.
        </h2>
        <p className={styles.lede} data-reveal>
          Você responde a sete etapas construídas a partir dessa metodologia: não
          são perguntas sobre como você se define, são situações, e você diz o que
          faria. Eu leio pessoalmente cada resposta e escrevo, do zero, uma
          análise sobre o seu caso específico,{" "}
          <b>seguindo a mesma estrutura clínica que uso desde que criei o método.</b>
        </p>

        <div className={styles.negations} data-reveal>
          <p className={styles.negLabel}>O que isso não é</p>
          <ul>
            {negations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <blockquote className={styles.quote} data-reveal>
          “Toda vez que alguém me manda as sete respostas, eu não procuro o que a
          pessoa fez de errado. Procuro o que ela repete sem perceber. É isso que
          eu escrevo de volta.”
          <cite>Diego Ciriani, CRP 04/44668</cite>
        </blockquote>
      </div>
    </section>
  );
}
