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

        {/* craquelado / marcas de dobra */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
          viewBox="0 0 700 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M58 38 C120 64 160 42 226 72 C288 101 342 78 410 112 C482 147 546 121 652 154"
            fill="none"
            stroke="#A99062"
            strokeWidth="0.7"
            opacity="0.35"
          />
          <path
            d="M96 438 C160 396 218 421 282 381 C354 335 432 376 520 324 C578 289 622 302 675 258"
            fill="none"
            stroke="#A99062"
            strokeWidth="0.65"
            opacity="0.24"
          />
          <path
            d="M375 22 C352 78 390 118 360 184 C330 250 374 306 342 365 C320 406 332 448 314 492"
            fill="none"
            stroke="#A99062"
            strokeWidth="0.55"
            opacity="0.18"
          />
          <path
            d="M52 164 C132 142 205 160 282 137"
            fill="none"
            stroke="#D0B980"
            strokeWidth="0.45"
            opacity="0.14"
          />
          <path
            d="M456 218 C510 198 566 212 642 184"
            fill="none"
            stroke="#D0B980"
            strokeWidth="0.45"
            opacity="0.13"
          />
        </svg>

        {/* vinheta nas bordas */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_47%,rgba(0,0,0,0.34)_100%)]" />

        {/* borda interna envelhecida */}
        <div className="pointer-events-none absolute inset-[1px] rounded-[0.85rem] border border-[#C2A46A]/15" />

        {/* canto dobrado */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-[4.25rem] w-[4.25rem] overflow-hidden">
          <div className="absolute right-0 top-0 h-0 w-0 border-l-[68px] border-t-[68px] border-l-transparent border-t-[#BCA06E]/65" />
          <div className="absolute right-[3px] top-[3px] h-0 w-0 border-l-[55px] border-t-[55px] border-l-transparent border-t-[#16130F]" />
          <div className="absolute right-[-8px] top-[50px] h-px w-[92px] origin-right -rotate-45 bg-[#D6BC80]/55" />
          <div className="absolute right-[6px] top-[8px] h-[50px] w-[50px] bg-[radial-gradient(circle_at_80%_10%,rgba(255,235,180,0.20),transparent_48%)]" />
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

            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#6F8F5E]/35 text-[#6F8F5E] md:flex">
              ◉
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