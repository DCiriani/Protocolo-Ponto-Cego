import styles from "./Story.module.css";

const pills = [
  { text: "Como você se move dentro do vínculo", icon: (<><path d="M4 20c0-3.3 2.7-5 6-5s6 1.7 6 5" /><circle cx="10" cy="8" r="3" /><path d="M17 15c2 .6 3 2.2 3 5" /></>) },
  { text: "O que você não enxerga sobre a sua parte", icon: (<><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.6" /></>) },
  { text: "O papel que você sempre acaba ocupando", icon: (<><path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z" /><circle cx="12" cy="11" r="2.4" /></>) },
  { text: "Qual padrão está se repetindo", icon: (<><path d="M4 8h11a4 4 0 110 8H8" /><path d="M7 5L4 8l3 3M11 13l-3 3 3 3" /></>) },
  { text: "Que direção prática faz sentido agora", icon: (<><circle cx="12" cy="12" r="9" /><path d="M15 9l-2.2 5.8L9 15l2.2-5.8z" /></>) },
];

export default function Story() {
  return (
    <section className={styles.story}>
      <div className={`${styles.wrap} ${styles.split}`}>
        <div>
          <span className={styles.eyebrow}>O produto, sem rodeio</span>
          <h2 className={styles.title}>
            A Análise Ponto Cego é um texto clínico escrito sobre você.
          </h2>
          <div className={styles.nots}>
            <div>Não é teste automático.</div>
            <div>Não é texto gerado por robô.</div>
            <div>Não é psicoterapia.</div>
          </div>
          <p className={styles.lead}>
            Você responde a seis cenas de relacionamento. Não são perguntas sobre
            como você se define, são situações, e você diz o que faria. Eu leio
            tudo pessoalmente e escrevo de volta, do zero, o padrão que se repete
            nas suas escolhas, o papel que você ocupa dentro dele, o que ele te
            custa e por onde dá pra começar a mudar.
          </p>
        </div>

        <div>
          {pills.map((pill) => (
            <div key={pill.text} className={styles.pill}>
              <span className={styles.ic}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  {pill.icon}
                </svg>
              </span>
              {pill.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}