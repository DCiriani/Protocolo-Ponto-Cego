"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Observar",
    text: "Você responde situações reais. Não existem respostas certas. O objetivo é observar como você percebe, interpreta e reage.",
  },
  {
    number: "02",
    title: "Compreender",
    text: "Cada resposta é analisada individualmente. Sem pontuação automática. Sem inteligência artificial. Uma leitura clínica feita por um psicólogo.",
  },
  {
    number: "03",
    title: "Direcionar",
    text: "Você recebe sua Leitura Ponto Cego com padrões identificados, possíveis pontos cegos e direcionamentos práticos para considerar a partir da análise.",
  },
];

export default function Process() {
  return (
    <section
      id="como"
      className="relative overflow-hidden bg-[#0A0A0A] pt-6 pb-16 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(136,179,154,0.08),transparent_34%)]" />

      <Container className="relative z-10">
        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              O processo
            </span>

           <h2 className="max-w-[22rem] font-satoshi text-[clamp(2.65rem,11vw,3.35rem)] font-black uppercase leading-[1.02] tracking-[-0.03em] text-[#F5F5F3] md:max-w-xl md:text-[clamp(4.2rem,6vw,6.4rem)] md:leading-[0.94]">
  <span className="block">Como sua</span>

  <span className="mt-2 block whitespace-nowrap text-[#88B39A] md:mt-3">
    leitura acontece.
  </span>
</h2>

            <p className="mt-10 max-w-lg text-lg leading-9 text-zinc-400">
              A Análise Ponto Cego não procura descobrir quem está certo.
              Ela procura compreender padrões que podem estar conduzindo sua
              forma de se relacionar.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 h-full w-px bg-white/10" />

            <div className="space-y-10 md:space-y-12 lg:space-y-14">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#88B39A]/50 bg-[#0A0A0A]">
                    <div className="h-2 w-2 rounded-full bg-[#88B39A]" />
                  </div>

                  <span className="mb-4 block text-sm uppercase tracking-[0.35em] text-zinc-600">
                    {step.number}
                  </span>

                  <h3 className="text-4xl font-semibold tracking-[-0.04em] text-[#F5F5F3] md:text-6xl">
                    {step.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

