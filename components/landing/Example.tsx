import tokens from "./tokens.module.css";
import styles from "./Example.module.css";

export default function Example() {
  return (
    <section className={styles.section}>
      <div className={tokens.narrow}>
        <div className={styles.eyebrow} data-reveal>
          Exemplo de leitura
        </div>
        <h2 className={styles.title} data-reveal>
          Assim é uma parte de uma análise.
        </h2>
        <div className={styles.excerpt} data-reveal>
          <span className={styles.tag}>Parte 04 · A função</span>

          <p>
            Quando ele fica emburrado, você tenta diminuir a distância entre
            vocês.
          </p>

          <div className={styles.quote}>
            &ldquo;Eu vou atrás, tento conversar, abraçar. Tento deixar as coisas
            mais leves. Peço um beijo, um abraço e faço graça pra quebrar o
            gelo.&rdquo;
          </div>

          <p>E, em alguns momentos, você cede para a discussão acabar:</p>

          <blockquote className={styles.inlineQuote}>
            &ldquo;Às vezes concordo só para acabar a discussão [...] para não
            piorar a situação.&rdquo;
          </blockquote>

          <p>O ciclo pode estar funcionando mais ou menos assim:</p>

          <ol className={styles.cycle}>
            <li>Algo toca num assunto em que você já se sente insegura ou machucada.</li>
            <li>Você se magoa.</li>
            <li>Você começa a duvidar se tem direito de estar magoada.</li>
            <li>Ele fica irritado, aumenta o tom ou emburra.</li>
            <li>A distância entre vocês começa a incomodar muito.</li>
            <li>Você tenta fazer o clima melhorar.</li>
            <li>Vocês voltam a se falar ou a se aproximar.</li>
          </ol>

          <p>
            Mas o assunto que machucou você pode continuar sem uma solução de
            verdade.
          </p>

          <p>
            Por fora, o emburramento dele parece mudar o clima da relação. Por
            dentro, existe um movimento seu que também participa do ciclo: você
            começa a guardar a própria mágoa antes de ter certeza de que ela foi
            realmente ouvida.
          </p>

          <p className={styles.subhead}>Em outras palavras</p>
          <p>
            Você parece conseguir fazer a briga acabar. A pergunta é: depois que
            a briga acaba, aquilo que machucou você também foi resolvido? Ou
            vocês apenas voltaram ao &ldquo;normal&rdquo; sem falar mais sobre
            isso?
          </p>

          <p className={styles.subhead}>O seu possível ponto cego</p>
          <p style={{ marginBottom: 0 }}>
            Você escreveu que talvez tenha &ldquo;dependência emocional&rdquo; e
            &ldquo;necessidade de agradar&rdquo;. Essas palavras podem…
          </p>

          <div className={styles.sig}>
            Diego Ciriani · CRP 04/44668. Trecho real com cenas, falas e
            detalhes alterados. Nenhuma leitura é publicada sem autorização
            escrita.
          </div>
        </div>
      </div>
    </section>
  );
}
