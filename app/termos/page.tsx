import Link from "next/link";

export const metadata = {
  title: "Termos de Uso | Ponto Cego",
  description: "Termos de Uso da Análise Ponto Cego, por Diego Ciriani.",
};

export default function TermsPage() {
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
          Termos de Uso.
        </h1>

        <p className="mt-8 text-sm leading-7 text-zinc-500">
          Última atualização: 01/07/2026
        </p>

        <div className="mt-14 space-y-10 text-base leading-8 text-zinc-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              1. Sobre o produto
            </h2>

            <p>
              A Análise Ponto Cego é uma leitura personalizada construída a
              partir das respostas fornecidas pela pessoa na Jornada Ponto Cego.
              O objetivo é ampliar clareza sobre padrões relacionais,
              recorrências afetivas, formas de se posicionar e pontos que podem
              não estar evidentes para a própria pessoa.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              2. O que o produto não é
            </h2>

            <p>
              A Análise Ponto Cego não substitui psicoterapia, avaliação
              psicológica, diagnóstico, laudo, parecer psicológico,
              acompanhamento clínico, atendimento de urgência ou tratamento em
              saúde mental.
            </p>

            <p className="mt-4">
              O produto tem caráter reflexivo, psicoeducativo e de organização
              de percepção sobre padrões relacionais.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              3. Como funciona
            </h2>

            <p>O fluxo do produto é:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>realização do pagamento;</li>
              <li>envio automático do link da Jornada Ponto Cego;</li>
              <li>preenchimento da Jornada pela pessoa compradora;</li>
              <li>análise das respostas;</li>
              <li>elaboração da Leitura Ponto Cego;</li>
              <li>envio do link seguro para acesso à leitura.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              4. Responsabilidade pelas informações enviadas
            </h2>

            <p>
              A qualidade da leitura depende diretamente da clareza,
              profundidade e veracidade das respostas fornecidas na Jornada. Ao
              preencher a Jornada, a pessoa declara que as informações enviadas
              correspondem à sua percepção e experiência.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              5. Prazo de entrega
            </h2>

            <p>
              O prazo de elaboração da Leitura Ponto Cego pode variar conforme
              volume de demandas, complexidade das respostas e organização
              interna. Quando a leitura estiver pronta, o link de acesso será
              enviado ao e-mail informado no checkout.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              6. Pagamento
            </h2>

            <p>
              O pagamento é processado por meio do Mercado Pago. A liberação da
              Jornada depende da confirmação do pagamento. Em alguns casos, a
              confirmação pode não ser imediata, especialmente em métodos como
              Pix ou análise de pagamento.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              7. Reembolsos e cancelamentos
            </h2>

            <p>
              Solicitações relacionadas a cancelamento, reembolso ou problemas
              com pagamento devem ser enviadas para:
            </p>

            <p className="mt-4 text-[#88B39A]">
              diegocirianipsicologo@gmail.com
            </p>

            <p className="mt-4">
              Cada solicitação será analisada considerando o estágio de entrega
              do produto, se a Jornada já foi preenchida e se a leitura já foi
              elaborada ou disponibilizada.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              8. Uso pessoal
            </h2>

            <p>
              A Leitura Ponto Cego é individual, pessoal e intransferível. O
              link de acesso é privado e não deve ser compartilhado
              publicamente.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              9. Situações de crise ou urgência
            </h2>

            <p>
              A Análise Ponto Cego não é um canal de atendimento emergencial.
              Em situações de risco, crise intensa, ideação suicida, violência,
              ameaça ou emergência, procure imediatamente serviços de urgência,
              rede de apoio local ou atendimento profissional adequado.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              10. Privacidade
            </h2>

            <p>
              O tratamento de dados pessoais é descrito na Política de
              Privacidade. Ao utilizar o produto, você declara estar ciente de
              que seus dados serão tratados para viabilizar pagamento, acesso à
              Jornada, elaboração da leitura e comunicação sobre a entrega.
            </p>

            <Link
              href="/politica-de-privacidade"
              className="mt-4 inline-block text-[#88B39A] transition hover:text-[#9fcaad]"
            >
              Ler Política de Privacidade →
            </Link>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-[#F5F5F3]">
              11. Alterações nos termos
            </h2>

            <p>
              Estes Termos de Uso podem ser atualizados periodicamente. A versão
              vigente será sempre a publicada nesta página.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}