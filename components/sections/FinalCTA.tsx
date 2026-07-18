"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const benefits = [
  "Leitura escrita e individual da sua história",
  "Padrões e possíveis pontos cegos identificados",
  "Ciclos que se repetem e fatores que mantêm o problema",
  "Direcionamentos práticos: por onde começar a mudar",
  "Documento em PDF, entregue em até 48h",
  "Revisão pontual em até 7 dias, sem custo",
];

function CheckIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7F9650]/65 text-[#8FA65A] md:h-11 md:w-11">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 12.5L10 16.5L18 7.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function FinalCTA() {
  return (
    <section
      id="oferta"
      className="relative overflow-hidden bg-[#050705] pt-8 pb-20 text-[#F5F5F3] md:pt-12 md:pb-28"
    >
      {/* luz quente */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.18),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080A08_48%,#050705_100%)]" />

      {/* textura */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="final-cta-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#final-cta-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[900px]"
        >
          {/* cabeçalho */}
          <div className="max-w-[820px]">
            <p className="font-satoshi text-[0.8rem] font-light uppercase tracking-[0.48em] text-[#879A58] md:text-[0.95rem]">
              Sua análise
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px w-20 bg-[#6F8F5E]/70 md:w-24" />

              <span className="h-2.5 w-2.5 rotate-45 border border-[#879A58] bg-[#879A58]/80" />

              <div className="h-px w-20 bg-[#6F8F5E]/70 md:w-24" />
            </div>

            <h2 className="mt-8 font-[family-name:var(--font-bodoni)] text-[3rem] font-medium leading-[0.96] tracking-[-0.025em] min-[390px]:text-[3.35rem] md:text-[5.4rem] lg:text-[6rem]">
             <span className="block text-[2.4rem] text-[#F4EBDD] min-[390px]:text-[2.65rem] md:text-[5.4rem] lg:text-[6rem]">
  Uma leitura clínica
</span>

              <span className="block text-[#6F8F5E]">
                da sua história
              </span>
            </h2>

            <p className="mt-8 max-w-[690px] text-[1.05rem] leading-8 md:text-[1.28rem] md:leading-9">
  <span className="text-[#6F8F5E]">
    Você já pensou muito sobre o problema. Já conversou, tentou
    mudar, se culpou, culpou o outro e chegou a várias conclusões.
    Mesmo assim, continua voltando ao mesmo lugar.
  </span>{" "}
  <span className="text-zinc-300">
    Isso acontece porque ninguém enxerga com distância aquilo que
    vive por dentro.
  </span>
</p>

            <p className="mt-5 max-w-[690px] text-[1.05rem] leading-8 text-zinc-300 md:text-[1.28rem] md:leading-9">
              A Análise Ponto Cego oferece um olhar profissional, externo e
              organizado sobre as suas respostas. Não é uma sessão de
              psicoterapia e não substitui um processo terapêutico. É uma
              entrega pontual, escrita pessoalmente por um psicólogo com
              mais de uma década de experiência.
            </p>
          </div>

          {/* card da oferta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mt-11 overflow-hidden rounded-[1.8rem] border border-[#7F9650]/65 bg-[linear-gradient(155deg,rgba(12,13,10,0.97),rgba(5,6,5,0.99))] px-5 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_30px_90px_rgba(0,0,0,0.42)] md:mt-14 md:px-12 md:py-11"
          >
            {/* iluminação interna */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_7%,rgba(137,105,62,0.13),transparent_30%)]" />

            <div className="relative z-10">
              {/* etiqueta */}
              <div className="flex justify-center">
                <div className="relative rounded-full border border-[#7F9650]/65 px-7 py-3 md:px-10">
                  <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-[#879A58] bg-[#879A58]" />

                  <p className="text-center font-satoshi text-[0.68rem] font-light uppercase tracking-[0.38em] text-[#879A58] md:text-[0.85rem]">
                    Leitura personalizada
                  </p>
                </div>
              </div>

              {/* preço */}
<div className="mt-7 text-center md:mt-9">
  {/* valor anterior */}
  <p className="font-satoshi text-[0.95rem] font-medium tracking-[0.08em] text-zinc-600 line-through decoration-zinc-600 md:text-[1.1rem]">
    R$ 197
  </p>

  {/* valor atual */}
  <div className="mt-3 flex items-end justify-center">
    <span className="mb-3 mr-2 font-[family-name:var(--font-bodoni)] text-[2.3rem] leading-none text-[#6F8F5E] md:mb-5 md:text-[3.6rem]">
      R$
    </span>

    <span className="font-[family-name:var(--font-bodoni)] text-[7.3rem] font-medium leading-[0.75] tracking-[-0.07em] text-[#6F8F5E] min-[390px]:text-[8.1rem] md:text-[11rem]">
      147
    </span>
  </div>

  {/* condição */}
  <p className="mt-6 font-satoshi text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-500 md:text-[0.82rem]">
    Valor do lote atual de leituras
  </p>
</div>

              {/* ornamento */}
              <div className="mt-7 flex items-center justify-center gap-3 md:mt-9">
                <div className="h-px w-20 bg-[#6F8F5E]/55 md:w-28" />

                <span className="h-2.5 w-2.5 rotate-45 border border-[#879A58] bg-[#879A58]/80" />

                <div className="h-px w-20 bg-[#6F8F5E]/55 md:w-28" />
              </div>

              {/* benefícios */}
              <div className="mt-5 md:mt-7">
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-[#6F8F5E]/18 py-4 md:gap-5 md:py-5"
                  >
                    <CheckIcon />

                    <p className="text-[0.98rem] leading-7 text-zinc-300 md:text-[1.16rem] md:leading-8">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* botão */}
              <a
  href="/jornada"
  className="group mt-7 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-[0.95rem] border border-[#A0B26D]/65 bg-[linear-gradient(180deg,#647B3E_0%,#526733_100%)] px-3 py-5 text-center font-[family-name:var(--font-bodoni)] text-[1.08rem] font-medium leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_15px_40px_rgba(0,0,0,0.24)] transition duration-300 hover:bg-[linear-gradient(180deg,#718A48_0%,#5C733A_100%)] min-[390px]:text-[1.2rem] md:mt-9 md:gap-4 md:px-5 md:text-[2.2rem]"
>
                Quero garantir minha leitura

                <span className="shrink-0 text-[1.6rem] transition-transform duration-300 group-hover:translate-x-1 md:text-[2rem]">
                  →
                </span>
              </a>

              {/* rodapé da oferta */}
              <div className="mt-6 text-center text-[0.83rem] leading-6 text-zinc-400 md:text-[1rem]">
  Pagamento seguro via Mercado Pago
</div>

              {/* escassez */}
              <p className="mx-auto mt-3 max-w-[500px] text-center text-[0.83rem] leading-6 text-zinc-500 md:text-[0.95rem]">
                Como cada leitura é escrita pessoalmente, o número de análises
                por lote é limitado. Quando o lote atual fecha, o valor sobe.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
