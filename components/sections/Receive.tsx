import styles from "./Receive.module.css";

const featItems = [
  "Questionário completo de 6 cenas",
  "Leitura escrita de 1.400 a 2.000 palavras",
  "As 6 partes, com os 3 movimentos práticos",
  "Entrega em até 48h, e-mail e link privado",
  "Uma rodada de pergunta por escrito depois de ler",
];

const altItems = [
  "Tudo o que está na leitura",
  "Sessão individual de 60 minutos comigo, por vídeo",
  "Aprofundamento dos pontos centrais da análise",
  "Espaço para dúvidas, reflexões e direcionamento",
  "Agenda em até 10 dias após a entrega",
  "Vagas limitadas por semana",
];

function CheckSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#5C6E4A" />
      <path
        d="M7 12.3l3.2 3.2L17 8.7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Receive() {
  return (
    <section id="oferta" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.center}>
          <span className={styles.eyebrow}>Oferta</span>
          <h2 className={styles.title}>
            Uma sessão de terapia custa entre R$180 e R$250.
          </h2>
          <hr className={styles.tick} />
        </div>

        <div className={styles.prices}>
          {/* Card R$147 */}
          <div className={`${styles.pcard} ${styles.feat}`}>
            <span className={styles.ptag}>Mais escolhido</span>
            <div>
              <h3>Leitura Ponto Cego</h3>
              <div className={styles.price}>
                <sup>R$</sup>147
              </div>
              <p className={styles.pnote}>
                pagamento único · sem assinatura, sem renovação, sem upsell depois
              </p>
              <a href="/jornada?plano=leitura" className={styles.btn} style={{ marginTop: "22px" }}>
  Começar a responder
</a>
              <p className={styles.micro}>
                Você só paga na cena 3. Antes disso é aberto.
              </p>
            </div>
            <ul className={styles.plist}>
              {featItems.map((item) => (
                <li key={item}>
                  <CheckSmall />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card R$497 */}
          <div className={styles.alt}>
            <span className={styles.glow} />
            <div className={styles.tagwrap}>
              <span className={styles.ptag2}>Com sessão individual</span>
            </div>
            <h3>
              Leitura <span className={styles.soft}>+ devolutiva</span>
            </h3>
            <p className={`${styles.pbody} ${styles.intro}`}>
              Para quem não quer apenas receber a análise, mas conversar sobre o
              que ela revelou.
            </p>
            <div className={styles.altPrice}>
              <sup>R$</sup>497
            </div>
            <p className={styles.altPnote}>pagamento único</p>
            <p className={styles.pbody}>
              Você recebe a sua Leitura Ponto Cego completa e, depois, participa de
              uma sessão individual de 60 minutos comigo, por videochamada.
            </p>
            <p className={styles.pincl}>Esta opção inclui</p>
            <ul className={styles.altList}>
              {altItems.map((item) => (
                <li key={item}>
                  <CheckCircle />
                  {item}
                </li>
              ))}
            </ul>
           <a href="/jornada?plano=leitura_devolutiva" className={`${styles.btn} ${styles.altBtn}`}>
  <span className={styles.star}>✦</span> Análise + sessão individual
</a>
            <p className={styles.altMicro}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                <rect x="5" y="11" width="14" height="9" rx="1.5" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
              Disponibilidade reduzida: poucas vagas por semana.
            </p>
          </div>
        </div>

        <div className={styles.guar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <path d="M12 21s7.5-4.4 7.5-10V5.6L12 3 4.5 5.6V11c0 5.6 7.5 10 7.5 10z" />
            <path d="M9 12l2.2 2.2L15.5 10" />
          </svg>
          <p>
            <b>Garantia.</b> Se algum ponto da leitura não fez sentido pra você, me
            conta em até 7 dias a partir do recebimento desta análise.{" "}
            <span style={{ color: "#6F8F5E" }}>
              Eu releio o que você escreveu e faço um ajuste pontual de
              clareza sobre o que já foi entregue, sem custo.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
