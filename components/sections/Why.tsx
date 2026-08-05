import styles from "./Why.module.css";

const steps = [
  { n: "1", title: "Você começa a responder", text: "As primeiras cenas são abertas. Você entende o tipo de pergunta antes de decidir se quer continuar." },
  { n: "2", title: "Você libera o questionário", text: "Pagamento único e as seis cenas completas destravam. Cerca de 12 minutos pra responder com calma." },
  { n: "3", title: "Eu escrevo a sua leitura", text: "Em até 48 horas chega no seu e-mail e num link privado. Escrita à mão, sobre o seu caso, sem modelo pronto." },
];

export default function Why() {
  return (
    <section id="como" className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Como funciona</span>
        <h2 className={styles.title}>
          Três passos.
          <br />
          <span className={styles.copper}>O terceiro é comigo.</span>
        </h2>
        <hr className={styles.tick} />

        <span className={styles.tagline}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C08552" strokeWidth="1.5">
            <path d="M3 3l18 18" />
            <path d="M12 4v10M8 10v4M16 8v6" />
          </svg>
          Sem chamada ao vivo no plano básico
        </span>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.n} className={styles.stp}>
              <span className={styles.num}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}