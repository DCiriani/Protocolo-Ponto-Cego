import tokens from "./tokens.module.css";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <>
      <section className={styles.final}>
        <div className={tokens.narrow} data-reveal>
          <h2>Você não precisa de mais tempo pensando.</h2>
          <p>
            Precisa de alguém mostrando o que você não vê e por onde começar a
            mudar. Doze minutos respondendo. Sua análise em até 48h.
          </p>
          <a href="#planos" className={styles.btn}>
            Quero enxergar meu padrão
          </a>
          <div className={styles.micro}>
            R$147 · pagamento único · sem assinatura
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={tokens.wrap}>
          Diego Ciriani · Psicólogo clínico · CRP 04/44668 · Atende em
          consultório e online, em Uberaba.
          <br />
          Acompanhe conteúdo sobre relacionamentos:{" "}
          <a
            href="https://instagram.com/diegociriani.psi"
            target="_blank"
            rel="noopener noreferrer"
          >
            @diegociriani.psi
          </a>
        </div>
      </footer>

      <div className={styles.sticky}>
        <a href="#planos" className={styles.stickyBtn}>
          Descobrir meu padrão · R$147
        </a>
      </div>
    </>
  );
}
