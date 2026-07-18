"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const items = [
  {
    number: "01",
    title: "Você identifica o padrão por trás dos episódios",
    text: "Aquilo que parecia azar, excesso de sensibilidade ou um problema isolado começa a fazer sentido como parte de um ciclo.",
  },
  {
    number: "02",
    title: "Você entende o que dispara suas reações",
    text: "Percebe como medos, interpretações e formas de proteção influenciam o que você faz depois.",
  },
  {
    number: "03",
    title: "Você reconhece onde se abandona, ou onde afasta o outro",
    text: "Fica mais claro quando você silencia necessidades, ultrapassa limites, controla, evita ou aceita menos do que realmente precisa.",
  },
  {
    number: "04",
    title: "Você sabe por onde começar",
    text: "A leitura não termina em \"entendi o problema\". Ela fecha com direcionamentos práticos: os primeiros passos para interromper o automático e decidir de forma mais consciente.",
  },
];

export default function Transformations() {
  return (
    <section
  id="clareza"
  className="relative overflow-hidden bg-[#050705] pt-6 pb-20 text-[#F5F5F3] md:pt-8 md:pb-28"
>
      {/* luz de fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.20),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_50%,#050705_100%)]" />

      {/* textura sutil */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="transformations-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#transformations-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
              Clareza
            </p>
            <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />
          </div>

        <h2 className="max-w-[760px] font-[family-name:var(--font-bodoni)] font-medium leading-[0.96] tracking-[0.01em] text-[#F5F5F3] md:max-w-none">
  <span className="block text-[1.95rem] min-[390px]:text-[2.25rem] md:whitespace-nowrap md:text-[4.6rem] lg:text-[6rem]">
    O que muda quando
  </span>

  <span className="block text-[3rem] text-[#6F8F5E] md:whitespace-nowrap md:text-[4.6rem] lg:text-[6rem]">
    Você enxerga
  </span>
</h2>
        </motion.div>

        <div className="relative mt-12 md:mt-16">
          {/* linha vertical */}
          <div className="absolute left-[0.15rem] top-10 hidden h-[calc(100%-4.5rem)] w-px bg-[#6F8F5E]/65 md:block" />

          <div className="space-y-5 md:space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.26 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* ponto da linha */}
                <span className="absolute -left-[0.45rem] top-9 hidden h-4 w-4 rounded-full border-2 border-[#6F8F5E] bg-[#050705] md:block" />

                <div className="rounded-[1.1rem] border border-[#6F8F5E]/35 bg-black/20 p-5 backdrop-blur-sm md:ml-5 md:grid md:grid-cols-[120px_1fr] md:p-7">
  {/* celular: número e título lado a lado, com linha divisória abaixo */}
  <div className="mb-4 flex items-center gap-3 border-b border-[#6F8F5E]/20 pb-4 md:hidden">
    <p className="font-[family-name:var(--font-bodoni)] text-[2.4rem] font-medium leading-none text-[#6F8F5E]">
      {item.number}
    </p>

    <h3 className="max-w-[420px] font-[family-name:var(--font-bodoni)] text-[1.7rem] font-medium leading-[1.05] text-[#F5F5F3]">
      {item.title}
    </h3>
  </div>

  {/* iPad e computador: número em coluna própria, como antes */}
  <div className="hidden md:block md:border-r md:border-[#6F8F5E]/20 md:pb-0 md:pr-6">
    <p className="font-[family-name:var(--font-bodoni)] text-[4.4rem] font-medium leading-none text-[#6F8F5E]">
      {item.number}
    </p>
  </div>

  <div className="md:pl-7">
    {/* iPad e computador: título separado, como antes */}
    <h3 className="hidden max-w-[620px] font-[family-name:var(--font-bodoni)] text-[2rem] font-medium leading-[1.05] text-[#F5F5F3] md:block md:text-[2.rem] lg:text-[2.65rem]">
      {item.title}
    </h3>

    <p className="mt-4 max-w-[640px] text-[1rem] leading-8 text-zinc-300 md:text-[1.12rem] md:leading-9">
      {item.text}
    </p>
  </div>
</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
