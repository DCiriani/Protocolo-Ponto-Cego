import styles from "./About.module.css";

const yes = [
  "vive ciclos afetivos parecidos com pessoas diferentes",
  "se envolve e depois não entende por quê",
  "quer clareza antes de repetir a mesma história",
  "aguenta ler algo sobre a própria parte sem se defender na primeira linha",
];

const no = [
  "quer provar que a culpa é da outra pessoa",
  "está numa crise aguda agora e precisa de atendimento, não de um texto em 48h",
  "quer uma previsão sobre voltar ou não voltar",
  "espera algo bonito de ler",
];

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 12.5l2.6 2.6L16 9.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

export default function About() {
  return (
    <section className={styles.section}>
      <div className={`${styles.wrap} ${styles.fitgrid}`}>
        <div>
          <h2 className={`${styles.colTitle} ${styles.yesTitle}`}>
            Indicado para quem…
          </h2>
          <ul className={`${styles.flist} ${styles.yes}`}>
            {yes.map((item) => (
              <li key={item}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.vline} />

        <div className={styles.noBox}>
          <h2 className={`${styles.colTitle} ${styles.noTitle}`}>
            Não é para quem…
          </h2>
          <ul className={`${styles.flist} ${styles.no}`}>
            {no.map((item) => (
              <li key={item}>
                <CrossIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
