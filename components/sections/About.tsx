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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(122,101,67,0.22),transparent_28%),radial-gradient(circle_at_top_left,rgba(122,101,67,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,transparent,rgba(255,255,255,0.02),transparent)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[920px]"
        >
          {/* topo */}
          <div className="mb-8 md:mb-10">
            <span className="font-satoshi text-[0.95rem] font-medium uppercase tracking-[0.38em] text-[#88B39A]">
              Quem conduz
            </span>

            <div className="mt-3 h-[2px] w-16 bg-[#88B39A]" />

            <h2 className="mt-5 font-[family-name:var(--font-bodoni)] text-[3.1rem] leading-[0.95] tracking-[-0.02em] text-[#F5F5F3] md:text-[5rem]">
              Diego Ciriani
            </h2>

            <p className="mt-2 font-[family-name:var(--font-bodoni)] text-[1.55rem] leading-tight text-[#F5F5F3] md:text-[2.2rem]">
              criador da Análise Ponto Cego.
            </p>
          </div>

          {/* imagem */}
          <div className="mb-8 overflow-hidden rounded-[2rem] border border-[#6F8F5E]/35 bg-black/20 md:mb-10">
            <div className="relative aspect-[4/4.25] w-full md:aspect-[16/11]">
              <Image
                src="/images/diego-poltronaaa.png"
                alt="Diego Ciriani sentado em uma poltrona"
                fill
                priority={false}
                className="object-cover"
              />
            </div>
          </div>

          {/* textos */}
          <div className="space-y-8 text-[1.08rem] leading-[1.7] text-zinc-300 md:text-[1.28rem] md:leading-[1.75]">
            <p>
              Sou psicólogo clínico e, há mais de uma década, acompanho pessoas
              que desejam compreender melhor a forma como se relacionam.
            </p>

            <p>
              Ao longo desses anos, percebi que muitos conflitos não nascem
              apenas do que acontece entre duas pessoas, mas da maneira como
              cada uma interpreta, sente e responde ao que vive.
            </p>

            <p>
              A Leitura Ponto Cego é conduzida pessoalmente por mim. Cada
              resposta é lida com atenção, sem pontuação automática, sem
              respostas prontas e sem inteligência artificial interpretando a
              sua história.
            </p>
          </div>

          {/* lista */}
          <div className="mt-10 border-t border-[#6F8F5E]/25">
            {infos.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-[#6F8F5E]/20 py-4"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#88B39A]/85" />

                <p className="text-[1rem] leading-6 text-zinc-300 md:text-[1.15rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}