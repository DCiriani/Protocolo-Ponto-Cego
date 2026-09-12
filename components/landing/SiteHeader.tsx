import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        Ponto Cego<span>.</span>
      </div>
      <a href="#planos" className={styles.cta}>
        Quero minha análise
      </a>
    </header>
  );
}
