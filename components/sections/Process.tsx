"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Observar",
    text: "Você responde a cenários reais de relacionamento. Não existem respostas certas. O objetivo é observar como você percebe, interpreta e reage.",
  },
  {
    number: "02",
    title: "Compreender",
    text: "Cada resposta é lida e analisada individualmente por mim. Sem pontuação automática. Sem inteligência artificial. Cada palavra da sua leitura passa pelos olhos de um psicólogo.",
  },
  {
    number: "03",
    title: "Direcionar",
    text: "Você recebe sua Leitura Ponto Cego com padrões identificados, possíveis pontos cegos e direcionamentos práticos para considerar a partir da análise.",
  },
];

function EyeIcon() {
  const rays = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    const rad = (angle * Math.PI) / 180;
    const innerR = 30;
    const outerR = 44;
    const x1 = 60 + innerR * Math.cos(rad);
    const y1 = 60 + innerR * Math.sin(rad);
    const x2 = 60 + outerR * Math.cos(rad);
    const y2 = 60 + outerR * Math.sin(rad);
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]"
      style={{ filter: "drop-shadow(0 0 6px rgba(111,143,94,0.35))" }}
      aria-hidden="true"
    >
      <g stroke="#6F8F5E" strokeWidth="1.4" strokeLinecap="round" fill="none">
        {rays.map((r) => (
          <line key={r.key} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
        <path d="M18 60 C 40 28, 80 28, 102 60 C 80 92, 40 92, 18 60 Z" strokeWidth="1.6" />
        <circle cx="60" cy="60" r="13" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="3.5" fill="#6F8F5E" stroke="none" />
      </g>
    </svg>
  );
}

function DocumentPreview() {
  return (
    <div className="mt-8 md:ml-0 md:max-w-[620px]">
      <div className="relative overflow-hidden rounded-[0.95rem] border border-[#9C8459]/45 bg-[linear-gradient(180deg,rgba(22,19,14,0.98)_0%,rgba(11,10,8,0.99)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,240,200,0.08),inset_0_0_70px_rgba(150,118,72,0.10),0_22px_65px_rgba(0,0,0,0.42)] md:p-7">
        {/* textura de papel antigo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 12% 8%, rgba(185,145,86,0.14), transparent 24%),
              radial-gradient(circle at 88% 16%, rgba(112,88,55,0.12), transparent 26%),
              radial-gradient(circle at 22% 76%, rgba(160,124,74,0.09), transparent 22%),
              repeating-linear-gradient(
                0deg,
                rgba(255,242,215,0.018) 0px,
                rgba(255,242,215,0.018) 1px,
                transparent 1px,
                transparent 5px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255,242,215,0.012) 0px,
                rgba(255,242,215,0.012) 1px,
                transparent 1px,
                transparent 6px
              )
            `,
          }}
        />

        {/* craquelado / papel amassado mais visível */}
<svg
  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.34]"
  viewBox="0 0 700 500"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <defs>
    <filter id="paper-crackle-rough">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.018"
        numOctaves="3"
        seed="14"
        result="noise"
      />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" />
    </filter>
  </defs>

  <g
    filter="url(#paper-crackle-rough)"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M24 44 C78 34 112 58 158 47 C218 32 248 74 308 56 C358 41 401 72 458 58 C512 46 570 58 676 34"
      stroke="#B89A63"
      strokeWidth="0.65"
      opacity="0.28"
    />
    <path
      d="M34 128 C96 112 143 142 208 120 C263 101 316 139 372 116 C438 88 501 124 654 96"
      stroke="#D3B77B"
      strokeWidth="0.45"
      opacity="0.18"
    />
    <path
      d="M46 420 C104 372 168 420 230 374 C296 326 372 388 444 330 C506 281 590 318 680 250"
      stroke="#B89A63"
      strokeWidth="0.7"
      opacity="0.25"
    />
    <path
      d="M382 20 C348 88 398 132 354 202 C315 265 384 322 332 390 C306 424 324 462 292 494"
      stroke="#B89A63"
      strokeWidth="0.55"
      opacity="0.24"
    />
    <path
      d="M598 18 C578 58 600 88 568 128 C538 166 562 218 516 260 C482 292 492 340 448 380"
      stroke="#8F784F"
      strokeWidth="0.55"
      opacity="0.22"
    />
    <path
      d="M82 248 C132 228 184 250 236 224 C292 196 340 230 396 202"
      stroke="#D3B77B"
      strokeWidth="0.42"
      opacity="0.14"
    />
    <path
      d="M438 436 C492 402 546 424 620 384"
      stroke="#D3B77B"
      strokeWidth="0.42"
      opacity="0.16"
    />
    <path
      d="M10 310 C74 292 112 314 168 286 C216 262 258 282 304 248"
      stroke="#8F784F"
      strokeWidth="0.5"
      opacity="0.18"
    />
  </g>
</svg>

        {/* vinheta nas bordas */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_47%,rgba(0,0,0,0.34)_100%)]" />

        {/* borda interna envelhecida */}
        <div className="pointer-events-none absolute inset-[1px] rounded-[0.85rem] border border-[#C2A46A]/15" />

        {/* canto dobrado */}
<div className="pointer-events-none absolute right-0 top-0 z-30 h-[70px] w-[70px] md:h-[86px] md:w-[86px]">
  <svg viewBox="0 0 90 90" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="foldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EBD9AC" />
        <stop offset="45%" stopColor="#B9975E" />
        <stop offset="100%" stopColor="#4A3B24" />
      </linearGradient>
    </defs>

    {/* triângulo da dobra, fino e translúcido */}
    <path
      d="M90 0 L90 68 C 70 40, 48 18, 0 0 Z"
      fill="url(#foldGradient)"
      opacity="0.9"
    />

    {/* sombra sutil por baixo, colada no papel */}
    <path
      d="M90 0 L90 68 C 70 40, 48 18, 0 0 Z"
      fill="none"
      stroke="#000"
      strokeWidth="1"
      opacity="0.25"
    />

    {/* linha diagonal do vinco */}
    <path
      d="M2 2 C 34 20, 60 44, 88 76"
      fill="none"
      stroke="#F3E3BC"
      strokeWidth="0.9"
      opacity="0.55"
    />
  </svg>
</div>

        <div className="relative z-10">
          <div className="flex items-start justify-between border-b border-[#6F8F5E]/30 pb-5 pr-14">
            <div>
              <p className="font-[family-name:var(--font-bodoni)] text-[1.75rem] uppercase leading-none tracking-[0.04em] text-[#F4EBDD] md:text-[2.25rem]">
                Ponto Cego · 48h
              </p>

              <p className="mt-3 font-satoshi text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#6F8F5E] md:text-[0.74rem]">
                Sua leitura personalizada
              </p>
            </div>

            <div className="hidden md:block">
  <EyeIcon />
</div>
          </div>

          <div className="mt-7 grid gap-7 md:grid-cols-2">
            <div>
              <p className="font-satoshi text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#F4EBDD]">
                <span className="text-[#6F8F5E]">1.</span> Resumo da sua leitura
              </p>

              <p className="mt-3 text-[0.72rem] leading-5 text-[#D3CAB8]">
                Esta seção apresenta uma visão geral dos padrões identificados na
                sua leitura, de forma integrada e compreensível.
              </p>

              <div className="my-6 h-px bg-[#6F8F5E]/25" />

              <p className="font-satoshi text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#F4EBDD]">
                <span className="text-[#6F8F5E]">2.</span> Padrões identificados
              </p>

              <ul className="mt-3 space-y-2 text-[0.72rem] leading-4 text-[#D3CAB8]">
                <li>• Padrão de escuta emocional</li>
                <li>• Necessidade de validação externa</li>
                <li>• Ciclos de idealização e decepção</li>
                <li>• Dificuldade em comunicar necessidades</li>
              </ul>
            </div>

            <div className="border-t border-[#6F8F5E]/25 pt-7 md:border-l md:border-t-0 md:pl-7 md:pt-0">
              <p className="font-satoshi text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#F4EBDD]">
                <span className="text-[#6F8F5E]">3.</span> Pontos cegos
              </p>

              <p className="mt-3 text-[0.72rem] leading-5 text-[#D3CAB8]">
                Aspectos que podem estar fora do seu campo de percepção e
                impactando suas escolhas, conexões e reações.
              </p>

              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-[#8A7754]/22" />
                <div className="h-2 rounded-full bg-[#8A7754]/16" />
                <div className="h-2 w-4/5 rounded-full bg-[#8A7754]/11" />
              </div>

              <div className="my-6 h-px bg-[#6F8F5E]/25" />

              <p className="font-satoshi text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#F4EBDD]">
                <span className="text-[#6F8F5E]">4.</span> Direcionamentos práticos
              </p>

              <p className="mt-3 text-[0.72rem] leading-5 text-[#D3CAB8]">
                Sugestões objetivas para você considerar e aplicar no seu ritmo,
                de forma realista e possível.
              </p>

              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-[#8A7754]/22" />
                <div className="h-2 rounded-full bg-[#8A7754]/16" />
                <div className="h-2 w-3/4 rounded-full bg-[#8A7754]/11" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="processo"
      className="relative overflow-hidden bg-[#050705] py-20 text-[#F5F5F3] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_48%,#050705_100%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
              O processo
            </p>
            <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />
          </div>

          <h2 className="font-[family-name:var(--font-bodoni)] text-[3rem] font-medium leading-[0.95] tracking-[0.01em] text-[#F5F5F3] min-[390px]:text-[3.35rem] md:text-[5.2rem] lg:text-[6rem]">
            Como sua
            <br />
            <span className="text-[#6F8F5E]">Leitura acontece</span>
          </h2>

          <p className="mt-8 max-w-[640px] text-[1rem] leading-8 text-zinc-300 md:text-[1.18rem] md:leading-9">
            A Análise Ponto Cego não procura descobrir quem está certo. Ela
            procura compreender padrões que podem estar conduzindo sua forma de se
            relacionar.
          </p>
        </motion.div>

        <div className="relative mt-10 md:mt-14">
          <div className="absolute left-[0.15rem] top-10 hidden h-[610px] w-px bg-[#6F8F5E]/65 md:block" />

          <div className="space-y-5 md:space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <span className="absolute -left-[0.45rem] top-9 hidden h-4 w-4 rounded-full border-2 border-[#6F8F5E] bg-[#050705] md:block" />

                <div className="rounded-[1.1rem] border border-[#6F8F5E]/35 bg-black/20 p-5 backdrop-blur-sm md:ml-5 md:grid md:grid-cols-[120px_1fr] md:p-7">
                  <div className="mb-4 border-b border-[#6F8F5E]/20 pb-4 md:mb-0 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                    <p className="font-[family-name:var(--font-bodoni)] text-[3.4rem] font-medium leading-none text-[#6F8F5E] md:text-[4.4rem]">
                      {step.number}
                    </p>
                  </div>

                  <div className="md:pl-7">
                    <h3 className="font-[family-name:var(--font-bodoni)] text-[2rem] font-medium leading-none text-[#F5F5F3] md:text-[2.6rem]">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-[1rem] leading-8 text-zinc-300 md:text-[1.12rem] md:leading-9">
                      {step.text}
                    </p>

                    {step.number === "03" && (
                      <>
                        <DocumentPreview />

                        <div className="mt-5 flex items-center gap-3 text-zinc-300">
                          <span className="flex h-7 w-7 items-center justify-center rounded border border-[#6F8F5E]/55 text-[#6F8F5E]">
                            ▤
                          </span>
                          <span>Sua leitura, em documento escrito.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <a
            href="/checkout"
            className="group flex w-full items-center justify-center gap-4 rounded-[0.7rem] border border-[#8EA36B]/50 bg-[#4F6842] px-6 py-4 text-center font-[family-name:var(--font-bodoni)] text-[1.7rem] font-medium leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-[#5B7650] md:text-[2.2rem]"
          >
            Começar minha análise
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}