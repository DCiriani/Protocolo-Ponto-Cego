import styles from "./FAQ.module.css";

export default function FAQ() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Última coisa</span>
        <h2 className={styles.title}>
          Você não precisa de mais tempo pensando.{" "}
          <span className={styles.copper}>
            Precisa de alguém mostrando o que você não vê, e por onde começar a
            mudar.
          </span>
        </h2>
        <p className={styles.lead}>
          Doze minutos respondendo. Sua análise em até 48h. E um direcionamento
          para você colocar em prática e reler quantas vezes quiser.
        </p>
        <a href="/jornada" className={styles.btn}>
          Quero enxergar meu padrão
        </a>
        <p className={styles.micro}>
          R$147, pagamento único. Você só paga na cena 3.
        </p>
      </div>
    </section>
  );
}
