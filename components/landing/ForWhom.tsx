import tokens from "./tokens.module.css";
import styles from "./ForWhom.module.css";

const yes: React.ReactNode[] = [
  <>vive ciclos afetivos parecidos, com pessoas diferentes, e não entende por que <b>sempre chega no mesmo lugar</b></>,
  <>carrega uma <b>experiência difícil (abandono, traição, uma relação marcante)</b> que parece influenciar toda relação nova</>,
  <>tem <b>dificuldade em iniciar, manter ou se comprometer</b> com uma relação, mesmo quando quer</>,
  <>sente que <b>sabota relações boas</b> antes delas darem certo</>,
  <>ainda pensa bastante em uma pessoa específica e quer entender <b>o que esse padrão diz sobre essa relação</b></>,
  <>quer entender a raiz do padrão antes de <b>repetir a mesma história outra vez</b></>,
];

const no: React.ReactNode[] = [
  <>quer provar que <b>a culpa é sempre da outra pessoa</b></>,
  <>está em uma <b>crise aguda agora</b> e precisa de atendimento, não de um texto em 48h</>,
  <>espera algo bonito de ler, <b>sem se confrontar com a própria parte</b></>,
];

export default function ForWhom() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          Para quem é
        </div>
        <h2 className={styles.title} data-reveal>
          Esta leitura foi pensada para um tipo específico de dificuldade.
        </h2>
        <div className={styles.grid}>
          <div className={`${styles.whom} ${styles.yes}`} data-reveal>
            <h3>Faz sentido para você se:</h3>
            <ul>
              {yes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.whom} ${styles.no}`} data-reveal>
            <h3>Não é para você se:</h3>
            <ul>
              {no.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
