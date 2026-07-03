"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[92svh] overflow-hidden bg-[#0A0A0A]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_58%,rgba(136,179,154,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.08),#0A0A0A_96%)]" />

      <Container className="relative z-10 grid min-h-[92svh] items-center gap-12 pb-16 pt-28 md:pt-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 max-w-[660px]"
        >
          <div className="mb-7 inline-flex items-center gap-3 text-xs text-zinc-400 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#88B39A]" />
            <span>Leitura clínica feita por um psicólogo.</span>
          </div>

          <h1 className="text-[2.85rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F5F3] sm:text-[3.4rem] md:text-[4.6rem] lg:text-[clamp(3.6rem,5.1vw,5.25rem)]">
            <span className="block">Todo mundo tem</span>
            <span className="block">um ponto cego.</span>
          </h1>

          <p className="mt-7 max-w-xl font-medium tracking-[-0.04em] text-[#F5F5F3]">
  <span className="block text-[1.55rem] leading-[1.04] sm:text-[1.9rem] md:text-[2.55rem] lg:text-[clamp(1.9rem,2.6vw,2.7rem)]">
    O padrão mais difícil
  </span>

  <span className="block text-[1.45rem] leading-[1.04] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[clamp(1.7rem,2.25vw,2.35rem)]">
    de enxergar
  </span>

  <span className="mt-1 block font-heading text-[2.4rem] leading-[0.9] text-[#88B39A] sm:text-[3rem] md:text-[4rem] lg:text-[clamp(3rem,4vw,4.4rem)]">
    é o seu.
  </span>
</p>

          <p className="mt-6 max-w-[500px] text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            Talvez exista um padrão que continua influenciando suas escolhas,
            seus relacionamentos e seus conflitos sem que você perceba. A
            Análise Ponto Cego foi criada para tornar esse padrão visível.
          </p>

          <div id="comecar" className="mt-8">
            <Button href="/checkout" className="w-full sm:w-auto">
              Quero enxergar meus padrões
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm text-zinc-500 md:flex-row md:gap-5">
            <span>Feita pessoalmente</span>
            <span className="hidden md:inline">•</span>
            <span>Entrega em até 48h</span>
            <span className="hidden md:inline">•</span>
            <span>Sem IA</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 hidden lg:block"
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[#88B39A]/10 blur-[130px]" />

        <div className="relative ml-auto h-[500px] max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F0F0F]/80 xl:h-[560px] xl:max-w-[470px] xl:rounded-[2.5rem]">
  <Image
    src="/images/diego-ciriani.png"
    alt="Diego Ciriani"
    fill
    priority
    sizes="36vw"
    className="object-cover object-[center_28%] opacity-95"
  />

  <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
</div>
        </motion.div>
      </Container>
    </section>
  );
}