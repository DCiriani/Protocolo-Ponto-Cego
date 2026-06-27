"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0A] py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(136,179,154,0.1),transparent_38%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl text-center"
        >
          <span className="mb-10 inline-flex items-center gap-3 text-sm text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-[#88B39A]" />
            Ponto Cego
          </span>

          <h2 className="text-[clamp(3.8rem,6.8vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#F5F5F3]">
            Os padrões mais difíceis
            <br />
            de enxergar costumam ser
            <br />
            os que mais{" "}
            <span className="font-heading text-[#88B39A]">influenciam.</span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
            A primeira mudança talvez não seja agir diferente. Talvez seja
            finalmente conseguir enxergar o que vem conduzindo suas escolhas.
          </p>

          <div className="mt-12">
            <Button href="#comecar">Quero enxergar meus padrões</Button>
          </div>

          <p className="mx-auto mt-12 max-w-xl text-sm leading-7 text-zinc-600">
            A Análise Ponto Cego é uma ferramenta de autoconhecimento. Não é
            diagnóstico e não substitui psicoterapia.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}