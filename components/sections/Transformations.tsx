"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const items = [
  {
    number: "01",
    title: "Você reconhece repetições",
    text: "Aquilo que parecia acontecer por acaso começa a ganhar forma. Situações, escolhas e reações passam a ser vistas como parte de um padrão.",
  },
  {
    number: "02",
    title: "Você percebe onde se abandona",
    text: "Alguns conflitos permanecem porque você aprende a silenciar necessidades, ultrapassar limites ou aceitar menos do que realmente sente.",
  },
  {
    number: "03",
    title: "Você entende melhor suas interpretações",
    text: "Nem sempre o sofrimento nasce do que aconteceu. Às vezes, nasce da forma como você interpreta o silêncio, a distância ou o comportamento do outro.",
  },
  {
    number: "04",
    title: "Você ganha um ponto de partida",
    text: "Clareza sobre onde começar a olhar com mais honestidade. Um mapa do que estava invisível até agora.",
  },
];

export default function Transformations() {
  return (
    <section
      id="clareza"
      className="relative overflow-hidden bg-[#050705] pt-12 pb-20 text-[#F5F5F3] md:pt-16 md:pb-28"
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

          <h2 className="max-w-[760px] font-[family-name:var(--font-bodoni)] text-[3rem] font-medium leading-[0.96] tracking-[0.01em] text-[#F5F5F3] min-[390px]:text-[3.35rem] md:text-[4.5rem] lg:text-[6rem]">
            O que muda quando
            <br />
            <span className="text-[#6F8F5E]">Você enxerga</span>
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
                  <div className="mb-4 border-b border-[#6F8F5E]/20 pb-4 md:mb-0 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                    <p className="font-[family-name:var(--font-bodoni)] text-[3.4rem] font-medium leading-none text-[#6F8F5E] md:text-[4.4rem]">
                      {item.number}
                    </p>
                  </div>

                  <div className="md:pl-7">
                    <h3 className="max-w-[620px] font-[family-name:var(--font-bodoni)] text-[2rem] font-medium leading-[1.05] text-[#F5F5F3] md:text-[2.rem] lg:text-[2.65rem]">
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