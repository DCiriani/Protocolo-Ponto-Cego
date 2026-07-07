"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3.2 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 18v4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 12h4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 12h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 20c.8-3.5 3.1-5.2 6.5-5.2s5.7 1.7 6.5 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <path
        d="M6.5 3.5h7.2L18 7.8v12.7H6.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 3.8v4.3h4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12h6M9 15h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const benefits = [
  {
    icon: PersonIcon,
    title: "Feita pessoalmente",
    text: "Pelo psicólogo Diego Ciriani. Sem IA, sem resposta pronta.",
  },
  {
    icon: ClockIcon,
    title: "Até 48h",
    text: "Da sua resposta até a leitura no seu e-mail.",
  },
  {
    icon: DocumentIcon,
    title: "Leitura profunda",
    text: "Mais que respostas, direcionamento real.",
  },
  {
    icon: TargetIcon,
    title: "100% individual",
    text: "Nenhum modelo genérico. Construída a partir da sua história.",
  },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#050705] text-[#F5F5F3]"
    >
     <div className="absolute inset-0 overflow-hidden">
  {/* CELULAR */}
  <div className="absolute inset-0 block translate-x-[70px] -translate-y-[110px] scale-[1.28] origin-top-right md:hidden">
    <Image
      src="/images/hero-mirror.png"
      alt="Homem diante de um espelho escuro"
      fill
      priority
      sizes="100vw"
      className="object-cover object-[88%_top] opacity-95"
    />
  </div>

  {/* IPAD / TABLET */}
  <div className="absolute inset-0 hidden origin-top-right translate-x-[100px] -translate-y-[220px] scale-[1.30] md:block xl:hidden">
    <Image
      src="/images/hero-mirror-ipad.png"
      alt="Homem diante de um espelho escuro"
      fill
      priority
      sizes="100vw"
      className="object-cover object-[88%_top] opacity-95"
    />
  </div>

  {/* COMPUTADOR */}
  <div className="absolute inset-0 hidden origin-top-right translate-x-[120px] -translate-y-[120px] scale-[1.22] xl:block">
    <Image
      src="/images/hero-mirror.png"
      alt="Homem diante de um espelho escuro"
      fill
      priority
      sizes="100vw"
      className="object-cover object-[88%_top] opacity-95"
    />
  </div>

  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,5,0.98)_0%,rgba(5,7,5,0.92)_38%,rgba(5,7,5,0.55)_67%,rgba(5,7,5,0.82)_100%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,5,0.1)_0%,rgba(5,7,5,0.2)_45%,rgba(5,7,5,0.88)_74%,#050705_100%)]" />
</div>
      <Container className="relative z-10 pb-14 pt-32 md:pb-24 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[720px]">
            <div className="mb-9 flex max-w-[360px] items-start gap-3 text-[0.82rem] leading-6 text-zinc-300 sm:text-[0.95rem] sm:leading-7 md:max-w-none md:text-base">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#88B39A] shadow-[0_0_18px_rgba(136,179,154,0.55)]" />
              <span>
  <span className="block">Leitura clínica escrita pelo psicólogo</span>
  <span className="block">Diego Ciriani. CRP 04/44668</span>
</span>
            </div>

            <h1 className="max-w-[95vw] font-[family-name:var(--font-bodoni)] text-[2.08rem] font-medium uppercase leading-[1.08] tracking-[0.02em] text-[#F5F5F3] min-[390px]:text-[2.25rem] sm:text-[3.2rem] md:text-[4.35rem] lg:text-[4.9rem] xl:text-[6.2rem] 2xl:text-[7rem] md:leading-[0.98]">
  <span className="block whitespace-nowrap md:text-[3.2rem] lg:text-[3.8rem] xl:text-[6.2rem] 2xl:text-[7rem]">
  Todo mundo tem
</span>
  <span className="block whitespace-nowrap text-[#6F8F5E]">
    um Ponto cego
  </span>
</h1>

            <p className="mt-7 w-fit max-w-[17.5rem] whitespace-nowrap font-serif text-[0.85rem] leading-tight tracking-[-0.01em] text-[#F5F5F3] min-[390px]:text-[0.98rem] sm:max-w-none sm:text-[1.35rem] md:mt-10 md:text-[2rem]">
  O padrão mais difícil de enxergar é o seu.
</p>

            <p className="mt-6 max-w-[18.5rem] text-[0.84rem] leading-6 text-zinc-300 [word-spacing:0.06em] sm:max-w-[540px] sm:text-[1rem] md:text-lg md:leading-8">
              Existe um padrão influenciando suas escolhas, seus relacionamentos
              e seus conflitos sem que você perceba. A Análise Ponto Cego é uma
              leitura clínica escrita, feita pessoalmente por um psicólogo a
              partir das suas respostas, criada para tornar esse padrão visível.
            </p>

<div id="comecar" className="mt-8">
  <Button
    href="/checkout"
    className="!w-fit !max-w-none !rounded-[0.5rem] !px-5 !py-3 !text-[0.78rem] !tracking-[0.02em] whitespace-nowrap"
  >
    Quero enxergar meus padrões
  </Button>
</div>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] leading-5 text-zinc-400 sm:text-sm md:text-base">
              <span>Entrega em até 48h</span>
              <span className="text-[#88B39A]">•</span>
              <span>Pagamento único de R$97</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:max-w-[900px] md:gap-5">
  {benefits.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="aspect-[0.92/1] rounded-[1.25rem] border border-white/10 bg-[linear-gradient(145deg,rgba(18,22,20,0.94),rgba(7,9,8,0.92))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md md:aspect-auto md:min-h-[210px] md:p-7"
      >
        <div className="mb-8 flex h-8 w-8 items-center justify-center text-[#88B39A] md:mb-5 md:h-10 md:w-10">
          <Icon />
        </div>

        <h3 className="font-satoshi text-[0.98rem] font-medium leading-[1.18] tracking-[-0.02em] text-[#F5F5F3] md:font-serif md:text-[1.6rem]">
          {item.title}
        </h3>

        <p className="mt-4 text-[0.68rem] leading-[1.55] text-zinc-400 md:text-base md:leading-7">
          {item.text}
        </p>
      </div>
    );
  })}
</div>
        </motion.div>
      </Container>
    </section>
  );
}