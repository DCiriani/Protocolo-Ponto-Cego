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
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/50 text-[#6F8F5E] md:h-11 md:w-11">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]"
        aria-hidden="true"
      >
        {index === 0 && (
          <>
            <circle cx="10.5" cy="10.5" r="5.5" {...commonProps} />
            <path d="M15 15L20 20" {...commonProps} />
          </>
        )}

        {index === 1 && (
          <>
            <path
              d="M3 12C5.4 8.8 8.4 7 12 7C15.6 7 18.6 8.8 21 12C18.6 15.2 15.6 17 12 17C8.4 17 5.4 15.2 3 12Z"
              {...commonProps}
            />
            <circle cx="12" cy="12" r="2.3" {...commonProps} />
            <path d="M4 4L20 20" {...commonProps} />
          </>
        )}

        {index === 2 && (
          <>
            <path
              d="M19 8A8 8 0 0 0 5.5 6.2L3 9"
              {...commonProps}
            />
            <path d="M3 5V9H7" {...commonProps} />
            <path
              d="M5 16A8 8 0 0 0 18.5 17.8L21 15"
              {...commonProps}
            />
            <path d="M21 19V15H17" {...commonProps} />
          </>
        )}

        {index === 3 && (
          <>
            <path
              d="M12 3L19 6V11.5C19 16 16.2 19.1 12 21C7.8 19.1 5 16 5 11.5V6L12 3Z"
              {...commonProps}
            />
            <path d="M9.5 12L11.2 13.7L14.8 10" {...commonProps} />
          </>
        )}

        {index === 4 && (
          <>
            <path d="M5 19L19 5" {...commonProps} />
            <path d="M11 5H19V13" {...commonProps} />
            <path d="M7.5 13.5L5 19L10.5 16.5" {...commonProps} />
          </>
        )}
      </svg>
    </span>
  );
}

function ReadingMockup() {
  return (
    <div className="relative mx-auto mt-10 max-w-[790px] overflow-hidden rounded-[1.45rem] border border-[#8B774F]/45 bg-[radial-gradient(circle_at_8%_8%,rgba(139,101,59,0.22),transparent_34%),linear-gradient(145deg,rgba(20,18,14,0.98),rgba(6,7,6,0.99))] px-4 py-7 shadow-[inset_0_1px_0_rgba(255,241,205,0.05),0_30px_90px_rgba(0,0,0,0.48)] md:px-8 md:py-9">
      {/* textura da moldura externa */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 22%, rgba(181,139,82,0.16), transparent 22%),
            radial-gradient(circle at 82% 76%, rgba(106,81,48,0.12), transparent 25%),
            repeating-linear-gradient(
              0deg,
              rgba(255,240,210,0.012) 0px,
              rgba(255,240,210,0.012) 1px,
              transparent 1px,
              transparent 5px
            )
          `,
        }}
      />

      <div className="relative mx-auto max-w-[660px]">
        {/* folhas empilhadas atrás */}
        <div className="absolute -left-3 bottom-2 top-4 w-full -rotate-[0.7deg] rounded-[0.35rem] border border-[#B79A64]/15 bg-[#0D0D0B] shadow-[0_16px_45px_rgba(0,0,0,0.42)] md:-left-5" />

        <div className="absolute -right-3 bottom-1 top-2 w-full rotate-[0.65deg] rounded-[0.35rem] border border-white/10 bg-[#12120F] shadow-[0_14px_40px_rgba(0,0,0,0.4)] md:-right-5" />

        <div className="absolute -left-1 bottom-0 top-1 w-full rounded-[0.35rem] border border-white/10 bg-[#171611]" />

        {/* folha principal */}
        <div className="relative overflow-hidden rounded-[0.3rem] border border-[#B49A68]/25 bg-[linear-gradient(180deg,rgba(19,18,15,0.99)_0%,rgba(7,8,7,0.99)_100%)] px-5 pb-7 pt-8 shadow-[0_24px_75px_rgba(0,0,0,0.6)] md:px-9 md:pb-9 md:pt-10">
          {/* textura do papel */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.19]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 8% 12%, rgba(172,131,76,0.14), transparent 25%),
                radial-gradient(circle at 88% 20%, rgba(105,82,52,0.11), transparent 28%),
                radial-gradient(circle at 30% 84%, rgba(145,107,65,0.08), transparent 25%),
                repeating-linear-gradient(
                  0deg,
                  rgba(255,244,220,0.015) 0px,
                  rgba(255,244,220,0.015) 1px,
                  transparent 1px,
                  transparent 5px
                )
              `,
            }}
          />

          {/* grão */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] mix-blend-soft-light"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <filter id="receive-document-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>

            <rect
              width="100%"
              height="100%"
              filter="url(#receive-document-grain)"
            />
          </svg>

          {/* vinheta */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.34)_100%)]" />

          <div className="relative z-10">
            {/* título */}
            <div className="text-center">
              <h3 className="whitespace-nowrap font-[family-name:var(--font-bodoni)] text-[1.7rem] font-medium uppercase leading-none tracking-[0.025em] text-[#F4EBDD] min-[390px]:text-[1.95rem] md:text-[3rem]">
                Ponto Cego · 48h
              </h3>

              <p className="mt-3 font-satoshi text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-[#6F8F5E] min-[390px]:text-[0.62rem] md:text-[0.78rem] md:tracking-[0.36em]">
                Sua leitura personalizada
              </p>
            </div>

                        {/* frase destacada */}
            <div className="relative mt-7 rounded-[0.8rem] border border-[#6F8F5E]/40 bg-black/10 px-5 py-5 text-center md:mt-8 md:px-8">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#11100D] px-3 text-[#6F8F5E]">
                ✦
              </span>

              <p className="font-[family-name:var(--font-bodoni)] text-[0.98rem] leading-[1.4] text-[#E8DECD] md:text-[1.25rem]">
                <span className="mr-2 text-[#6F8F5E]">“</span>
                Você tende a interpretar distância como rejeição, e isso...{" "}
                <span
                  className="select-none"
                  style={{
                    color: "transparent",
                    textShadow: "0 0 5px rgba(232, 222, 205, 0.72)",
                  }}
                >
                  influencia a forma como você responde aos seus relacionamentos.
                </span>
              </p>
            </div>

            {/* conteúdos da leitura */}
            <div className="mt-7 md:mt-8">
              {reportItems.map((item, index) => (
                <div
                  key={item}
                  className={`flex gap-4 py-4 md:gap-5 md:py-5 ${
                    index !== reportItems.length - 1
                      ? "border-b border-[#6F8F5E]/18"
                      : ""
                  }`}
                >
                  <ReportIcon index={index} />

                  <div className="min-w-0 flex-1">
                    <p className="font-satoshi text-[0.58rem] font-semibold uppercase leading-4 tracking-[0.13em] text-[#6F8F5E] md:text-[0.72rem] md:tracking-[0.16em]">
                      {index + 1}. {item}
                    </p>

                    <div className="mt-3 space-y-2.5 opacity-100 md:opacity-85">
  <div className="h-[7px] w-full rounded-full bg-[#D8CFBF]/30 blur-[1px] shadow-[0_0_7px_rgba(216,207,191,0.22)] md:h-[6px] md:bg-[#D8CFBF]/22 md:blur-[1.4px]" />

  <div className="h-[7px] w-[94%] rounded-full bg-[#D8CFBF]/26 blur-[1px] shadow-[0_0_7px_rgba(216,207,191,0.18)] md:h-[6px] md:bg-[#D8CFBF]/18 md:blur-[1.4px]" />

  {index !== 4 && (
    <div className="h-[7px] w-[78%] rounded-full bg-[#D8CFBF]/22 blur-[1px] shadow-[0_0_7px_rgba(216,207,191,0.16)] md:h-[6px] md:bg-[#D8CFBF]/15 md:blur-[1.4px]" />
  )}
</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* borda interna */}
          <div className="pointer-events-none absolute inset-[1px] rounded-[0.25rem] border border-[#D0B278]/5" />
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
          viewport={{ once: true, amount: 0.08 }}
transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[860px]"
        >
          <div>
            <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
              A entrega
            </p>

            <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />

            <h2 className="mt-7 font-[family-name:var(--font-bodoni)] text-[3.4rem] font-medium leading-[0.95] tracking-[-0.03em] min-[390px]:text-[3.85rem] md:text-[5.7rem] lg:text-[6.4rem]">
  <span className="block whitespace-nowrap text-[#F5F5F3]">
    Sua leitura
  </span>

  <span className="block text-[#6F8F5E]">
    Ponto cego
  </span>
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
Nem todo padrão se apresenta como problema.{" "}
<span className="text-[#6F8F5E]">
  Alguns se apresentam como familiaridade.
</span>
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