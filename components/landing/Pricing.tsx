import tokens from "./tokens.module.css";
import styles from "./Pricing.module.css";

const included = [
  {
    title: "Um questionário clínico de 7 etapas",
    text: "Construído a partir de casos reais da minha prática, não de perguntas genéricas de teste online.",
  },
  {
    title: "Reconhecimento imediato do seu padrão",
    text: "Ao ler, você vai se ver nas cenas e nas frases citadas, escritas a partir das suas próprias respostas, não em descrições genéricas de personalidade.",
  },
  {
    title: "Uma leitura individual de 1.400 a 2.000 palavras",
    text: "Escrita por mim, do zero, sobre o seu caso específico: nada de modelo pronto ou texto reaproveitado.",
  },
  {
    title: "As 6 partes do seu padrão",
    text: "Padrão, papel, gatilho, função, custo e por onde começar, nessa ordem, porque é assim que faz sentido clinicamente.",
  },
  {
    title: "Um direcionamento prático, não só um diagnóstico",
    text: "Três movimentos concretos para a próxima vez que o padrão aparecer, aplicáveis ao seu caso, não conselhos genéricos de internet.",
  },
  {
    title: "Um documento seu, para sempre",
    text: "Entrega em até 48h, por e-mail e link privado. Você guarda e relê quantas vezes precisar, não é uma sessão que termina quando o tempo acaba.",
  },
];

const leituraItems = [
  "Questionário completo de 7 etapas",
  "Leitura escrita de 1.400 a 2.000 palavras",
  "As 6 partes, com os 3 movimentos práticos",
  "Entrega em até 48h, e-mail e link privado",
];

const devolutivaItems = [
  "Tudo o que está na Leitura Ponto Cego",
  "1 consulta individual de 60 min, por vídeo",
  "Aprofundamento com espaço para suas perguntas",
  "Agenda prioritária: contato no mesmo dia",
  "Atendimento comigo, sem repasse a terceiros",
];

export default function Pricing() {
  return (
    <section className={styles.pricing} id="planos">
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} style={{ textAlign: "center" }} data-reveal>
          Oferta
        </div>
        <h2 className={styles.heading} data-reveal>
          O que está incluído em uma Leitura Ponto Cego
        </h2>

        <div className={styles.included} data-reveal>
          <p className={styles.includedLabel}>O que você recebe:</p>
          <ul>
            {included.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.scarcity} data-reveal>
          A Análise Ponto Cego continua com o valor de lançamento por enquanto.
          Essa condição poderá ser reajustada a qualquer momento.
        </p>

        <div className={styles.plans}>
          <div className={styles.plan} data-reveal>
            <h3>Leitura Ponto Cego</h3>
            <div className={styles.tagline}>
              Para quem quer enxergar o próprio padrão com clareza e decidir os
              próximos passos.
            </div>
            <div className={styles.price}>
              <span className={styles.old}>R$299</span>
              <span className={styles.now}>R$147</span>
            </div>
            <div className={styles.installment}>ou 12x de R$12,25</div>
            <div className={styles.oneoff}>pagamento único · sem assinatura</div>
            <ul>
              {leituraItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="/jornada?plano=leitura" className={styles.btn}>
              Começar a responder
            </a>
          </div>

          <div className={`${styles.plan} ${styles.featured}`} data-reveal>
            <div className={styles.badge}>Experiência completa</div>
            <h3>Leitura + Encontro individual</h3>
            <div className={styles.tagline}>
              Você recebe a leitura por escrito e senta comigo, ao vivo, para
              aprofundar o seu caso.
            </div>
            <div className={styles.price}>
              <span className={styles.old}>R$999</span>
              <span className={styles.now}>R$497</span>
            </div>
            <div className={styles.installment}>ou 12x de R$41,42</div>
            <div className={styles.oneoff}>pagamento único · sem assinatura</div>
            <ul>
              {devolutivaItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href="/jornada?plano=leitura_devolutiva"
              className={`${styles.btn} ${styles.gold}`}
            >
              Quero a experiência completa
            </a>
            <div className={styles.vagas}>⚠ Vagas limitadas por semana</div>
          </div>
        </div>

        <div className={styles.guarantee} data-reveal>
          <h3>Garantia de clareza</h3>
          <p>
            Se algum ponto da leitura não fizer sentido para você, me conta em
            até 7 dias. Eu releio o que você escreveu e faço um ajuste de
            clareza, sem custo.
          </p>
        </div>
      </div>
    </section>
  );
}
