import styles from "./Process.module.css";

const cards = [
  {
    title: "01 · O padrão",
    text: "O que se repete nas suas escolhas, mesmo quando as pessoas mudam completamente.",
    icon: (
      <>
        <path d="M4 8h11a4 4 0 110 8H8" />
        <path d="M7 5L4 8l3 3" />
      </>
    ),
  },
  {
    title: "02 · O papel",
    text: "A posição que você ocupa na relação. Quem cuida, quem cede, quem cobra, quem some.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
        <path d="M17 4h4v4" />
      </>
    ),
  },
  {
    title: "03 · O gatilho",
    text: "O que dispara o padrão. Quase sempre é uma cena pequena, e quase nunca é a briga.",
    icon: <path d="M13 2L5 14h6l-1 8 8-12h-6z" />,
  },
  {
    title: "04 · A função",
    text: "A parte que ninguém te conta: o que esse padrão protege você de sentir. Ele serve pra alguma coisa.",
    icon: (
      <path d="M12 21s-8-4.7-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 3.5C20 16.3 12 21 12 21z" />
    ),
  },
  {
    title: "05 · O custo",
    text: "O preço dessa proteção, em tempo, em energia e em quem você deixou de ser.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5h5M9.5 14.5h5" />
      </>
    ),
  },
  {
    title: "06 · Por onde começa",
    text: "Três movimentos concretos pra próxima vez que o gatilho aparecer. Do seu caso, não da internet.",
    icon: (
      <>
        <path d="M12 3v18" />
        <path d="M12 6l7 3-7 3" />
      </>
    ),
  },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.center}>
          <span className={styles.eyebrow}>O que vem escrito</span>
          <h2 className={styles.title}>
            <span className={styles.linha1}>Seis partes.</span>{" "}
            <span className={styles.linha2}>Nessa ordem.</span>
          </h2>
          <hr className={styles.tick} />
          <p className={styles.lead}>
            Entre 1.400 e 2.000 palavras. Uns 12 minutos de leitura, e você vai
            voltar nela mais de uma vez.
          </p>
        </div>

        <div className={styles.getgrid}>
          <div className={styles.cards}>
            {cards.map((card) => (
              <div key={card.title} className={styles.cd}>
                <span className={styles.ic}>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.5"
                  >
                    {card.icon}
                  </svg>
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.doc}>
            <h4>Exemplo de leitura</h4>
            <span className={styles.part}>Parte 04 · A função</span>
            <p>
              Você descreveu três relações diferentes e em todas você foi quem
              sustentou. Sustentou a conversa, o clima, a logística, o perdão.{" "}
              <span className={styles.mk}>
                Você chama isso de ser cuidadosa.
              </span>
            </p>
            <p className={styles.quote}>
              &quot;eu prefiro resolver sozinha do que ficar cobrando&quot;
            </p>
            <p style={{ marginTop: "15px" }}>
              Cobrar exige acreditar que você tem direito a pedir. Resolver
              sozinha não exige nada disso. Enquanto você segura tudo,{" "}
              <span className={`${styles.mk} ${styles.g}`}>
                você nunca descobre se a pessoa ficaria se você soltasse.
              </span>{" "}
              E é exatamente essa resposta que você não quer receber.
            </p>
            <p>
              O cuidado é verdadeiro. Ele também está te protegendo de um teste
              que você tem medo de aplicar.
            </p>
            <div className={styles.sign}>
              <span>Diego Ciriani · CRP 04/44668</span>
              <svg
                width="46"
                height="46"
                viewBox="0 0 48 48"
                fill="none"
                stroke="#C08552"
                strokeWidth="1"
              >
                <circle cx="24" cy="24" r="22" />
                <circle cx="24" cy="24" r="17" />
                <circle cx="24" cy="24" r="5" />
                <path d="M24 7v6M24 35v6M7 24h6M35 24h6" />
              </svg>
            </div>
          </div>
        </div>

        <p className={`${styles.micro} ${styles.center}`}>
          Trecho real com cenas, falas e detalhes alterados. Nenhuma leitura é
          publicada sem autorização escrita.
        </p>
      </div>
    </section>
  );
}
