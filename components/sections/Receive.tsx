"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const items = [
  "Padrões identificados",
  "Possíveis pontos cegos",
  "Ciclos que se repetem",
  "Fatores que podem manter o problema",
  "Direcionamentos práticos",
];

export default function Receive() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(136,179,154,0.09),transparent_36%)]" />

      <Container className="relative z-10">
        <div className="grid items-center gap-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-28">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              A entrega
            </span>

            <h2 className="max-w-2xl text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#F5F5F3]">
              Sua{" "}
              <span className="font-heading text-[#88B39A]">
                Leitura Ponto Cego
              </span>
              .
            </h2>

            <p className="mt-10 max-w-xl text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
              Ao final da análise, você recebe uma leitura escrita,
              personalizada e construída a partir das suas respostas.
            </p>

            <p className="mt-7 max-w-xl text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
              Ela não procura resumir quem você é. Ela organiza padrões,
              hipóteses e direcionamentos para que você consiga enxergar com
              mais clareza a forma como tem se relacionado.
            </p>

            <div className="mt-12 space-y-5">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-t border-white/10 pt-5 text-zinc-400"
                >
                  <span className="h-2 w-2 rounded-full bg-[#88B39A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preview da leitura */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#88B39A]/10 blur-[130px]" />

            <div className="relative mx-auto max-w-[520px] border border-white/10 bg-[#101010]/80 p-8 shadow-2xl backdrop-blur-md md:p-10">
              <div className="border border-white/10 bg-[#0A0A0A] p-8 md:p-10">
                <div className="mb-20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full border border-[#88B39A]" />
                    <span className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                      Ponto Cego
                    </span>
                  </div>

                  <span className="text-xs text-zinc-600">48h</span>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-600">
                    Leitura
                  </p>

                  <h3 className="mt-5 text-5xl font-semibold leading-none tracking-[-0.06em] text-[#F5F5F3] md:text-7xl">
                    Ponto
                    <br />
                    Cego
                  </h3>

                  <p className="mt-8 font-heading text-3xl leading-tight text-[#88B39A] md:text-4xl">
                    preparada a partir da sua história.
                  </p>
                </div>

                <div className="mt-20 space-y-8">
                  <PreviewLine title="Padrão observado" />
                  <PreviewLine title="Ponto cego possível" />
                  <PreviewLine title="Ciclo de repetição" />
                  <PreviewLine title="Direcionamento inicial" />
                </div>

                <div className="mt-20 border-t border-white/10 pt-8">
                  <p className="font-heading text-2xl leading-tight text-[#F5F5F3] md:text-3xl">
                    “Nem todo padrão se apresenta como problema. Alguns se
                    apresentam como familiaridade.”
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function PreviewLine({ title }: { title: string }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-600">
        {title}
      </p>

      <div className="space-y-2">
        <div className="h-2 w-full rounded-full bg-white/10" />
        <div className="h-2 w-2/3 rounded-full bg-white/10" />
      </div>
    </div>
  );
}
