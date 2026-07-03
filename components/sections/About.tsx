"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const credentials = [
  "Mais de uma década de experiência clínica",
  "Psicólogo Clínico",
  "Especialista em Relacionamentos",
  "Atendimento presencial e online",
  "Leitura feita pessoalmente",
  "Sem inteligência artificial",
];

export default function About() {
  return (
    <section
      id="diego"
      className="relative overflow-hidden bg-[#0A0A0A] pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgba(136,179,154,0.08),transparent_35%)]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-28">
          {/* Foto */}
         <motion.div
  initial={{ opacity: 0, y: 34 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.35 }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  className="relative order-2 -mt-10 lg:order-1 lg:-mt-16"
>
  <div className="pointer-events-none absolute inset-0 rounded-full bg-[#88B39A]/10 blur-[130px]" />

  <div className="relative h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] md:rounded-[2.5rem] lg:h-[560px]">
    <Image
      src="/images/diego-ciriani.png"
      alt="Diego Ciriani"
      fill
      className="object-cover object-[center_18%]"
    />

    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
  </div>
</motion.div>

          {/* Texto */}
<motion.div
  initial={{ opacity: 0, y: 34 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.35 }}
  transition={{
    duration: 0.9,
    delay: 0.12,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="-mt-10 lg:-mt-16"
>
            <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              Quem conduz
            </span>

         <h2 className="max-w-2xl text-[clamp(3.4rem,5vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#F5F5F3]">
  Diego Ciriani
</h2>

<p className="mt-5 max-w-[420px] font-heading text-[1.45rem] leading-[1.25] text-[#88B39A] md:text-[1.7rem] lg:text-[1.95rem]">
  criador da Análise Ponto Cego.
</p>

            <div className="mt-10 space-y-7 text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
              <p>
                Sou psicólogo clínico e, há mais de uma década, acompanho
                pessoas que desejam compreender melhor a forma como se
                relacionam.
              </p>

              <p>
                Ao longo desses anos, percebi que muitos conflitos não nascem
                apenas do que acontece entre duas pessoas, mas da maneira como
                cada uma interpreta, sente e responde ao que vive.
              </p>

              <p className="text-[#F5F5F3]">
                A Leitura Ponto Cego é conduzida pessoalmente por mim. Cada
                resposta é lida com atenção, sem pontuação automática, sem
                respostas prontas e sem inteligência artificial interpretando a
                sua história.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {credentials.map((item) => (
                <div
                  key={item}
                  className="border-t border-white/10 pt-4 text-sm leading-6 text-zinc-400"
                >
                  <span className="mr-2 text-[#88B39A]">●</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

