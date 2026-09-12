import tokens from "./tokens.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          Medo de ficar sozinho. Traição que ainda dói. Isso também é padrão.
        </div>
        <h1 className={styles.title} data-reveal>
          Existe um padrão nos seus relacionamentos que{" "}
          <em>você não consegue ver sozinho.</em>
        </h1>
        <p className={styles.lead} data-reveal>
          A relação que você sabota antes de dar certo. O ciclo que se repete com
          pessoas diferentes. Isso não é falta de sorte. É um padrão, e padrão
          pode ser identificado, entendido e mudado.
        </p>
        <a href="#planos" className={`${styles.btn} ${styles.big}`} data-reveal>
          Descobrir meu padrão
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <div className={styles.price} data-reveal>
          A partir de <b>R$147</b> · pagamento único · entrega em até 48h
        </div>
        <div className={styles.tags} data-reveal>
          <span>
            <Check /> 100% individual
          </span>
          <span>
            <Check /> Escrita por mim, sem IA
          </span>
          <span>
            <Check /> Entrega em até 48h
          </span>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
