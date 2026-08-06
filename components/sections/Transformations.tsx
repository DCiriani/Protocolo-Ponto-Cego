import styles from "./Transformations.module.css";

export default function Transformations() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={`${styles.eyebrow} ${styles.whoeyebrow}`}>
          Quem escreve
        </span>
      </div>

      <div className={`${styles.wrap} ${styles.whotop}`}>
        <div
          className={styles.photo}
          style={{ ["--diego-img" as string]: "url(/diego-ciriani.jpg)" }}
        />

        <div className={styles.bio}>
          <h2 style={{ margin: "0 0 24px" }}>Diego Ciriani</h2>
          <p>
            Sou psicólogo clínico e, há mais de uma década, acompanho pessoas que
            querem entender por que alguns padrões continuam se repetindo em seus
            relacionamentos.
          </p>
          <p>
            Com o tempo, percebi que muitos conflitos não acontecem apenas por
            causa do que o outro fez. Eles também passam pela forma como você
            interpreta o que aconteceu, pelo lugar que costuma ocupar na relação e
            pelas maneiras que aprendeu a se proteger ao longo da vida.
          </p>
          <p>
            Por isso, na Análise Ponto Cego, você não recebe um resultado
            automático nem uma resposta feita a partir de palavras-chave.
          </p>
          <p>
            Sou eu quem lê cada resposta, analisa o seu caso e escreve a sua
            devolutiva. Considero a sua história, o momento que você está vivendo,
            a forma como se relaciona e até as contradições que aparecem nas suas
            respostas.
          </p>
          <p className={styles.bioClose}>
            Porque você não cabe em um perfil pronto. E a sua história precisa ser
            compreendida como algo único.
          </p>
          <p className={styles.bioCrp}>
            Psicólogo · CRP 04/44668 · Atende em consultório e online, em Uberaba.
          </p>
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.whonot}>
          <span className={styles.eyebrow}>O que não é</span>
          <ul className={styles.nlist}>
            <li>
              <b>Não é gerado por inteligência artificial.</b>
            </li>
            <li>
              <b>Não é leitura sobre a outra pessoa.</b> É sobre você.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
