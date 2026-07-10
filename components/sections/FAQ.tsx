"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

type FAQItem = {
  question: string;
  answer: ReactNode;
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 transition-transform duration-150 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      aria-hidden="true"
    >

      <path
        d="M5.5 8.5L12 15L18.5 8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-11 w-11 md:h-12 md:w-12"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="15"
        y="28"
        width="34"
        height="27"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M22 28V20C22 13.8 26.5 9 32 9C37.5 9 42 13.8 42 20V28"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle cx="32" cy="40" r="2.5" fill="currentColor" />

      <path
        d="M32 42.5V47"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const faqItems: FAQItem[] = [
  {
    question: "Isso é terapia?",
    answer: (
      <p>
        Não. A Análise Ponto Cego não substitui a psicoterapia. Ela é uma
        leitura clínica escrita, pontual e personalizada, construída a partir
        das suas respostas.
      </p>
    ),
  },
  {
    question: "É um teste automático?",
    answer: (
      <p>
        Não. Suas respostas não recebem pontuação automática e não são
        interpretadas por inteligência artificial. Cada leitura é feita
        pessoalmente por mim.
      </p>
    ),
  },
  {
    question: "O que eu preciso responder?",
    answer: (
      <p>
        Você responde a situações concretas de relacionamento. Não existem
        respostas certas. O objetivo é observar como você percebe, interpreta e
        reage diante de cada cenário.
      </p>
    ),
  },
  {
    question: "Quanto tempo demora para receber?",
    answer: (
      <p>
        Sua leitura é enviada por e-mail em até 48 horas após o envio das suas
        respostas.
      </p>
    ),
  },
  {
    question: "Posso fazer mesmo estando solteiro?",
    answer: (
      <p>
        Sim. Você não precisa estar em um relacionamento atualmente. A análise
        considera padrões presentes na sua história, nas suas escolhas e na
        forma como você estabelece vínculos.
      </p>
    ),
  },
  {
    question: "Isso é diagnóstico?",
    answer: (
      <p>
        Não. A Análise Ponto Cego não é um diagnóstico e não procura rotular
        você. Ela organiza padrões, hipóteses e direcionamentos a partir do
        material que você envia.
      </p>
    ),
  },
  {
    question: "E se eu não me identificar com a leitura?",
    answer: (
      <>
        <p>
          Se, ao receber sua leitura, algum ponto parecer confuso, distante da
          sua história ou precisar de mais clareza, você pode me escrever em{" "}
          <span className="font-semibold text-[#879A58]">até 7 dias.</span>{" "}
          Eu releio suas respostas e faço uma{" "}
          <span className="font-semibold text-[#879A58]">
            revisão pontual, sem custo.
          </span>
        </p>

        <p className="mt-6 text-[0.92rem] leading-7 text-zinc-400 md:text-[1rem]">
          A revisão não é uma nova análise. É um ajuste de clareza sobre o
          material já entregue.
        </p>
      </>
    ),
  },
  {
    question: "Minhas respostas ficam sigilosas?",
    answer: (
      <p>
        Sim. Suas respostas são lidas apenas por mim e tratadas com total sigilo,
        cuidado e responsabilidade profissional.
      </p>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(6);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#050705] pt-8 pb-20 text-[#F5F5F3] md:pt-12 md:pb-28"
    >
      {/* fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.16),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#070907_50%,#050705_100%)]" />

      {/* textura */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="faq-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#faq-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[900px]"
        >
          {/* cabeçalho */}
          <div className="mx-auto max-w-[820px] text-center">
            <p className="font-satoshi text-[0.76rem] font-light uppercase tracking-[0.46em] text-[#879A58] md:text-[0.95rem]">
              Antes de começar
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-20 bg-[#6F8F5E]/70 md:w-24" />

              <span className="h-2.5 w-2.5 rotate-45 border border-[#879A58] bg-[#879A58]/80" />

              <div className="h-px w-20 bg-[#6F8F5E]/70 md:w-24" />
            </div>

            <h2 className="mt-8 font-[family-name:var(--font-bodoni)] text-[2.45rem] font-medium uppercase leading-[1.06] tracking-[0.01em] text-[#F4EBDD] min-[390px]:text-[2.75rem] md:text-[4.5rem] lg:text-[5.15rem]">
              Perguntas que
              <br />
              você pode estar fazendo
              <span className="text-[#879A58]">.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[620px] text-[1rem] leading-7 text-[#879A58] md:text-[1.2rem] md:leading-8">
              Reuni aqui as dúvidas mais comuns para que você comece com
              confiança e clareza.
            </p>
          </div>

          {/* perguntas */}
<div className="mt-10 space-y-4 md:mt-12">
  {faqItems.map((item, index) => {
    const isOpen = openIndex === index;

    return (
      <div
        key={item.question}
        className={`overflow-hidden rounded-[1.15rem] border ${
          isOpen
            ? "border-[#879A58]/75 bg-[linear-gradient(180deg,rgba(10,11,9,0.96),rgba(6,7,6,0.98))]"
            : "border-[#6F8F5E]/55 bg-[linear-gradient(180deg,rgba(8,9,8,0.9),rgba(5,6,5,0.96))]"
        }`}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="flex w-full items-center gap-4 px-4 py-4 text-left md:gap-6 md:px-7 md:py-5"
        >
          {/* círculo */}
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border md:h-14 md:w-14 ${
              isOpen
                ? "border-[#95AE55] bg-[#95AE55] text-[#080A07] shadow-[0_0_20px_rgba(149,174,85,0.16)]"
                : "border-[#6F8F5E]/70 bg-transparent text-[#879A58]"
            }`}
          >
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </span>

          {/* pergunta */}
          <span
            className={`min-w-0 flex-1 font-[family-name:var(--font-bodoni)] text-[1.3rem] font-medium leading-[1.14] md:text-[1.75rem] ${
              isOpen ? "text-[#879A58]" : "text-[#F4EBDD]"
            }`}
          >
            {item.question}
          </span>

          {/* seta */}
          <span
            className={`shrink-0 text-[#879A58] ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.5 8.5L12 15L18.5 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* resposta instantânea */}
        {isOpen && (
          <div className="px-5 pb-7 pl-[5rem] pr-5 text-[0.98rem] leading-7 text-zinc-300 md:px-7 md:pb-8 md:pl-[7.25rem] md:pr-10 md:text-[1.08rem] md:leading-8">
            {item.answer}
          </div>
        )}
      </div>
    );
  })}
</div>

          {/* sigilo total */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 overflow-hidden rounded-[1.15rem] border border-[#6F8F5E]/55 bg-[linear-gradient(180deg,rgba(9,10,8,0.92),rgba(5,6,5,0.98))]"
          >
            <div className="grid gap-5 px-6 py-6 md:grid-cols-[7.5rem_1px_1fr] md:items-center md:gap-8 md:px-10 md:py-7">
              <div className="flex justify-center md:justify-start">
                <span className="flex h-[5.4rem] w-[5.4rem] items-center justify-center rounded-full border border-[#6F8F5E]/65 text-[#879A58]">
                  <LockIcon />
                </span>
              </div>

              <div className="hidden h-[4.5rem] w-px bg-[#6F8F5E]/40 md:block" />

              <div className="text-center md:text-left">
                <p className="font-satoshi text-[0.95rem] font-semibold uppercase tracking-[0.16em] text-[#879A58] md:text-[1.08rem]">
                  Sigilo total
                </p>

                <p className="mt-2 text-[0.98rem] leading-7 text-zinc-300 md:text-[1.08rem] md:leading-8">
                  Suas respostas são lidas apenas por mim e tratadas com total
                  sigilo e profissionalismo.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}