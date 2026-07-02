import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | Ponto Cego",
  description:
    "Política de Privacidade da Análise Ponto Cego, por Diego Ciriani.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-20 text-[#F5F5F3]">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-12 inline-block text-sm font-medium text-zinc-500 transition hover:text-[#88B39A]"
        >
          ← Voltar para o site
        </Link>

        <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#88B39A]">
          Ponto Cego
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Política de Privacidade.
        </h1>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          Última atualização: 01/07/2026
        </p>

        <div className="mt-14 space-y-10 text-base leading-8 text-zinc-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              1. Quem somos
            </h2>

            <p>
              A Análise Ponto Cego é um serviço de leitura reflexiva e
              personalizada, conduzido por Diego Ciriani, psicólogo, com o
              objetivo de ajudar a pessoa a ampliar clareza sobre padrões
              relacionais a partir das respostas fornecidas na Jornada Ponto
              Cego.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              2. Quais dados coletamos
            </h2>

            <p>Podemos coletar os seguintes dados:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>nome;</li>
              <li>e-mail;</li>
              <li>informações de pagamento e status da compra;</li>
              <li>respostas fornecidas na Jornada Ponto Cego;</li>
              <li>registros técnicos necessários para funcionamento do site;</li>
              <li>data de envio da Jornada e data de acesso à leitura.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              3. Para que usamos seus dados
            </h2>

            <p>Usamos seus dados para:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>processar sua compra;</li>
              <li>liberar o acesso à Jornada Ponto Cego;</li>
              <li>elaborar sua Leitura Ponto Cego;</li>
              <li>enviar e-mails relacionados à Jornada e à entrega da leitura;</li>
              <li>organizar internamente o status da análise;</li>
              <li>cumprir obrigações legais, quando aplicável.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              4. Sobre as respostas da Jornada
            </h2>

            <p>
              As respostas fornecidas na Jornada podem conter informações
              pessoais e sensíveis sobre sua vida afetiva e relacional. Essas
              informações são usadas exclusivamente para a elaboração da Leitura
              Ponto Cego e para organização interna do atendimento relacionado
              ao produto adquirido.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              5. Compartilhamento de dados
            </h2>

            <p>
              Não vendemos seus dados pessoais. Podemos utilizar serviços de
              terceiros necessários para funcionamento do produto, como
              processamento de pagamento, hospedagem, banco de dados e envio de
              e-mails. Esses serviços recebem apenas os dados necessários para
              executar suas funções.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              6. Pagamentos
            </h2>

            <p>
              Os pagamentos são processados pelo Mercado Pago. Não armazenamos
              dados completos de cartão de crédito. Recebemos apenas informações
              necessárias para confirmar o status do pagamento e liberar o
              acesso à Jornada.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              7. Segurança
            </h2>

            <p>
              Adotamos medidas técnicas e organizacionais para proteger os
              dados pessoais armazenados, incluindo controle de acesso ao painel
              administrativo, uso de banco de dados protegido e links privados
              para entrega das leituras.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              8. Prazo de armazenamento
            </h2>

            <p>
              Os dados podem ser armazenados pelo tempo necessário para entrega
              da análise, organização administrativa, cumprimento de obrigações
              legais e eventual necessidade de suporte. Você pode solicitar a
              exclusão dos seus dados, observadas obrigações legais ou
              regulatórias aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              9. Seus direitos
            </h2>

            <p>
              Você pode solicitar acesso, correção, atualização ou exclusão dos
              seus dados pessoais. Para isso, entre em contato pelo e-mail:
            </p>

            <p className="mt-4 text-[#88B39A]">
              diegocirianipsicologo@gmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              10. Alterações nesta política
            </h2>

            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente
              para refletir mudanças no produto, em processos internos ou na
              legislação aplicável.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}