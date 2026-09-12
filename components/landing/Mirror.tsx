import tokens from "./tokens.module.css";
import styles from "./Mirror.module.css";

const solteiro = [
  "Se apaixona rápido, mas nunca dura, e sempre termina do mesmo jeito.",
  "Prefere ficar sozinho(a) a se arriscar a ser deixado(a) de novo.",
  "Escolhe quem não escolhe você.",
  "Não consegue manter uma relação por muito tempo.",
  "Carrega um trauma do passado que ainda influencia quem você escolhe.",
];

const relacionamento = [
  "Já brigou feio, foi traído(a), e mesmo assim ficou.",
  "Sente uma solidão mesmo estando acompanhado(a).",
  "Já pensou em terminar, mas ainda não conseguiu.",
  "Perdeu a conta de quanto abriu mão de si para a relação continuar de pé.",
  "Isso se repete há anos e você ainda não entende por quê.",
];

export default function Mirror() {
  return (
    <section className={styles.mirror}>
      <div className={tokens.wrap}>
        <h2 className={styles.title} data-reveal>
          Você se reconhece em alguma destas cenas?
        </h2>
        <p className={styles.sub} data-reveal>
          O padrão aparece de um jeito diferente, dependendo de onde você está
          agora.
        </p>
        <div className={styles.cols}>
          <div className={styles.card} data-reveal>
            <h3>Se você está solteiro(a)</h3>
            <ul>
              {solteiro.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className={styles.card} data-reveal>
            <h3>Se você está num relacionamento</h3>
            <ul>
              {relacionamento.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.turn} data-reveal>
          Isso não é falta de sorte. É um comportamento que pode ser{" "}
          <b>identificado, entendido e mudado</b>, esteja você solteiro(a) ou em
          um relacionamento. É esse padrão que a Análise Ponto Cego coloca no
          papel, com precisão clínica.
        </p>
      </div>
    </section>
  );
}
