import tokens from "./tokens.module.css";
import styles from "./Parts.module.css";

const parts = [
  {
    n: "01",
    title: "O padrão",
    text: "O que se repete nas suas escolhas, mesmo quando as pessoas mudam completamente.",
  },
  {
    n: "02",
    title: "O papel",
    text: "A posição que você ocupa na relação. Quem cuida, quem cede, quem cobra, quem some.",
  },
  {
    n: "03",
    title: "O gatilho",
    text: "O que dispara o padrão. Quase sempre uma cena pequena, e quase nunca a briga.",
  },
  {
    n: "04",
    title: "A função",
    text: "A parte que ninguém te conta: o que esse padrão protege você de sentir.",
  },
  {
    n: "05",
    title: "O custo",
    text: "O preço dessa proteção: em tempo, em energia e em quem você deixou de ser.",
  },
  {
    n: "06",
    title: "Por onde começa",
    text: "Três movimentos concretos para a próxima vez que o gatilho aparecer. Do seu caso, não da internet.",
  },
];

export default function Parts() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          O que vem escrito
        </div>
        <h2 className={styles.title} data-reveal>
          Seis partes. Nessa ordem. Sobre o seu caso, não um resumo genérico de
          três linhas.
        </h2>
        <div className={styles.grid}>
          {parts.map((part) => (
            <div key={part.n} className={styles.part} data-reveal>
              <div className={styles.n}>{part.n}</div>
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
