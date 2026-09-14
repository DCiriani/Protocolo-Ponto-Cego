import Image from "next/image";
import tokens from "./tokens.module.css";
import styles from "./Author.module.css";

export default function Author() {
  return (
    <section className={styles.section}>
      <div className={tokens.wrap}>
        <div className={tokens.eyebrow} data-reveal>
          Quem escreve
        </div>
        <h2 className={styles.name} data-reveal>
          Diego Ciriani
        </h2>

        <div className={styles.grid} data-reveal>
          <div className={styles.photoWrap}>
            <Image
              src="/diego-ciriani.jpg"
              alt="Diego Ciriani, psicólogo clínico"
              fill
              className={styles.photo}
              sizes="(max-width: 720px) 100vw, 300px"
            />
          </div>
          <div className={styles.copy}>
            <p>
              Sou psicólogo clínico com atuação focada em relacionamentos. Há
              mais de uma década acompanho pessoas que querem entender por que
              alguns padrões continuam se repetindo em seus vínculos, e hoje sou
              uma referência em Uberaba para quem busca esse tipo de trabalho
              clínico.
            </p>
            <p>
              Com o tempo, percebi que muitos conflitos não acontecem apenas por
              causa do que o outro fez. Eles também passam pela forma como você
              interpreta o que aconteceu, pelo lugar que costuma ocupar na
              relação e pelas maneiras que aprendeu a se proteger ao longo da
              vida. Foi a partir dessa experiência clínica que desenvolvi o
              Método Ponto Cego, a metodologia própria que uso em cada Análise
              Ponto Cego.
            </p>
            <p>
              Por isso, na Análise Ponto Cego, você não recebe um resultado
              automático nem uma resposta feita a partir de palavras-chave. Cada
              devolutiva passa pela minha leitura e responsabilidade
              profissional, seguindo a estrutura que desenvolvi para o Ponto
              Cego. Considero a sua história, o momento que você está vivendo, a
              forma como se relaciona e até as contradições que aparecem nas suas
              respostas.
            </p>
            <p className={styles.emphasis}>
              Porque você não cabe em um perfil pronto. E a sua história precisa
              ser compreendida como algo único.
            </p>
          </div>
        </div>

        <div className={styles.credentials} data-reveal>
          <p className={styles.creds}>
            Psicólogo clínico · CRP 04/44668 · Atuação focada em relacionamentos ·
            Atende em consultório e online, em Uberaba.
          </p>
          <p className={styles.social}>
            Acompanhe conteúdo sobre relacionamentos e psicologia clínica no
            Instagram:{" "}
            <a
              href="https://www.instagram.com/diegociriani.psi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @diegociriani.psi
            </a>
          </p>
        </div>

        <div className={styles.ctaWrap} data-reveal>
          <a href="#planos" className={styles.cta}>
            Quero minha análise
          </a>
        </div>
      </div>
    </section>
  );
}
