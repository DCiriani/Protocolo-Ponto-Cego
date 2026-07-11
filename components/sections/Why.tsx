"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function Why() {
  return (
    <section
      id="origem"
      className="relative overflow-hidden bg-[#050705] py-20 text-[#F5F5F3] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_48%,#050705_100%)]" />

      <Container className="relative z-10">
        <div className="mb-8">
          <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
            A origem
          </p>
          <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />
        </div>

        <div className="relative">
          <motion.h2
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.35 }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
className="relative z-20 max-w-[760px] font-[family-name:var(--font-bodoni)] text-[2.05rem] font-medium uppercase leading-[1.08] tracking-[0.02em] text-[#F5F5F3] min-[390px]:text-[2.25rem] md:text-[4.1rem] lg:text-[4.8rem]">
  <span className="block">Por que criei a</span>

  <span className="block text-[1.6rem] text-[#6F8F5E] md:text-[3.55rem] lg:text-[4rem] xl:text-[4.8rem]">
  Análise Ponto Cego?
</span>
</motion.h2>
          <div className="pointer-events-none absolute right-[-70px] top-[120px] z-10 h-[430px] w-[280px] opacity-75 md:right-[-60px] md:top-[160px] md:h-[620px] md:w-[420px] lg:right-[20px] lg:h-[700px] lg:w-[460px]">
            <Image
              src="/images/diego-poltronaaa.png"
              alt="Diego Ciriani"
              fill
              className="object-contain object-bottom"
              priority={false}
            />
          </div>

          <motion.div
  initial={{ opacity: 0, y: 34 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
  className="relative z-20 mt-10 max-w-[540px] space-y-7 text-[1rem] leading-8 text-zinc-300 md:mt-12 md:text-[1.15rem] md:leading-9"
>
          <p>
  Durante mais de uma década
  <br className="md:hidden" />
  atendendo pessoas na clínica,
  <br className="md:hidden" />
 ouvi milhares de histórias.
</p>

            <p>
              Algumas falavam sobre abandono. 
              <br className="md:hidden" />
              Outras sobre conflitos constantes.
              <br className="md:hidden" />
              Outras sobre relações que pareciam
              <br className="md:hidden" />
              saudáveis por fora, mas escondiam um 
              <br className="md:hidden" />
              sofrimento silencioso.
            </p>

            <p>
              As histórias eram diferentes. As pessoas também. Mas havia algo
              que permanecia.
            </p>

            <p>
              Os mesmos padrões. As mesmas formas de interpretar. Os mesmos
              ciclos que insistiam em se repetir, mesmo quando existia um desejo
              genuíno de fazer diferente.
            </p>

            <p>
              Foi dessa observação que nasceu a Análise Ponto Cego.
            </p>

            <p>
              Uma forma de transformar anos de experiência clínica em uma
              leitura cuidadosa, personalizada e humana. Não é um teste. Não é um
              diagnóstico. É um psicólogo lendo a sua história e devolvendo o que
              você ainda não conseguiu ver.
            </p>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, y: 34 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
  className="relative z-20 mt-10 rounded-[1.2rem] border border-[#6F8F5E]/35 bg-black/25 px-6 py-7 md:mt-14 md:px-10 md:py-9"
>
  <div className="flex gap-5">
    <span className="font-[family-name:var(--font-bodoni)] text-[4rem] leading-none text-[#6F8F5E]">
      “
    </span>

    <p className="font-[family-name:var(--font-bodoni)] text-[1.45rem] font-medium leading-[1.18] tracking-[0.01em] text-[#F5F5F3] md:text-[2.8rem]">
      A mudança nem sempre começa quando a vida muda.{" "}
      <span className="text-[#6F8F5E]">
        Ela começa quando você finalmente consegue enxergá-la de outra forma.
      </span>
    </p>
  </div>
</motion.div>
        </div>
      </Container>
    </section>
  );
}