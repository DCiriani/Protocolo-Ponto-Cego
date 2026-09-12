import tokens from "./tokens.module.css";
import styles from "./Faq.module.css";

const questions: { q: string; a: React.ReactNode }[] = [
  {
    q: "Funciona para qualquer tipo de relacionamento?",
    a: "Sim. A análise foca no seu padrão de comportamento dentro do vínculo, não em um formato específico. Funciona para relações heteroafetivas, homoafetivas e não monogâmicas.",
  },
  {
    q: "Posso fazer estando solteiro(a)?",
    a: "Sim, e costuma render uma leitura até mais rica. O padrão aparece em quem você procura, em quem responde e em quem evita. Não é preciso estar namorando para ele ficar visível.",
  },
  {
    q: "Quanto tempo leva para responder?",
    a: "Cerca de 12 minutos. É possível pausar e retomar depois, pelo mesmo link.",
  },
  {
    q: "Isso substitui terapia?",
    a: (
      <>
        Não. É a leitura de um recorte, feita uma vez, a partir do Método Ponto
        Cego. Terapia é um processo com continuidade. Em muitas leituras eu
        escrevo, com todas as letras, que o caso pede acompanhamento. Se for
        o seu caso, você pode <a href="/jornada?plano=leitura_devolutiva">agendar uma consulta comigo</a>.
      </>
    ),
  },
  {
    q: "Quem lê as minhas respostas?",
    a: "Só eu. Não terceirizo, não uso modelo automático nem repasso para equipe. Os dados ficam sob sigilo profissional e LGPD, e você pode pedir a exclusão quando quiser.",
  },
  {
    q: "E se eu não me identificar com o que você escrever?",
    a: "Me conta em até 7 dias a partir do recebimento. Eu releio o que você escreveu e faço um ajuste pontual de clareza sobre o que já foi entregue, sem custo.",
  },
  {
    q: "Como confirmo o seu registro no CRP?",
    a: "Meu registro é CRP 04/44668, e pode ser verificado diretamente no site do Conselho Regional de Psicologia.",
  },
];

export default function Faq() {
  return (
    <section className={styles.section} id="faq">
      <div className={tokens.narrow}>
        <div className={tokens.eyebrow} style={{ textAlign: "center" }} data-reveal>
          Dúvidas
        </div>
        <h2 className={styles.title} data-reveal>
          Perguntas frequentes
        </h2>
        <div className={styles.faq} data-reveal>
          {questions.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
