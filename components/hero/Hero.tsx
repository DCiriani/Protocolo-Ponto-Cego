"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3.2 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 18v4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 12h4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 12h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 20c.8-3.5 3.1-5.2 6.5-5.2s5.7 1.7 6.5 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="font-satoshi relative min-h-[100svh] overflow-hidden bg-[#050705] text-[#F5F5F3]"
    >
      <Image
        src="/images/hero-mirror.png"
        alt="Homem olhando para o espelho"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[78%_center] opacity-90 md:object-[63%_center]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,5,0.98)_0%,rgba(5,7,5,0.88)_35%,rgba(5,7,5,0.38)_62%,rgba(5,7,5,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,5,0.18),rgba(5,7,5,0.16)_55%,rgba(5,7,5,0.95)_100%)]" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-12 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[640px]"
        >
          <div className="mb-10 inline-flex items-center gap-3 text-base text-zinc-300">
            <span className="h-2.5 w-2.5 rounded-full bg-[#88B39A]" />
            <span>Leitura clínica feita por um psicólogo.</span>
          </div>

         <h1 className="mx-auto max-w-[21rem] text-center font-satoshi text-[clamp(2.12rem,9.2vw,2.68rem)] font-black uppercase leading-[1.06] tracking-[-0.018em] text-[#F5F5F3] md:mx-0 md:max-w-none md:text-left md:text-[clamp(5.5rem,8vw,7.6rem)] md:leading-[0.98]">
  <span className="block whitespace-nowrap">Todo mundo tem</span>

  <span className="block whitespace-nowrap text-[1.07em] md:text-[1em]">
    um <span className="text-[#88B39A]">ponto cego</span>
  </span>
</h1>
          <p className="mt-10 max-w-[560px] text-[clamp(2rem,8vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.035em] text-[#F5F5F3] md:text-[clamp(3rem,4vw,4rem)]">
            O padrão mais difícil
            <br />
            de enxergar{" "}
            <span className="text-[#88B39A]">é o seu.</span>
          </p>

          <p className="mt-8 max-w-[520px] text-[1.08rem] leading-8 text-zinc-300 md:text-xl md:leading-9">
            Talvez exista um padrão que continua influenciando suas escolhas,
            seus relacionamentos e seus conflitos sem que você perceba. A
            Análise Ponto Cego foi criada para tornar esse padrão visível.
          </p>

          <div id="comecar" className="mt-9">
            <Button href="/checkout" className="w-full max-w-[470px] sm:w-auto">
              Quero enxergar meus padrões
            </Button>
          </div>

          <div className="mt-8 grid max-w-[520px] gap-3">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#88B39A]/10 text-[#88B39A]">
                  <PersonIcon />
                </div>

                <div>
                  <p className="text-base font-semibold leading-tight tracking-[-0.02em] text-[#F5F5F3]">
                    Feita pessoalmente
                  </p>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Pelo psicólogo Diego Ciriani
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#88B39A]/10 text-[#88B39A]">
                  <ClockIcon />
                </div>

                <div>
                  <p className="text-base font-semibold leading-tight tracking-[-0.02em] text-[#F5F5F3]">
                    Até 48h
                  </p>

                  <p className="mt-1 text-sm leading-5 text-zinc-500">
                    Prazo de entrega
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-3 grid max-w-[520px] gap-3 md:mt-4 md:max-w-none md:grid-cols-2 md:gap-4">
          <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#88B39A]/10 text-[#88B39A]">
                <ClockIcon />
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold leading-tight text-[#F5F5F3]">
                  Leitura profunda
                </p>

                <p className="mt-1 text-sm leading-5 text-zinc-400">
                  Mais que respostas, direcionamento real.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#88B39A]/10 text-[#88B39A]">
                <TargetIcon />
              </div>

              <div className="min-w-0">
                <p className="text-base font-semibold leading-tight text-[#F5F5F3]">
                  Foco no que importa
                </p>

                <p className="mt-1 text-sm leading-5 text-zinc-400">
                  Seus padrões, suas escolhas, sua vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}