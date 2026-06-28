"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-[#0A0A0A]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_58%,rgba(136,179,154,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.1),#0A0A0A_96%)]" />

      <Container className="relative z-10 flex min-h-[100svh] items-center pt-20 pb-10 md:pt-16">
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 max-w-[700px]"
          >
            <div className="mb-7 inline-flex items-center gap-3 text-xs text-zinc-400 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#88B39A]" />
              <span>Leitura clínica feita por um psicólogo.</span>
            </div>

            <h1 className="text-[2.85rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F5F3] sm:text-[3.4rem] md:text-[4.6rem] lg:text-[clamp(3.6rem,5.1vw,5.25rem)]">
              <span className="block">Todo mundo tem</span>
              <span className="block">um ponto cego.</span>
            </h1>

            <p className="mt-7 max-w-xl text-[1.55rem] font-medium leading-[1.04] tracking-[-0.04em] text-[#F5F5F3] sm:text-[1.9rem] md:text-[2.6rem] lg:text-[clamp(1.9rem,2.7vw,2.85rem)]">
              O padrão mais difícil
              <br />
              de enxergar é{" "}
              <span className="font-heading text-[#88B39A]">o seu.</span>
            </p>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-[16px] sm:leading-8 md:text-[17px]">
              Talvez exista um padrão que continua influenciando suas escolhas,
              seus relacionamentos e seus conflitos sem que você perceba.
              A Análise Ponto Cego foi criada para tornar esse padrão visível.
            </p>

            <div id="comecar" className="mt-8">
              <Button href="/api/checkout" className="w-full sm:w-auto">
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
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute bottom-[-5vh] right-[-9vw] z-10 hidden h-[78vh] w-[55vw] lg:block"
          >
            <div className="absolute inset-0 rounded-full bg-[#88B39A]/10 blur-[130px]" />

            <Image
              src="/images/diego-ciriani.png"
              alt="Diego Ciriani"
              fill
              priority
              sizes="55vw"
              className="object-contain object-bottom opacity-95"
            />

            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}