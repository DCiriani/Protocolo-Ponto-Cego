import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.fbar}>
          <span className={styles.mark}>
            <svg
              className={styles.seal}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C08552"
              strokeWidth="1.4"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="12" r="3.4" />
              <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
            </svg>
            Análise Ponto Cego
          </span>
          <span>Leitura individual · Até 48h · R$147</span>
          <span>
            <a href="#como">Como funciona</a> · <a href="#faq">FAQ</a> ·{" "}
            <a href="mailto:analisepontocego@psicologodiegociriani.com.br">
              Contato
            </a>
          </span>
        </div>

        <div className={styles.safety}>
          Diego Ciriani Alves Junqueira de Araujo · Psicólogo · CRP 04/44668 ·
          Espaço Ciriani, Uberaba, MG · <a href="/termos">Termos de uso</a> ·{" "}
          <a href="/politica-de-privacidade">Política de privacidade</a> ·{" "}
          <a href="/politica-de-privacidade">Excluir meus dados</a>
          <br />
          Este serviço não é atendimento de urgência e não substitui
          acompanhamento profissional continuado. Se você está em sofrimento
          intenso ou pensando em se machucar, ligue 188 (CVV, 24h, gratuito) ou
          procure o CAPS mais próximo.
        </div>
      </div>
    </footer>
  );
}