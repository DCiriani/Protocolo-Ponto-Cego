"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

function PeopleIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="27" cy="16" r="4" stroke="currentColor" strokeWidth="1.7" />

      <path
        d="M7 31C7 24.9 11 21 16 21C21 21 25 24.9 25 31"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M23 23C28.5 22.5 33 25.6 33 31"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrokenHeartIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <path
        d="M20 33S7 25.5 7 15.8C7 10.8 10.4 8 14.2 8C17 8 19 9.6 20 11.4C21 9.6 23 8 25.8 8C29.6 8 33 10.8 33 15.8C33 25.5 20 33 20 33Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M21.5 10.5L17.5 17L22 20L18.5 26"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <path
        d="M8 9H32V27H19L12 33V27H8V9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle cx="15" cy="18" r="1.2" fill="currentColor" />
      <circle cx="20" cy="18" r="1.2" fill="currentColor" />
      <circle cx="25" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CycleIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
      <path
        d="M30.5 15C28.5 9.5 22 6.5 16.3 8.4C12.3 9.8 9.5 13 8.6 16.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M8 11.5L8.5 17.5L14 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 25C11.5 30.5 18 33.5 23.7 31.6C27.7 30.2 30.5 27 31.4 23.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M32 28.5L31.5 22.5L26 25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
      <path
        d="M5 24C10 15.5 16.5 11 24 11C31.5 11 38 15.5 43 24C38 32.5 31.5 37 24 37C16.5 37 10 32.5 5 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />

      <path
        d="M24 4V8M24 40V44M4 24H8M40 24H44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path
        d="M16 3L26 7V15C26 22 21.5 26.5 16 29C10.5 26.5 6 22 6 15V7L16 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M12 16L15 19L21 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path
        d="M16 6C14 3 9 4 9 8C5 8 4 13 7 15C4 18 6 23 10 23C10 27 14 28 16 25V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M16 6C18 3 23 4 23 8C27 8 28 13 25 15C28 18 26 23 22 23C22 27 18 28 16 25V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M11 10C13 10 14 11 14 13M10 18C12 18 14 19 14 22M21 10C19 10 18 11 18 13M22 18C20 18 18 19 18 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <rect
        x="7"
        y="14"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M11 14V10C11 7.2 13.2 5 16 5C18.8 5 21 7.2 21 10V14"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle cx="16" cy="21" r="1.5" fill="currentColor" />
    </svg>
  );
}

const stories = [
  {
    icon: PeopleIcon,
    title: "Algumas falavam sobre abandono.",
    text: "Outras sobre conflitos constantes.",
  },
  {
    icon: BrokenHeartIcon,
    title: "Outras sobre relações que pareciam saudáveis por fora,",
    text: "mas escondiam um sofrimento silencioso.",
  },
  {
    icon: MessageIcon,
    title: "As histórias eram diferentes.",
    text: "As pessoas também. Mas havia algo que permanecia.",
  },
  {
    icon: CycleIcon,
    title: "Os mesmos padrões. As mesmas formas de interpretar.",
    text: "Os mesmos ciclos que insistiam em se repetir, mesmo quando existia um desejo genuíno de fazer diferente.",
  },
];

export default function Why() {
  return (
    <section
      id="origem"
      className="relative overflow-hidden bg-[#050705] py-16 text-[#F5F5F3] md:py-24"
    >
      {/* luz de fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_18%,rgba(62,100,47,0.26),transparent_30%)]" />

      {/* textura */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="why-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#why-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.06 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[1.6rem] border border-[#6F8F5E]/30 bg-black/15 px-5 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:px-10 md:py-14 lg:px-14"
        >
          {/* topo */}
          <div className="relative min-h-[720px] md:min-h-[660px] lg:min-h-[610px]">
            <div className="relative z-20 max-w-[720px]">
              <div className="flex items-center gap-4">
                <p className="font-satoshi text-[0.7rem] font-medium uppercase tracking-[0.48em] text-[#879A58] md:text-[0.85rem]">
                  A origem
                </p>

                <div className="h-px w-12 bg-[#879A58]/60 md:w-16" />
              </div>

              <h2 className="mt-8 font-satoshi text-[2.8rem] font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#F4EBDD] min-[390px]:text-[3.15rem] md:text-[4.7rem] lg:text-[5.25rem]">
                Por que criei a
                <span className="mt-2 block text-[#76A45D]">
                  Análise Ponto Cego?
                </span>
              </h2>

              <p className="mt-9 max-w-[590px] text-[1rem] leading-7 text-zinc-300 md:text-[1.18rem] md:leading-8">
                Durante mais de uma década atendendo pessoas na clínica, ouvi
                milhares de histórias.
              </p>

              <div className="mt-8 flex max-w-[600px] gap-4 border-l-[3px] border-[#76A45D] pl-5">
                <p className="font-satoshi text-[1rem] font-semibold leading-7 text-[#F4EBDD] md:text-[1.14rem] md:leading-8">
                  E percebi que existia um padrão invisível,
                  <br className="hidden md:block" /> que se repetia
                  silenciosamente.
                </p>
              </div>
            </div>

            {/* brilho atrás da foto */}
            <div className="pointer-events-none absolute bottom-0 right-[-100px] h-[480px] w-[480px] rounded-full bg-[#366228]/30 blur-[85px] md:right-[-40px] md:h-[590px] md:w-[590px]" />

            {/* linhas decorativas */}
            <div className="pointer-events-none absolute right-[-90px] top-4 h-[480px] w-[480px] rounded-full border border-[#6F8F5E]/10 md:h-[600px] md:w-[600px]" />

            <div className="pointer-events-none absolute right-[-25px] top-16 h-[390px] w-[390px] rounded-full border border-[#6F8F5E]/10 md:h-[500px] md:w-[500px]" />

            {/* foto */}
            <div className="absolute bottom-0 right-[-95px] z-10 h-[470px] w-[450px] min-[390px]:right-[-70px] md:right-[-60px] md:h-[610px] md:w-[570px] lg:right-[-20px]">
              <Image
                src="/images/diego-poltronaaa.png"
                alt="Diego Ciriani"
                fill
                sizes="(max-width: 768px) 450px, 570px"
                className="object-contain object-bottom"
              />
            </div>

            {/* degradê para integrar foto no fundo */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#070907] via-[#070907]/70 to-transparent" />
          </div>

          {/* histórias */}
          <div className="relative z-20 mt-4 overflow-hidden rounded-[1.45rem] border border-[#6F8F5E]/35 bg-black/25 px-5 md:px-8">
            {stories.map((story, index) => {
              const Icon = story.icon;

              return (
                <div
                  key={story.title}
                  className={`flex gap-4 py-6 md:gap-6 md:py-8 ${
                    index !== stories.length - 1
                      ? "border-b border-[#6F8F5E]/20"
                      : ""
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/10 bg-[#172116] text-[#78A34E] shadow-[0_0_28px_rgba(71,119,45,0.14)] md:h-16 md:w-16">
                    <Icon />
                  </div>

                  <div className="pt-1">
                    <p className="font-satoshi text-[0.98rem] font-semibold leading-7 text-[#F4EBDD] md:text-[1.08rem]">
                      {story.title}
                    </p>

                    <p className="mt-1 text-[0.92rem] leading-7 text-zinc-400 md:text-[1rem]">
                      {story.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* conclusão */}
          <div className="relative z-20 mt-8 grid gap-7 rounded-[1.35rem] border border-[#6F8F5E]/20 bg-[linear-gradient(110deg,rgba(36,60,27,0.5),rgba(12,17,11,0.75))] px-6 py-7 md:grid-cols-2 md:gap-12 md:px-9 md:py-8">
            <div className="flex gap-4">
              <span className="font-[family-name:var(--font-bodoni)] text-[3.8rem] leading-[0.7] text-[#7FA74F]">
                “
              </span>

              <p className="text-[0.98rem] leading-7 text-[#F4EBDD] md:text-[1.05rem]">
                Foi dessa escuta profunda que nasceu a{" "}
                <span className="font-semibold text-[#7FAF59]">
                  Análise Ponto Cego.
                </span>
              </p>
            </div>

            <p className="text-[0.98rem] leading-7 text-[#F4EBDD] md:text-[1.05rem]">
              Um olhar clínico para o que você não vê, mas que dirige suas
              escolhas todos os dias.
            </p>
          </div>

          {/* chamada final */}
          <div className="relative z-20 mt-10 text-center md:mt-14">
            <div className="flex items-center justify-center gap-6">
              <div className="h-px flex-1 bg-[#6F8F5E]/25" />

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/15 bg-[#10170F] text-[#7FA74F] shadow-[0_0_30px_rgba(72,112,45,0.2)]">
                <EyeIcon />
              </div>

              <div className="h-px flex-1 bg-[#6F8F5E]/25" />
            </div>

            <p className="mx-auto mt-8 max-w-[760px] font-satoshi text-[1.35rem] font-medium leading-[1.35] text-[#F4EBDD] md:text-[1.85rem]">
              Descubra o que está por trás dos seus ciclos
              <br className="hidden md:block" /> e veja o que sempre esteve fora
              do seu olhar.
            </p>

            <a
              href="/checkout"
              className="group mx-auto mt-8 flex w-full max-w-[720px] items-center justify-center gap-4 whitespace-nowrap rounded-[1.2rem] border border-[#9DBA72]/60 bg-[linear-gradient(90deg,#6E994C_0%,#4E773D_100%)] px-4 py-5 font-satoshi text-[0.95rem] font-bold uppercase tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_45px_rgba(0,0,0,0.28)] transition hover:brightness-110 min-[390px]:text-[1.05rem] md:py-6 md:text-[1.35rem]"
            >
              Quero descobrir meu ponto cego

              <span className="shrink-0 text-[1.65rem] font-light transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* selos */}
            <div className="mt-8 grid gap-5 text-left text-[0.76rem] text-zinc-300 md:grid-cols-3 md:text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#7FA74F]">
                  <ShieldIcon />
                </span>

                <span>Método exclusivo</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-[#7FA74F]">
                  <BrainIcon />
                </span>

                <span>Baseado em psicologia clínica</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-[#7FA74F]">
                  <LockIcon />
                </span>

                <span>100% online e sigiloso</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}