"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.75"
      />

      <path
        d="M32 15L45 20V30C45 39 39.7 46 32 49C24.3 46 19 39 19 30V20L32 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M25.5 31.5L30 36L39 26.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <circle
        cx="24"
        cy="16"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M13 38C13 30.8 17.6 27 24 27C30.4 27 35 30.8 35 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <rect
        x="8"
        y="11"
        width="32"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M15 7V15M33 7V15M8 20H40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle cx="16" cy="27" r="1.5" fill="currentColor" />
      <circle cx="24" cy="27" r="1.5" fill="currentColor" />
      <circle cx="32" cy="27" r="1.5" fill="currentColor" />
      <circle cx="16" cy="34" r="1.5" fill="currentColor" />
      <circle cx="24" cy="34" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <circle
        cx="20"
        cy="20"
        r="11"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M28.5 28.5L39 39"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <circle
        cx="24"
        cy="21"
        r="11"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M18 31L14 42L24 38L34 42L30 31"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M24 14L26.2 18.4L31 19.1L27.5 22.5L28.3 27.2L24 25L19.7 27.2L20.5 22.5L17 19.1L21.8 18.4L24 14Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const commitments = [
  {
    icon: PersonIcon,
    content: (
      <>
        Cada{" "}
        <span className="font-semibold text-[#6F8F5E]">
          Análise Ponto Cego
        </span>{" "}
        é feita com cuidado, a partir das respostas que você envia.
      </>
    ),
  },
  {
    icon: CalendarIcon,
    content: (
      <>
        Se, ao receber sua leitura, algum ponto parecer confuso, distante da sua
        história ou precisar de mais clareza, você pode me escrever em{" "}
        <span className="font-semibold text-[#6F8F5E]">até 7 dias.</span>{" "}
        Eu releio suas respostas e faço uma{" "}
        <span className="font-semibold text-[#6F8F5E]">
          revisão pontual, sem custo.
        </span>
      </>
    ),
  },
  {
    icon: SearchIcon,
    content: (
      <>
        A revisão{" "}
        <span className="font-semibold text-[#6F8F5E]">
          não é uma nova análise.
        </span>{" "}
        É um ajuste de clareza sobre o material já entregue.
      </>
    ),
  },
  {
    icon: MedalIcon,
    content: (
      <>
        Você não está comprando um teste automático. Está recebendo uma leitura
        feita por um psicólogo, com atenção, critério e compromisso com o que é
        entregue.
      </>
    ),
  },
];

function Commitment() {
  return (
    <section
      id="compromisso"
      className="relative overflow-hidden bg-[#050705] px-0 pt-8 pb-20 text-[#F5F5F3] md:pt-12 md:pb-28"
    >
      {/* luz quente */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(146,110,66,0.16),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_48%,#050705_100%)]" />

      {/* textura */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="commitment-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#commitment-grain)" />
      </svg>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[900px]"
        >
          {/* caixa principal */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[#6F8F5E]/55 bg-black/20 px-5 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_30px_90px_rgba(0,0,0,0.34)] md:px-12 md:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(121,101,62,0.08),transparent_30%)]" />

            <div className="relative z-10">
              {/* topo com escudo */}
              <div className="flex items-center justify-center gap-4 md:gap-8">
                <div className="h-px flex-1 bg-[#6F8F5E]/65" />

                <ShieldIcon className="h-[5.2rem] w-[5.2rem] shrink-0 text-[#879A58] md:h-[6.5rem] md:w-[6.5rem]" />

                <div className="h-px flex-1 bg-[#6F8F5E]/65" />
              </div>

             <p className="mt-4 text-center font-satoshi text-[0.9rem] font-normal uppercase tracking-[0.52em] text-[#879A58] md:text-[1.1rem]">
  Compromisso
</p>

              {/* título */}
              <h2 className="mx-auto mt-8 max-w-[760px] text-center font-satoshi text-[2.15rem] font-light uppercase leading-[1.12] tracking-[0.04em] text-[#F4EBDD] min-[390px]:text-[2.45rem] md:text-[3.9rem] lg:text-[4.5rem]">
  Se algo não fizer
  <br />
  sentido, eu reviso
  <br />
  com você.
</h2>

              {/* ornamento */}
              <div className="mt-9 flex items-center justify-center gap-3">
                <div className="h-px w-20 bg-[#6F8F5E]/60 md:w-28" />
                <span className="h-2.5 w-2.5 rotate-45 border border-[#6F8F5E] bg-[#6F8F5E]/70" />
                <div className="h-px w-20 bg-[#6F8F5E]/60 md:w-28" />
              </div>

              {/* itens */}
              <div className="mt-7 md:mt-9">
                {commitments.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`grid grid-cols-[4.5rem_1fr] gap-4 py-7 md:grid-cols-[6rem_1fr] md:gap-7 md:py-8 ${
                        index !== commitments.length - 1
                          ? "border-b border-[#6F8F5E]/30"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-center">
                        <span className="flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-full border border-[#6F8F5E]/60 text-[#7F9650] md:h-[5.3rem] md:w-[5.3rem]">
                          <Icon />
                        </span>
                      </div>

                      <p className="pt-1 text-[0.98rem] leading-[1.55] text-zinc-300 md:text-[1.26rem] md:leading-[1.6]">
                        {item.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* selo inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-7 flex max-w-[760px] items-center justify-center gap-4 rounded-[1rem] border border-[#6F8F5E]/45 bg-black/25 px-4 py-5 text-center"
          >
            <ShieldIcon className="h-9 w-9 shrink-0 text-[#7F9650]" />

            <p className="font-satoshi text-[0.58rem] font-semibold uppercase leading-5 tracking-[0.24em] text-[#7F9650] min-[390px]:text-[0.65rem] md:text-[0.82rem] md:tracking-[0.34em]">
              Confiança
              <span className="mx-2">•</span>
              Responsabilidade
              <span className="mx-2">•</span>
              Compromisso
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
export default Commitment;