"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const infos = [
  "Psicólogo Clínico · CRP 04/44668",
  "Mais de uma década de experiência clínica",
  "Especialista em Relacionamentos",
  "Atendimento presencial e online",
  "Leitura feita pessoalmente",
  "Sem inteligência artificial",
];

export default function About() {
  return (
    <section
      id="quem-conduz"
      className="relative overflow-hidden bg-[#050705] pt-8 pb-20 text-[#F5F5F3] md:pt-12 md:pb-28"
    >
      {/* luz quente no canto superior */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.20),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_48%,#050705_100%)]" />

      {/* textura suave */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="about-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#about-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[860px]"
        >
          {/* cabeçalho */}
          <div className="mb-8 md:mb-10">
            <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#6F8F5E]">
              Quem conduz
            </p>

            <div className="mt-4 h-px w-20 bg-[#6F8F5E]" />

           <h2 className="mt-7 whitespace-nowrap font-[family-name:var(--font-bodoni)] text-[3rem] font-medium leading-[0.92] tracking-[-0.03em] text-[#F5F5F3] min-[390px]:text-[3.35rem] md:text-[6rem] lg:text-[6.7rem]">
  Diego Ciriani
</h2>

           <p className="mt-3 font-[family-name:var(--font-bodoni)] text-[1.2rem] font-medium leading-tight tracking-[-0.01em] text-[#6F8F5E] md:text-[2.35rem]">
  Criador da Análise Ponto Cego.
</p>
          </div>

          {/* imagem */}
<motion.div
  initial={{ opacity: 0, y: 34 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
  className="mx-auto max-w-[680px] overflow-hidden rounded-[1.55rem] border border-[#6F8F5E]/35 bg-black/25 shadow-[0_24px_70px_rgba(0,0,0,0.38)] md:rounded-[2rem]"
>
  <div className="relative h-[430px] w-full md:h-[520px] lg:h-[500px]">
    {/* fundo preenchendo o espaço vazio */}
    <Image
      src="/images/diegociriani.png"
      alt=""
      fill
      aria-hidden="true"
      sizes="(max-width: 768px) 100vw, 680px"
      className="scale-110 object-cover object-center opacity-45 blur-xl"
    />

    {/* camada escura para manter o estilo da seção */}
    <div className="absolute inset-0 bg-black/35" />

    {/* foto principal */}
    <Image
      src="/images/diegociriani.png"
      alt="Diego Ciriani, psicólogo clínico"
      fill
      sizes="(max-width: 768px) 100vw, 680px"
      className="relative z-10 object-cover object-[50%_25%]"
    />
  </div>
</motion.div>

          {/* texto */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-[760px] space-y-8 px-2 text-[1.1rem] leading-[1.65] text-zinc-300 md:mt-10 md:px-6 md:text-[1.35rem] md:leading-[1.68]"
          >
            <p>
              Sou psicólogo clínico e, há mais de uma década, acompanho pessoas
              que desejam compreender melhor a forma como se relacionam.
            </p>

            <p>
              Ao longo desses anos, percebi que muitos conflitos não nascem
              apenas do que acontece entre duas pessoas, mas da maneira como cada
              uma interpreta, sente e responde ao que vive.
            </p>

            <p>
              A Leitura Ponto Cego é conduzida pessoalmente por mim. Cada
              resposta é lida com atenção, sem pontuação automática, sem
              respostas prontas e sem inteligência artificial interpretando a sua
              história.
            </p>
          </motion.div>

          {/* lista */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 border-t border-[#6F8F5E]/25 md:mx-4"
          >
            {infos.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-[#6F8F5E]/20 py-3.5 md:py-4"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6F8F5E]/85 shadow-[0_0_12px_rgba(111,143,94,0.35)]" />

                <p className="text-[1rem] leading-6 text-zinc-300 md:text-[1.15rem]">
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}