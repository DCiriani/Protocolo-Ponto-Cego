"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function Why() {
  return (
    <section
      id="porque"
      className="relative overflow-hidden bg-[#0A0A0A] py-32 md:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(136,179,154,0.08),transparent_32%)]" />

      <Container className="relative z-10">
        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              A origem
            </span>

            <h2 className="max-w-xl text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#F5F5F3]">
              Por que criei a{" "}
              <span className="font-heading text-[#88B39A]">
                Análise Ponto Cego?
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl"
          >
            <div className="space-y-8 text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
              <p>
                Durante mais de uma década atendendo pessoas em psicoterapia,
                ouvi centenas de histórias.
              </p>

              <p>
                Algumas falavam sobre abandono. Outras sobre conflitos
                constantes. Outras sobre relações que pareciam saudáveis por
                fora, mas escondiam um sofrimento silencioso.
              </p>

              <p>
                As histórias eram diferentes. As pessoas também. Mas, muitas
                vezes, havia algo que permanecia.
              </p>

              <p className="text-[#F5F5F3]">
                Os mesmos padrões. As mesmas formas de interpretar. Os mesmos
                ciclos que insistiam em se repetir, mesmo quando existia um
                desejo genuíno de fazer diferente.
              </p>

              <p>
                Foi dessa observação que nasceu a Análise Ponto Cego.
              </p>

              <p>
                Não como um teste. Nem como um diagnóstico. Mas como uma forma
                de transformar anos de experiência clínica em uma leitura
                cuidadosa, personalizada e humana.
              </p>
            </div>

            <div className="mt-14 border-l border-[#88B39A] pl-7">
              <p className="font-heading text-3xl leading-tight text-[#F5F5F3] md:text-5xl">
                A mudança nem sempre começa quando a vida muda.
                <br />
                <span className="text-[#88B39A]">
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