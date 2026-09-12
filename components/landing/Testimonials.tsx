import tokens from "./tokens.module.css";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    name: "Mariana R.",
    text: "Eu terminei de ler e fiquei impressionada. Tinha coisa ali que eu nem tinha colocado nas respostas e, mesmo assim, você conseguiu chegar em pontos que fazem muito sentido pra mim. Foi muito mais profundo do que eu imaginava quando comprei.",
  },
  {
    name: "Juliana A.",
    text: "Acabei de terminar a análise e precisava te falar que achei sensacional. Teve várias partes que bateram muito forte. Eu fui lendo e pensando: “é exatamente isso.” Eu estava querendo muito conseguir me entender melhor e sinto que agora algumas peças começaram a fazer sentido.",
  },
  {
    name: "Bruna L.",
    text: "Foi muito detalhada e, ao mesmo tempo, parecia que você tinha entendido coisas que eu mesma ainda não sabia explicar. Eu li tudo de uma vez porque não conseguia parar. Isso me surpreendeu demais.",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} style={{ textAlign: "center" }} data-reveal>
          Quem já leu a própria análise
        </div>
        <h2 className={styles.title} data-reveal>
          O que dizem depois de receber.
        </h2>
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <figure key={item.name} className={styles.card} data-reveal>
              <blockquote>{item.text}</blockquote>
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.note} data-reveal>
          Depoimentos reais, publicados com autorização de cada pessoa.
        </p>
      </div>
    </section>
  );
}
