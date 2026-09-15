import tokens from "./tokens.module.css";
import styles from "./Steps.module.css";

const steps = [
  {
    n: "1",
    title: "Você escolhe o plano",
    text: "Leitura Ponto Cego, ou Leitura + Encontro individual comigo. Pagamento único, sem assinatura.",
  },
  {
    n: "2",
    title: "Responde o questionário",
    text: "As sete etapas destravam na hora. Cerca de 12 minutos para responder com calma. Dá para pausar e retomar.",
  },
  {
    n: "3",
    title: "Eu escrevo a sua leitura",
    text: "Em até 48h chega no seu e-mail e em um link privado. Escrita por mim, sobre o seu caso, sem modelo pronto.",
  },
];

export default function Steps() {
  return (
    <section className={styles.section} id="como">
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          Como funciona
        </div>
        <h2 className={styles.title} data-reveal>
          Três passos. O terceiro é comigo.
        </h2>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.n} className={styles.step} data-reveal>
              <div className={styles.num}>{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
