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
  title: "Algumas relações pareciam saudáveis por fora.",
  text: "Mas escondiam um sofrimento silencioso.",
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(52,87,39,0.13),transparent_25%)]" />

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
          {/* ============ TOPO ============ */}
          <div className="relative -mx-5 -mt-10 overflow-hidden rounded-t-[1.6rem] bg-[#040604] md:-mx-10 md:-mt-14 md:rounded-t-[1.6rem] lg:mx-0 lg:mt-0 lg:rounded-none">
            {/* -------- FOTO MOBILE (absoluta, atrás do texto) -------- */}
            <div className="md:hidden">
              {/* brilho atrás da foto */}
              <div className="pointer-events-none absolute bottom-0 right-[-90px] z-[1] h-[390px] w-[390px] rounded-full bg-[#315C27]/25 blur-[75px]" />

              {/* círculos decorativos */}
              <div className="pointer-events-none absolute right-[-170px] top-12 z-[2] h-[390px] w-[390px] rounded-full border border-[#6F8F5E]/10" />
              <div className="pointer-events-none absolute right-[-115px] top-24 z-[2] h-[300px] w-[300px] rounded-full border border-[#6F8F5E]/10" />

              {/* foto */}
<div className="absolute bottom-[-15px] right-[-80px] z-[3] h-[365px] w-[285px] min-[390px]:bottom-[-5px] min-[390px]:right-[-70px] min-[390px]:h-[395px] min-[390px]:w-[310px]">
                <Image
                  src="/images/diego-poltronaaa.png"
                  alt="Diego Ciriani"
                  fill
                  sizes="310px"
                  className="scale-[0.92] object-contain object-bottom"
                  priority
                />
              </div>

              {/* degradê entre texto e foto */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[4] w-[74%] bg-[linear-gradient(90deg,#040604_0%,rgba(4,6,4,0.97)_57%,rgba(4,6,4,0.64)_78%,transparent_100%)]" />

              {/* degradê inferior */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 bg-gradient-to-t from-[#040604] via-[#040604]/75 to-transparent" />
            </div>

            {/* -------- LAYOUT EM 2 COLUNAS (md+) / EMPILHADO (mobile) -------- */}
            <div className="relative md:flex md:items-stretch">
              {/* coluna de texto */}
<div className="relative z-10 min-h-[425px] px-5 pt-7 min-[390px]:min-h-[445px] md:min-h-0 md:flex-1 md:px-0 md:pr-8 md:pt-2">
  {/* identificação da seção */}
  <div>
    <p className="font-satoshi text-[0.8rem] font-light uppercase tracking-[0.48em] text-[#879A58] md:text-[0.95rem]">
      A origem
    </p>

    <div className="mt-5 h-px w-20 bg-[#6F8F5E]/70 md:w-24" />
  </div>

  {/* título */}
  <h2 className="mt-7 font-[family-name:var(--font-bodoni)] font-medium uppercase leading-[0.94] tracking-[-0.025em] md:mt-8">
    {/* celular */}
<span className="md:hidden">
  <span className="block text-[1.65rem] text-[#F4EBDD] min-[390px]:text-[1.8rem]">
    Por que criei a
  </span>

  <span className="mt-1 block whitespace-nowrap text-[1.42rem] text-[#76A45D] min-[390px]:text-[1.55rem]">
    Análise Ponto Cego?
  </span>
</span>

    {/* iPad e computador */}
    <span className="hidden md:block">
      <span className="block whitespace-nowrap text-[clamp(2.2rem,4.7vw,4.1rem)] text-[#F4EBDD]">
        Por que criei a
      </span>

      <span className="mt-1 block whitespace-nowrap text-[clamp(2.2rem,4.7vw,4.1rem)] text-[#76A45D]">
        Análise Ponto Cego?
      </span>
    </span>
  </h2>

  {/* texto principal */}
  <p className="mt-8 max-w-[310px] text-[1rem] leading-7 text-zinc-300 md:mt-10 md:max-w-[520px] md:text-[1.12rem] md:leading-8">
  {/* celular */}
  <span className="md:hidden">
    Durante mais de uma década
    <br />
    atendendo pessoas na clínica,
    <br />
   ouvi milhares de histórias.
  </span>

  {/* iPad e computador */}
  <span className="hidden md:inline">
    Durante mais de uma década atendendo pessoas na clínica, ouvi milhares de
    histórias.
  </span>
</p>

  {/* texto destacado */}
<div className="mt-6 max-w-[330px] border-l-[3px] border-[#76A45D] pl-4 md:mt-8 md:max-w-[520px] md:pl-5">
  <p className="font-satoshi text-[1rem] font-semibold leading-[1.4] tracking-[-0.015em] text-[#F4EBDD] min-[390px]:text-[1.05rem] md:text-[1.08rem] md:leading-7">
    E percebi que existia um padrão 
    <br className="md:hidden" />

    invisível, que se repetia
    <br className="md:hidden" />

     silenciosamente.
  </p>
</div>
</div>

              {/* coluna da foto (só md+) — a altura DELA define a altura do bloco */}
              <div className="relative hidden shrink-0 md:block md:h-[500px] md:w-[360px] lg:h-[560px] lg:w-[450px]">
                {/* brilho atrás da foto */}
                <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] z-[1] h-[440px] w-[440px] rounded-full bg-[#315C27]/22 blur-[85px] lg:h-[520px] lg:w-[520px]" />

                {/* círculos decorativos */}
                <div className="pointer-events-none absolute right-[-130px] top-6 z-[2] h-[440px] w-[440px] rounded-full border border-[#6F8F5E]/10 lg:right-[-90px] lg:h-[520px] lg:w-[520px]" />
                <div className="pointer-events-none absolute right-[-70px] top-20 z-[2] h-[340px] w-[340px] rounded-full border border-[#6F8F5E]/10 lg:right-[-30px] lg:h-[420px] lg:w-[420px]" />

                {/* foto colada no rodapé, com leve sangria pra fora da coluna */}
                <div className="absolute bottom-0 left-[-16px] right-[-36px] top-0 z-[3] md:-translate-x-37 lg:-translate-x-12 lg:right-[-20px]">
                  <Image
                    src="/images/diego-poltronaaa.png"
                    alt="Diego Ciriani"
                    fill
                    sizes="(max-width: 1023px) 400px, 480px"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>

                {/* fusão com o texto (borda esquerda) */}
                <div className="pointer-events-none absolute inset-y-0 left-[-16px] z-[4] w-24 bg-gradient-to-r from-[#040604] to-transparent" />

                {/* fusão com o card de histórias (base) */}
                <div className="pointer-events-none absolute inset-x-[-36px] bottom-0 z-[4] h-32 bg-gradient-to-t from-[#040604] via-[#040604]/70 to-transparent" />
              </div>
            </div>
          </div>

          {/* histórias */}
<div className="relative z-20 mt-0 overflow-hidden rounded-[1.45rem] border border-[#6F8F5E]/35 bg-black/25 px-5 md:mt-4 md:px-8">
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
          {/* celular: título e complemento em sequência */}
          <p className="leading-7 md:hidden">
            <span className="font-satoshi text-[1rem] font-semibold tracking-[-0.015em] text-[#F4EBDD] min-[390px]:text-[1.05rem]">
              {story.title}
            </span>{" "}
            <span className="font-[family-name:var(--font-manrope)] text-[0.92rem] font-normal text-zinc-400">
              {story.text}
            </span>
          </p>

          {/* iPad e computador: complemento abaixo */}
          <div className="hidden md:block">
            <p className="font-satoshi text-[1.08rem] font-semibold leading-7 tracking-[-0.015em] text-[#F4EBDD]">
              {story.title}
            </p>

            <p className="mt-1 font-[family-name:var(--font-manrope)] text-[1rem] font-normal leading-7 text-zinc-400">
              {story.text}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

          {/* conclusão */}
<div className="relative z-20 mt-6 grid grid-cols-2 gap-4 rounded-[1.35rem] border border-[#6F8F5E]/20 bg-[linear-gradient(110deg,rgba(36,60,27,0.5),rgba(12,17,11,0.75))] px-4 py-5 md:mt-8 md:gap-12 md:px-9 md:py-8">
  <div className="flex gap-2 md:gap-4">
    <span className="font-[family-name:var(--font-bodoni)] text-[2.7rem] leading-[0.7] text-[#7FA74F] md:text-[3.8rem]">
      “
    </span>

    <p className="text-[0.78rem] leading-[1.55] text-[#F4EBDD] min-[390px]:text-[0.84rem] md:text-[1.05rem] md:leading-7">
      Foi dessa escuta profunda que nasceu a{" "}
      <span className="font-semibold text-[#7FAF59]">
        Análise Ponto Cego.
      </span>
    </p>
  </div>

  <p className="pt-1 text-[0.78rem] leading-[1.55] text-[#F4EBDD] min-[390px]:text-[0.84rem] md:pt-0 md:text-[1.05rem] md:leading-7">
    Um olhar clínico para o que você não vê, mas que dirige suas escolhas todos
    os dias.
  </p>
</div>

{/* chamada final */}
<div className="relative z-20 mt-8 text-center md:mt-14">
  {/* ornamento */}
  <div className="flex items-center justify-center gap-4 md:gap-6">
    <div className="h-px flex-1 bg-[#6F8F5E]/25" />

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6F8F5E]/15 bg-[#10170F] text-[#7FA74F] shadow-[0_0_30px_rgba(72,112,45,0.2)] md:h-14 md:w-14">
      <EyeIcon />
    </div>

    <div className="h-px flex-1 bg-[#6F8F5E]/25" />
  </div>

  {/* texto */}
  <p className="mx-auto mt-7 max-w-[320px] font-satoshi text-[1.08rem] font-medium leading-[1.4] text-[#F4EBDD] min-[390px]:text-[1.15rem] md:mt-8 md:max-w-[760px] md:text-[1.85rem] md:leading-[1.35]">
    <span className="md:hidden">
      Descubra o que está por trás dos seus ciclos e veja o que sempre esteve
      fora do seu olhar.
    </span>

    <span className="hidden md:inline">
      Descubra o que está por trás dos seus ciclos
      <br />
      e veja o que sempre esteve fora do seu olhar.
    </span>
  </p>

  {/* botão */}
  <a
    href="/checkout"
    className="group mx-auto mt-6 flex w-full max-w-[720px] items-center justify-center gap-2 whitespace-nowrap rounded-[1.1rem] border border-[#9DBA72]/60 bg-[linear-gradient(90deg,#6E994C_0%,#4E773D_100%)] px-3 py-4 font-satoshi text-[0.76rem] font-bold uppercase tracking-[-0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_45px_rgba(0,0,0,0.28)] transition hover:brightness-110 min-[390px]:text-[0.86rem] md:mt-8 md:gap-4 md:rounded-[1.2rem] md:px-4 md:py-6 md:text-[1.35rem]"
  >
    Quero descobrir meu ponto cego

    <span className="shrink-0 text-[1.35rem] font-light transition-transform duration-300 group-hover:translate-x-1 md:text-[1.65rem]">
      →
    </span>
  </a>

  {/* selos */}
  <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[0.58rem] leading-4 text-zinc-300 min-[390px]:text-[0.63rem] md:mt-8 md:gap-5 md:text-[0.76rem]">
    <div className="flex flex-col items-center justify-start gap-2 md:flex-row md:justify-center md:gap-3">
      <span className="text-[#7FA74F]">
        <ShieldIcon />
      </span>

      <span>Método exclusivo</span>
    </div>

    <div className="flex flex-col items-center justify-start gap-2 md:flex-row md:justify-center md:gap-3">
      <span className="text-[#7FA74F]">
        <BrainIcon />
      </span>

      <span>Baseado em psicologia clínica</span>
    </div>

                  <div className="flex flex-col items-center justify-start gap-2 md:flex-row md:justify-center md:gap-3">
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