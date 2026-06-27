"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const items = [
  {
    number: "01",
    title: "Você reconhece repetições.",
    text: "Aquilo que parecia acontecer por acaso começa a ganhar forma. Situações, escolhas e reações passam a ser vistas como parte de um padrão.",
  },
  {
    number: "02",
    title: "Você percebe onde se abandona.",
    text: "Alguns conflitos permanecem porque você aprende a silenciar necessidades, ultrapassar limites ou aceitar menos do que realmente sente.",
  },
  {
    number: "03",
    title: "Você entende melhor suas interpretações.",
    text: "Nem sempre o sofrimento nasce do que aconteceu. Às vezes, nasce da forma como você interpreta o silêncio, a distância ou o comportamento do outro.",
  },
  {
    number: "04",
    title: "Você ganha um ponto de partida.",
    text: "A leitura não promete resolver toda a sua história. Ela oferece clareza para saber onde começar a olhar com mais honestidade.",
  },
];

export default function Transformations() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(136,179,154,0.07),transparent_35%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
            Clareza
          </span>

          <h2 className="text-[clamp(3.8rem,7vw,8rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#F5F5F3]">
            O que começa a mudar quando você{" "}
            <span className="font-heading text-[#88B39A]">enxerga.</span>
          </h2>
        </motion.div>

        <div className="mt-24 grid border-t border-white/10 lg:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group border-b border-white/10 py-14 lg:px-10 lg:even:border-l"
            >
              <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600 transition group-hover:text-[#88B39A]">
                {item.number}
              </span>

              <h3 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F5F3] md:text-5xl">
                {item.title}
              </h3>

              <p className="mt-7 max-w-xl text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}