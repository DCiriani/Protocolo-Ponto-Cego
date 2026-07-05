"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function Why() {
  return (
    <section
      id="porque"
      className="relative overflow-hidden bg-[#0A0A0A] pt-12 pb-16 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(136,179,154,0.08),transparent_32%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 block text-xs uppercase tracking-[0.35em] text-zinc-600 md:mb-8 md:text-sm">
            A origem
          </span>

          <h2 className="max-w-[22rem] font-satoshi text-[clamp(2.25rem,9.4vw,2.85rem)] font-black uppercase leading-[1.04] tracking-[-0.02em] text-[#F5F5F3] md:max-w-none md:text-[clamp(4.6rem,7vw,5.9rem)] md:leading-[0.98]">
  <span className="block">Por que criei a</span>

 <span className="mt-3 block whitespace-nowrap text-[0.68em] leading-[1.08] text-[#88B39A] md:mt-4 md:text-[0.68em]">
  Análise Ponto Cego?
</span>
</h2>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.01 }}
  transition={{
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="mt-8 max-w-2xl md:mt-12"
>
          <div className="space-y-7 text-[18px] leading-9 text-zinc-400 md:space-y-8 md:text-[20px] md:leading-10">
            <p>
              Durante mais de uma década atendendo pessoas em psicoterapia,
              ouvi centenas de histórias.
            </p>

            <p>
              Algumas falavam sobre abandono. Outras sobre conflitos constantes.
              Outras sobre relações que pareciam saudáveis por fora, mas
              escondiam um sofrimento silencioso.
            </p>

            <p>
              As histórias eram diferentes. As pessoas também. Mas, muitas
              vezes, havia algo que permanecia.
            </p>

            <p className="text-[#F5F5F3]">
              Os mesmos padrões. As mesmas formas de interpretar. Os mesmos
              ciclos que insistiam em se repetir, mesmo quando existia um desejo
              genuíno de fazer diferente.
            </p>

            <p>Foi dessa observação que nasceu a Análise Ponto Cego.</p>

            <p>
              Não como um teste. Nem como um diagnóstico. Mas como uma forma de
              transformar anos de experiência clínica em uma leitura cuidadosa,
              personalizada e humana.
            </p>
          </div>

          <div className="mt-12 border-l border-[#88B39A] pl-6 md:mt-14 md:pl-7">
            <p className="font-heading text-3xl leading-[1.15] text-[#F5F5F3] md:text-5xl">
  A mudança nem sempre começa quando a vida muda.{" "}
  <span className="text-[#88B39A]">
    Ela começa quando você finalmente consegue enxergá-la de outra forma.
  </span>
</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
