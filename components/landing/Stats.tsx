import tokens from "./tokens.module.css";
import styles from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={styles.stats} data-reveal>
          <div className={styles.stat}>
            <b>+10</b>
            <span>anos de atuação clínica focada em relacionamentos</span>
          </div>
          <div className={styles.stat}>
            <b>27,4 mil</b>
            <span>seguidores no Instagram sobre relacionamentos</span>
          </div>
          <div className={styles.stat}>
            <b>48h</b>
            <span>para a sua leitura chegar, escrita por mim</span>
          </div>
          <div className={styles.stat}>
            <b>+100</b>
            <span>análises Ponto Cego já entregues</span>
          </div>
        </div>
      </div>
    </section>
  );
}
