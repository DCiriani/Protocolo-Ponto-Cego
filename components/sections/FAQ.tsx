"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const questions = [
  {
    question: "Isso é terapia?",
    answer:
      "Não. A Análise Ponto Cego é uma ferramenta de autoconhecimento e não substitui acompanhamento psicológico. Ela oferece uma leitura clínica personalizada a partir das suas respostas.",
  },
  {
    question: "É um teste automático?",
    answer:
      "Não. Não existe pontuação automática, resultado por algoritmo ou interpretação feita por inteligência artificial. Cada leitura é feita pessoalmente por Diego Ciriani.",
  },
  {
    question: "O que eu preciso responder?",
    answer:
      "Você responde situações reais relacionadas à forma como percebe, interpreta e reage dentro dos relacionamentos. O objetivo não é acertar, mas revelar padrões.",
  },
  {
    question: "Quanto tempo demora para receber?",
    answer:
      "A Leitura Ponto Cego é enviada em até 48 horas após o envio das suas respostas.",
  },
  {
    question: "Posso fazer mesmo estando solteiro?",
    answer:
      "Sim. A análise observa padrões relacionais, não apenas uma relação atual. Ela pode ajudar a compreender repetições que aparecem em diferentes vínculos.",
  },
  {
    question: "Isso é diagnóstico?",
    answer:
      "Não. A leitura não tem finalidade diagnóstica. Ela organiza hipóteses, padrões observados e direcionamentos iniciais para autoconhecimento.",
  },
];

export default function FAQ() {
  return (
    <section
      id="perguntas"
      className="relative overflow-hidden bg-[#0A0A0A] py-32 md:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(136,179,154,0.07),transparent_34%)]" />

      <Container className="relative z-10">
        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              Antes de começar
            </span>

            <h2 className="max-w-xl text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#F5F5F3]">
              Perguntas que você pode estar{" "}
              <span className="font-heading text-[#88B39A]">fazendo.</span>
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
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {questions.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-8 text-2xl font-semibold tracking-[-0.04em] text-[#F5F5F3] transition hover:text-[#88B39A] md:text-3xl [&::-webkit-details-marker]:hidden">
                  {item.question}

                  <span className="text-[#88B39A] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-2xl pb-8 text-[18px] leading-9 text-zinc-400 md:text-[20px] md:leading-10">
                  {item.answer}
                </p>
              </details>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}