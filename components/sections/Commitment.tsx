import styles from "./Commitment.module.css";

const faqs = [
  {
    q: "Posso fazer estando solteiro?",
    a: "Pode, e costuma render leitura melhor. Padrão de relação aparece em quem você procura, em quem você responde e em quem você evita. Não precisa estar namorando pra isso ficar visível.",
  },
  {
    q: "E se eu não me identificar com o que você escrever?",
    a: "Você me responde dizendo o que não bateu. Eu reescrevo ou devolvo o dinheiro, sua escolha. Sem formulário e sem discussão.",
  },
  {
    q: "Isso substitui terapia?",
    a: "Não. É a leitura de um recorte, feita uma vez. Terapia é um processo com continuidade. Em várias leituras eu escrevo, com todas as letras, que o caso pede acompanhamento.",
  },
  {
    q: "Quem lê as minhas respostas?",
    a: "Só eu. Os dados ficam em servidor com acesso restrito, sob sigilo profissional e LGPD, e você pode pedir a exclusão a qualquer momento.",
  },
  {
    q: "Quanto tempo leva pra responder?",
    a: "Cerca de 12 minutos. Dá pra pausar e voltar depois pelo mesmo link.",
  },
];

export default function Commitment() {
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.narrow}>
        <div className={styles.center}>
          <span className={styles.eyebrow}>Dúvidas</span>
          <h2 className={styles.title}>Perguntas que chegam sempre</h2>
          <hr className={styles.tick} />
        </div>

        {faqs.map((faq) => (
          <details key={faq.q} className={styles.item}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
