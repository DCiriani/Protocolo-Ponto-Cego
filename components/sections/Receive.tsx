"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const benefits = [
  "Padrões identificados",
  "Possíveis pontos cegos",
  "Ciclos que se repetem",
  "Fatores que podem manter o problema",
  "Direcionamentos práticos",
];

const reportItems = [
  "Padrões identificados",
  "Possíveis pontos cegos",
  "Ciclos que se repetem",
  "Fatores que podem manter o problema",
  "Direcionamentos práticos",
];

function CheckIcon() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/50 text-[#6F8F5E]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M6 12.5L10 16.5L18 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ReportIcon({ index }: { index: number }) {
  const icons = ["⌕", "◌", "↻", "⌾", "↗"];

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/40 text-[1rem] text-[#6F8F5E]">
      {icons[index]}
    </span>
  );
}

function ReadingMockup() {
  return (
    <div className="relative mx-auto mt-10 max-w-[760px] rounded-[1.45rem] border border-[#6F8F5E]/35 bg-black/20 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-8">
      {/* luz interna */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-[radial-gradient(circle_at_8%_12%,rgba(146,110,66,0.18),transparent_28%)]" />

      <div className="relative mx-auto max-w-[620px]">
        {/* folhas atrás */}
        <div className="absolute -left-4 top-3 h-full w-full rounded-[0.7rem] border border-white/10 bg-[#12110e]" />
        <div className="absolute -left-2 top-1 h-full w-full rounded-[0.7rem] border border-white/10 bg-[#17150f]" />

        {/* documento principal */}
        <div className="relative overflow-hidden rounded-[0.55rem] border border-[#C2A46A]/18 bg-[linear-gradient(180deg,rgba(18,17,14,0.98)_0%,rgba(8,8,7,0.98)_100%)] px-5 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.55)] md:px-9 md:py-9">
          {/* textura do documento */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 12% 8%, rgba(185,145,86,0.14), transparent 24%),
                radial-gradient(circle at 88% 16%, rgba(112,88,55,0.12), transparent 26%),
                repeating-linear-gradient(
                  0deg,
                  rgba(255,242,215,0.018) 0px,
                  rgba(255,242,215,0.018) 1px,
                  transparent 1px,
                  transparent 5px
                )
              `,
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.28)_100%)]" />

          <div className="relative z-10">
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-bodoni)] text-[2rem] font-medium uppercase leading-none tracking-[0.04em] text-[#F5F5F3] md:text-[3rem]">
                Ponto Cego · 48h
              </h3>

              <p className="mt-3 font-satoshi text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#6F8F5E] md:text-[0.78rem]">
                Sua leitura personalizada
              </p>
            </div>

            <div className="relative mt-8 rounded-[0.65rem] border border-[#6F8F5E]/35 px-5 py-4 text-center">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#11100d] px-3 text-[#6F8F5E]">
                ✦
              </span>

              <p className="font-[family-name:var(--font-bodoni)] text-[1.15rem] leading-snug text-[#F5F5F3] md:text-[1.35rem]">
                “Você tende a interpretar distância como rejeição, e isso...”
              </p>

              <div className="mx-auto mt-3 h-3 w-[72%] rounded-full bg-[#F5F5F3]/10 blur-[2px]" />
            </div>

            <div className="mt-8 space-y-5">
              {reportItems.map((item, index) => (
                <div key={item} className="flex gap-4 border-b border-[#6F8F5E]/18 pb-4">
                  <ReportIcon index={index} />

                  <div className="flex-1">
                    <p className="font-satoshi text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#6F8F5E] md:text-[0.78rem]">
                      {index + 1}. {item}
                    </p>

                    <div className="mt-3 space-y-2">
                      <div className="h-2 rounded-full bg-[#F5F5F3]/12 blur-[1px]" />
                      <div className="h-2 w-[92%] rounded-full bg-[#F5F5F3]/10 blur-[1px]" />
                      <div className="h-2 w-[78%] rounded-full bg-[#F5F5F3]/8 blur-[1px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Receive() {
  return (
    <section
      id="entrega"
      className="relative overflow-hidden bg-[#050705] pt-8 pb-20 text-[#F5F5F3] md:pt-12 md:pb-28"
    >
      {/* fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.20),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_48%,#050705_100%)]" />

      {/* textura */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="receive-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#receive-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[860px]"
        >
          <div>
            <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
              A entrega
            </p>

            <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />

            <h2 className="mt-7 font-[family-name:var(--font-bodoni)] text-[3.4rem] font-medium leading-[0.95] tracking-[-0.03em] text-[#F5F5F3] min-[390px]:text-[3.85rem] md:text-[5.7rem] lg:text-[6.4rem]">
              Sua Leitura Ponto Cego
            </h2>

            <div className="mt-9 max-w-[650px] space-y-7 text-[1.08rem] leading-[1.65] text-zinc-300 md:text-[1.28rem] md:leading-[1.7]">
              <p>
                Ao final da análise, você recebe uma leitura escrita,
                personalizada e construída a partir das suas respostas.
              </p>

              <p>
                Ela não procura resumir quem você é. Ela organiza padrões,
                hipóteses e direcionamentos para que você consiga enxergar com
                mais clareza a forma como tem se relacionado.
              </p>
            </div>
          </div>

          {/* lista de benefícios */}
          <div className="mt-10 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-[#6F8F5E]/18 pb-3"
              >
                <CheckIcon />
                <p className="text-[1rem] leading-6 text-zinc-300 md:text-[1.13rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <ReadingMockup />

          {/* metadados */}
          <div className="mx-auto mt-5 max-w-[760px] text-center text-[0.95rem] leading-7 text-zinc-400 md:text-[1.1rem]">
            Documento em PDF <span className="mx-2 text-[#6F8F5E]">•</span>
            Escrito individualmente para você{" "}
            <span className="mx-2 text-[#6F8F5E]">•</span>
            Entregue por e-mail em até 48h{" "}
            <span className="mx-2 text-[#6F8F5E]">•</span>
            Lido apenas por mim, com total sigilo
          </div>

          {/* frase */}
          <div className="mt-8 rounded-[1rem] border border-[#6F8F5E]/35 bg-black/20 px-6 py-6 text-center md:px-10">
            <p className="font-[family-name:var(--font-bodoni)] text-[1.65rem] font-medium leading-tight text-[#F5F5F3] md:text-[2.25rem]">
              <span className="mr-3 text-[2.4rem] leading-none text-[#6F8F5E]">
                “
              </span>
              Nem todo padrão se apresenta como problema.
              <br className="hidden md:block" />
              Alguns se apresentam como familiaridade.
            </p>
          </div>

          {/* botão */}
          <div className="mt-7 flex justify-center">
            <a
              href="/checkout"
              className="group inline-flex w-full max-w-[560px] items-center justify-center gap-4 rounded-[0.85rem] border border-[#8EA36B]/50 bg-[#4F6842] px-6 py-4 text-center font-[family-name:var(--font-bodoni)] text-[1.65rem] font-medium leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-[#5B7650] md:text-[2rem]"
            >
              Quero receber minha leitura
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}