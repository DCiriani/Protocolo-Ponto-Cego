import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.phero}>
      <div
        className={styles.photo}
        style={{ ["--hero-img" as string]: "url(/hero-espelho.jpg)" }}
      />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            Leitura clínica escrita e personalizada
          </span>

          <h1 className={styles.title}>
            Você pode até não perceber. Mas o padrão que sabota seus
            relacionamentos já está se repetindo.
          </h1>

          <ul className={styles.lines}>
            <li>Você se apaixona rápido.</li>
            <li>Sempre termina do mesmo jeito.</li>
            <li>Fala que não vai se envolver e se envolve.</li>
            <li>Você escolhe quem não escolhe você.</li>
            <li>Sabe disso há anos e continua fazendo.</li>
          </ul>

          <p className={styles.lede}>
            <span className={styles.brand}>A Análise Ponto Cego</span> transforma
            respostas reais em uma leitura profunda, escrita por um psicólogo,
            pra te mostrar o que você ainda não conseguiu enxergar sobre a forma
            como ama, reage e se envolve.
          </p>

          <div className={styles.buttons}>
            <a href="#oferta" className={`${styles.btn} ${styles.primary}`}>
              Quero minha análise
            </a>
            <a href="#como" className={`${styles.btn} ${styles.play}`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" />
              </svg>
              Como funciona
            </a>
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M12 3v18M5 8l14 8M19 8L5 16" />
              </svg>
              100% individual
            </span>
            <span className={styles.badge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
              </svg>
              Escrita por humano
            </span>
            <span className={styles.badge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
              Entrega em até 48h
            </span>
            <span className={styles.badge}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z" />
                <circle cx="12" cy="11" r="2.4" />
              </svg>
              Foco em relacionamentos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
