"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import { useState } from "react";

const green = "#88B39A";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-7">
      <p className="font-satoshi text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#88B39A]">
        {children}
      </p>
      <div className="mt-4 h-px w-20 bg-[#88B39A]" />
    </div>
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
      <path d="M9 12h6M9 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#88B39A] text-sm text-[#88B39A]">
      ✓
    </span>
  );
}

function Hero() {
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

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#050705] px-5 pb-14 pt-32 text-[#F5F5F3]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mirror.png"
          alt="Homem diante de um espelho escuro"
          fill
          priority
          className="object-cover object-[73%_top] opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,5,0.98)_0%,rgba(5,7,5,0.9)_36%,rgba(5,7,5,0.5)_64%,rgba(5,7,5,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,5,0.08)_0%,rgba(5,7,5,0.08)_50%,#050705_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-[680px]">
          <div className="mb-10 flex max-w-[370px] items-start gap-3 text-[0.95rem] leading-7 text-zinc-300">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#88B39A]" />
            <span>Leitura clínica escrita pelo psicólogo Diego Ciriani. CRP 04/44668</span>
          </div>

          <h1 className="font-serif text-[clamp(2.7rem,10.8vw,4.8rem)] uppercase leading-[1.04] tracking-[-0.035em]">
            <span className="block whitespace-nowrap">Todo mundo tem um</span>
            <span className="block whitespace-nowrap text-[#88B39A]">Ponto cego</span>
          </h1>

          <p className="mt-8 font-serif text-[1.45rem] leading-[1.25]">
            O padrão mais difícil de enxergar é o seu.
          </p>

          <p className="mt-7 max-w-[540px] text-[1rem] leading-7 text-zinc-300">
            Existe um padrão influenciando suas escolhas, seus relacionamentos e seus conflitos sem que você perceba. A Análise Ponto Cego é uma leitura clínica escrita, feita pessoalmente por um psicólogo a partir das suas respostas, criada para tornar esse padrão visível.
          </p>

          <div className="mt-9">
            <Button href="/checkout" className="w-full max-w-[470px] rounded-[0.65rem] py-5 tracking-[0.08em]">
              Quero enxergar meus padrões
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-zinc-400">
            <span>Entrega em até 48h</span>
            <span className="text-[#88B39A]">•</span>
            <span>Pagamento único de R$97</span>
          </div>
        </div>

        <div className="mt-11 grid grid-cols-2 gap-3 md:max-w-[900px]">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="min-h-[185px] rounded-[1.35rem] border border-white/10 bg-black/35 p-5 backdrop-blur-sm">
                <div className="mb-6 flex h-11 w-11 items-center justify-center text-[#88B39A]">
                  <Icon />
                </div>
                <h3 className="font-serif text-[1.2rem] leading-tight">{item.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-6 text-zinc-400">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-4xl">
        <div className="relative min-h-[760px] overflow-hidden rounded-none bg-[#070907] p-6">
          <div className="absolute left-4 top-10 h-72 w-72 rounded-full border border-[#88B39A]/15" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(180,150,90,0.18),transparent_35%)]" />

          <div className="relative z-10 pt-14">
            <div className="flex items-center gap-8">
              <div className="max-w-[240px] rounded-full border border-[#88B39A]/20 p-8">
                <p className="font-serif text-[2.7rem] leading-[0.95]">Existem histórias</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#88B39A]">que se repetem</p>
              </div>
              <span className="text-5xl text-[#88B39A]/70">→</span>
              <p className="font-serif text-[2.5rem] leading-tight">Mudam<br />os rostos</p>
            </div>

            <div className="mt-24 flex justify-center text-[#88B39A]/60">
              <span className="text-7xl">↙</span>
            </div>

            <div className="mt-12">
              <p className="font-serif text-[2.6rem] leading-tight">Muda o<br />cenário</p>
              <div className="mt-3 h-px w-48 bg-[#88B39A]/40" />
            </div>

            <div className="mt-28">
              <p className="text-center font-serif text-[1.7rem] text-[#88B39A]/70">
                Mas algo continua acontecendo
              </p>
              <p className="mt-5 text-center font-serif text-[3.2rem] uppercase leading-none tracking-[-0.04em]">
                Do mesmo jeito
              </p>
              <div className="mx-auto mt-6 h-px w-72 bg-[#88B39A]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>A origem</SectionLabel>

        <h2 className="font-serif text-[clamp(2.5rem,10vw,5rem)] uppercase leading-[1.05] tracking-[-0.04em]">
          Por que criei a<br />Análise Ponto Cego?
        </h2>

        <div className="relative mt-10 grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-7 text-[1.05rem] leading-8 text-zinc-300">
            <p>Durante mais de uma década atendendo pessoas em psicoterapia, ouvi centenas de histórias.</p>
            <p>Algumas falavam sobre abandono. Outras sobre conflitos constantes. Outras sobre relações que pareciam saudáveis por fora, mas escondiam um sofrimento silencioso.</p>
            <p>As histórias eram diferentes. As pessoas também. Mas havia algo que permanecia.</p>
            <p>Os mesmos padrões. As mesmas formas de interpretar. Os mesmos ciclos que insistiam em se repetir, mesmo quando existia um desejo genuíno de fazer diferente.</p>
            <p>Foi dessa observação que nasceu a Análise Ponto Cego.</p>
            <p>Uma forma de transformar anos de experiência clínica em uma leitura cuidadosa, personalizada e humana. Não é um teste. Não é um diagnóstico. É um psicólogo lendo a sua história e devolvendo o que você ainda não conseguiu ver.</p>
          </div>

          <div className="relative hidden md:block">
            <Image
              src="/images/diego-poltrona.png"
              alt="Diego Ciriani"
              fill
              className="object-contain object-bottom opacity-80"
            />
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-[#88B39A]/35 bg-black/25 p-7">
          <p className="font-serif text-[1.7rem] leading-snug">
            “A mudança nem sempre começa quando a vida muda.{" "}
            <span className="text-[#88B39A]">
              Ela começa quando você finalmente consegue enxergá-la de outra forma.
            </span>”
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      number: "01",
      title: "Observar",
      text: "Você responde a cenários reais de relacionamento. Não existem respostas certas. O objetivo é observar como você percebe, interpreta e reage.",
    },
    {
      number: "02",
      title: "Compreender",
      text: "Cada resposta é lida e analisada individualmente por mim. Sem pontuação automática. Sem inteligência artificial. Cada palavra da sua leitura passa pelos olhos de um psicólogo.",
    },
    {
      number: "03",
      title: "Direcionar",
      text: "Você recebe sua Leitura Ponto Cego com padrões identificados, possíveis pontos cegos e direcionamentos práticos para considerar a partir da análise.",
    },
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>O processo</SectionLabel>

        <h2 className="font-serif text-[clamp(3rem,11vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">
          Como sua<br />
          <span className="text-[#88B39A]">Leitura acontece</span>
        </h2>

        <p className="mt-8 max-w-3xl text-[1.05rem] leading-8 text-zinc-300">
          A Análise Ponto Cego não procura descobrir quem está certo. Ela procura compreender padrões que podem estar conduzindo sua forma de se relacionar.
        </p>

        <div className="mt-10 space-y-5">
          {steps.map((step) => (
            <div key={step.number} className="grid grid-cols-[90px_1fr] rounded-2xl border border-[#88B39A]/25 bg-black/25 p-5">
              <div className="font-serif text-5xl text-[#88B39A]/80">{step.number}</div>
              <div>
                <h3 className="font-serif text-3xl">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-300">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#88B39A]/25 bg-black/30 p-5">
          <div className="rounded-xl border border-[#88B39A]/20 bg-[#11140f] p-5">
            <p className="font-serif text-2xl">PONTO CEGO · 48h</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#88B39A]">Sua leitura personalizada</p>
            <div className="mt-6 grid gap-3 text-sm text-zinc-400">
              <p>1. Resumo da sua leitura</p>
              <p>2. Padrões identificados</p>
              <p>3. Pontos cegos</p>
              <p>4. Direcionamentos práticos</p>
            </div>
          </div>
          <p className="mt-4 text-zinc-300">Sua leitura, em documento escrito.</p>
        </div>

        <div className="mt-8">
          <Button href="/checkout" className="w-full rounded-xl">Começar minha análise</Button>
        </div>
      </div>
    </section>
  );
}

function Clarity() {
  const items = [
    ["01", "Você reconhece repetições.", "Aquilo que parecia acontecer por acaso começa a ganhar forma. Situações, escolhas e reações passam a ser vistas como parte de um padrão."],
    ["02", "Você percebe onde se abandona.", "Alguns conflitos permanecem porque você aprende a silenciar necessidades, ultrapassar limites ou aceitar menos do que realmente sente."],
    ["03", "Você entende melhor suas interpretações.", "Nem sempre o sofrimento nasce do que aconteceu. Às vezes, nasce da forma como você interpreta o silêncio, a distância ou o comportamento do outro."],
    ["04", "Você ganha um ponto de partida.", "Clareza sobre onde começar a olhar com mais honestidade. Um mapa do que estava invisível até agora."],
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Clareza</SectionLabel>

        <h2 className="font-serif text-[clamp(3rem,11vw,5.6rem)] leading-[1] tracking-[-0.05em]">
          O que muda quando<br />
          <span className="text-[#88B39A]">Você enxerga</span>
        </h2>

        <div className="mt-10 space-y-5">
          {items.map(([number, title, text]) => (
            <div key={number} className="grid grid-cols-[90px_1fr] rounded-2xl border border-[#88B39A]/25 bg-black/25 p-5">
              <div className="font-serif text-5xl text-[#88B39A]/80">{number}</div>
              <div>
                <h3 className="font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-300">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const credentials = [
    "Psicólogo Clínico · CRP 04/44668",
    "Mais de uma década de experiência clínica",
    "Especialista em Relacionamentos",
    "Atendimento presencial e online",
    "Leitura feita pessoalmente",
    "Sem inteligência artificial",
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Quem conduz</SectionLabel>

        <h2 className="font-serif text-[clamp(3.5rem,12vw,6rem)] leading-none tracking-[-0.05em]">
          Diego Ciriani
        </h2>
        <p className="mt-3 font-serif text-2xl">criador da Análise Ponto Cego.</p>

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl border border-[#88B39A]/25">
          <Image src="/images/diego-poltrona.png" alt="Diego Ciriani" fill className="object-cover" />
        </div>

        <div className="mt-8 space-y-7 text-[1.05rem] leading-8 text-zinc-300">
          <p>Sou psicólogo clínico e, há mais de uma década, acompanho pessoas que desejam compreender melhor a forma como se relacionam.</p>
          <p>Ao longo desses anos, percebi que muitos conflitos não nascem apenas do que acontece entre duas pessoas, mas da maneira como cada uma interpreta, sente e responde ao que vive.</p>
          <p>A Leitura Ponto Cego é conduzida pessoalmente por mim. Cada resposta é lida com atenção, sem pontuação automática, sem respostas prontas e sem inteligência artificial interpretando a sua história.</p>
        </div>

        <div className="mt-8 divide-y divide-[#88B39A]/20 border-y border-[#88B39A]/20">
          {credentials.map((item) => (
            <div key={item} className="flex gap-3 py-3 text-zinc-300">
              <span className="text-[#88B39A]">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  const list = [
    "Padrões identificados",
    "Possíveis pontos cegos",
    "Ciclos que se repetem",
    "Fatores que podem manter o problema",
    "Direcionamentos práticos",
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>A entrega</SectionLabel>

        <h2 className="font-serif text-[clamp(3rem,11vw,5.8rem)] leading-none tracking-[-0.05em]">
          Sua Leitura Ponto Cego
        </h2>

        <div className="mt-8 max-w-3xl space-y-6 text-[1.05rem] leading-8 text-zinc-300">
          <p>Ao final da análise, você recebe uma leitura escrita, personalizada e construída a partir das suas respostas.</p>
          <p>Ela não procura resumir quem você é. Ela organiza padrões, hipóteses e direcionamentos para que você consiga enxergar com mais clareza a forma como tem se relacionado.</p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {list.map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-[#88B39A]/15 py-2">
              <CheckIcon />
              <span className="text-zinc-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-[#88B39A]/25 bg-black/30 p-5">
          <div className="rounded-xl bg-[#10120f] p-6">
            <p className="text-center font-serif text-4xl">PONTO CEGO · 48h</p>
            <p className="mt-2 text-center text-xs uppercase tracking-[0.3em] text-[#88B39A]">Sua leitura personalizada</p>
            <div className="mt-8 space-y-4 text-sm text-zinc-400">
              <p className="rounded-lg border border-[#88B39A]/25 p-3 text-zinc-200">“Você tende a interpretar distância como rejeição, e isso...”</p>
              <p>1. Padrões identificados</p>
              <p>2. Possíveis pontos cegos</p>
              <p>3. Ciclos que se repetem</p>
              <p>4. Fatores que podem manter o problema</p>
              <p>5. Direcionamentos práticos</p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-zinc-300">
          Documento em PDF · Escrito individualmente para você · Entregue por e-mail em até 48h · Lido apenas por mim, com total sigilo
        </p>

        <div className="mt-8 rounded-2xl border border-[#88B39A]/25 p-6 text-center">
          <p className="font-serif text-2xl">
            “Nem todo padrão se apresenta como problema. Alguns se apresentam como familiaridade.”
          </p>
        </div>

        <div className="mt-8">
          <Button href="/checkout" className="w-full rounded-xl">Quero receber minha leitura</Button>
        </div>
      </div>
    </section>
  );
}

function Commitment() {
  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[#88B39A]/30 bg-black/25 p-7 text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#88B39A]/50 text-4xl text-[#88B39A]">
          ✓
        </div>

        <p className="mb-6 text-sm uppercase tracking-[0.45em] text-[#88B39A]">Compromisso</p>

        <h2 className="font-serif text-[clamp(2.6rem,10vw,4.8rem)] uppercase leading-[1.08] tracking-[-0.04em]">
          Se algo não fizer sentido, eu reviso com você.
        </h2>

        <div className="mt-10 space-y-6 text-left text-[1.05rem] leading-8 text-zinc-300">
          <p>Cada <span className="text-[#88B39A]">Análise Ponto Cego</span> é feita com cuidado, a partir das respostas que você envia.</p>
          <p>Se, ao receber sua leitura, algum ponto parecer confuso, distante da sua história ou precisar de mais clareza, você pode me escrever <span className="text-[#88B39A]">em até 7 dias</span>. Eu releio suas respostas e faço uma <span className="text-[#88B39A]">revisão pontual, sem custo.</span></p>
          <p>A revisão <span className="text-[#88B39A]">não é uma nova análise.</span> É um ajuste de clareza sobre o material já entregue.</p>
          <p>Você não está comprando um teste automático. Está recebendo uma leitura feita por um psicólogo, com atenção, critério e compromisso com o que é entregue.</p>
        </div>

        <div className="mt-10 rounded-xl border border-[#88B39A]/25 px-4 py-4 text-xs uppercase tracking-[0.35em] text-[#88B39A]">
          Confiança · Responsabilidade · Compromisso
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(6);

  const faqs = [
    ["Isso é terapia?", "Não. A Análise Ponto Cego é uma leitura pontual, escrita, feita a partir das suas respostas. Ela não substitui um processo terapêutico. Ela pode, inclusive, ser um bom ponto de partida para um."],
    ["É um teste automático?", "Não. Não existe pontuação, algoritmo ou inteligência artificial. Suas respostas são lidas e analisadas pessoalmente por mim, do início ao fim."],
    ["O que eu preciso responder?", "Você responde a cenários reais de relacionamento, descrevendo como perceberia e reagiria a cada situação. Não existem respostas certas ou erradas. Quanto mais sincero você for, mais precisa fica a leitura."],
    ["Quanto tempo demora para receber?", "Até 48 horas após o envio das suas respostas. Você recebe o documento por e-mail, em PDF."],
    ["Posso fazer mesmo estando solteiro?", "Pode. Os padrões que a análise observa não dependem de você estar em um relacionamento agora. Eles aparecem na forma como você interpreta, escolhe e reage."],
    ["Isso é diagnóstico?", "Não. A leitura organiza padrões e hipóteses a partir do que você responde. Ela não nomeia transtornos nem fecha conclusões clínicas."],
    ["E se eu não me identificar com a leitura?", "Se, ao receber sua leitura, algum ponto parecer confuso, distante da sua história ou precisar de mais clareza, você pode me escrever em até 7 dias. Eu releio suas respostas e faço uma revisão pontual, sem custo. A revisão não é uma nova análise."],
    ["Minhas respostas ficam sigilosas?", "Sim. Suas respostas são lidas apenas por mim e tratadas com total sigilo e profissionalismo."],
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-[#88B39A]">Antes de começar</p>
          <h2 className="mt-8 font-serif text-[clamp(2.8rem,10vw,5rem)] uppercase leading-[1.05] tracking-[-0.04em]">
            Perguntas que você pode estar fazendo.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[#88B39A]">
            Reuni aqui as dúvidas mais comuns para que você comece com confiança e clareza.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map(([q, a], index) => {
            const isOpen = open === index;

            return (
              <div key={q} className="rounded-2xl border border-[#88B39A]/25 bg-black/20">
                <button
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className={`font-serif text-2xl ${isOpen ? "text-[#88B39A]" : "text-[#F5F5F3]"}`}>
                    {q}
                  </span>
                  <span className="text-2xl text-[#88B39A]">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-base leading-7 text-zinc-300">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-[#88B39A]/25 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#88B39A]">Sigilo total</p>
          <p className="mt-3 text-zinc-300">Suas respostas são lidas apenas por mim e tratadas com total sigilo e profissionalismo.</p>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const includes = [
    "Leitura escrita e individual da sua história",
    "Padrões e possíveis pontos cegos identificados",
    "Ciclos que se repetem e fatores que mantêm o problema",
    "Direcionamentos práticos",
    "Documento em PDF, entregue em até 48h",
    "Revisão pontual em até 7 dias, sem custo",
  ];

  return (
    <section className="bg-[#050705] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Sua análise</SectionLabel>

        <h2 className="font-serif text-[clamp(3rem,11vw,5.7rem)] leading-[1] tracking-[-0.05em]">
          Uma leitura clínica<br />
          <span className="text-[#88B39A]">da sua história</span>
        </h2>

        <p className="mt-8 max-w-3xl text-[1.05rem] leading-8 text-zinc-300">
          Uma sessão de psicoterapia custa, em média, entre R$180 e R$250. A Análise Ponto Cego é uma leitura clínica individual, escrita pessoalmente por um psicólogo com mais de uma década de experiência.
        </p>

        <div className="mt-10 rounded-3xl border border-[#88B39A]/35 bg-black/25 p-7">
          <p className="text-center text-sm uppercase tracking-[0.35em] text-[#88B39A]">Leitura personalizada</p>
          <p className="mt-8 text-center font-serif text-[6rem] leading-none">R$97</p>
          <p className="mt-3 text-center text-[#88B39A]">Pagamento único</p>

          <div className="mt-10 divide-y divide-[#88B39A]/15">
            {includes.map((item) => (
              <div key={item} className="flex gap-3 py-4 text-zinc-300">
                <CheckIcon />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/checkout" className="w-full rounded-xl">Quero garantir minha leitura</Button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Pagamento seguro via Mercado Pago · Sigilo total
          </p>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="bg-[#050705] px-6 py-32 text-[#F5F5F3]">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-16 h-px w-72 bg-[#88B39A]/35" />

        <p className="font-serif text-[clamp(3rem,12vw,5.5rem)] leading-[1.05] tracking-[-0.05em]">
          Você já tentou<br />fazer diferente.
        </p>

        <div className="mx-auto my-12 h-px w-32 bg-[#88B39A]/35" />

        <p className="font-serif text-[clamp(3rem,12vw,5.5rem)] leading-[1.05] tracking-[-0.05em]">
          Talvez esteja na hora<br />
          de <span className="text-[#88B39A]">enxergar diferente.</span>
        </p>

        <div className="mt-12">
          <Button href="/checkout" className="w-full rounded-xl">Começar minha Análise Ponto Cego</Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050705] text-[#F5F5F3]">
      <Navbar />
      <Hero />
      <Story />
      <Origin />
      <Process />
      <Clarity />
      <About />
      <Delivery />
      <Commitment />
      <FAQ />
      <Offer />
      <Closing />
    </main>
  );
}