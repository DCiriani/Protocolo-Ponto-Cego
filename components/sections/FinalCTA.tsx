"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-[#0A0A0A] py-20 md:py-28 lg:py-32">
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

          <h2 className="text-[clamp(3.8rem,6.8vw,7.4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#F5F5F3]">
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
  <Button href="/checkout">Quero enxergar meus padrões</Button>
</div>

<div className="mx-auto mt-10 grid max-w-5xl gap-4 text-left md:grid-cols-3">
  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-6 py-6 transition hover:border-[#88B39A]/30 hover:bg-white/[0.05]">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#88B39A]/12 text-3xl text-[#A8C9B3]">
      ✓
    </div>

    <h3 className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-[#F5F5F3] md:text-[1.45rem] lg:text-[1.7rem]">
      Feita pessoalmente
    </h3>

    <p className="mt-3 text-[1.05rem] leading-7 text-zinc-400 md:text-base">
      Lida por mim, uma a uma.
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-6 py-6 transition hover:border-[#88B39A]/30 hover:bg-white/[0.05]">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#88B39A]/12 text-3xl text-[#A8C9B3]">
      ↯
    </div>

    <h3 className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-[#F5F5F3] md:text-[1.45rem] lg:text-[1.7rem]">
      Até 48h
    </h3>

    <p className="mt-3 text-[1.05rem] leading-7 text-zinc-400 md:text-base">
      Prazo claro de entrega.
    </p>
  </div>

  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] px-6 py-6 transition hover:border-[#88B39A]/30 hover:bg-white/[0.05]">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#88B39A]/12 text-3xl text-[#A8C9B3]">
      ∅
    </div>

    <h3 className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-[#F5F5F3] md:text-[1.45rem] lg:text-[1.7rem]">
      Sem IA
    </h3>

    <p className="mt-3 text-[1.05rem] leading-7 text-zinc-400 md:text-base">
      Nenhuma leitura automática.
    </p>
  </div>
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
