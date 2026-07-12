import Button from "@/components/ui/Button";

export default function JornadaConcluidaPage() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(136,179,154,0.1),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Jornada concluída
        </span>

        <h1 className="max-w-4xl font-satoshi text-[2rem] font-medium leading-[1.08] tracking-[-0.045em] text-[#6F8F5E] min-[390px]:text-[2.2rem] md:text-[clamp(2.8rem,5.8vw,6.2rem)] md:leading-[1.02]">
  Suas respostas foram registradas.
</h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
          A partir daqui, suas cenas serão usadas como base para a construção da
          sua Leitura Ponto Cego.
        </p>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
          Esta primeira etapa não procura definir quem você é. Ela organiza
          situações, interpretações e padrões para que a análise possa ser feita
          com mais cuidado.
        </p>

        <div className="mt-12">
          <Button href="/">Voltar para o início</Button>
        </div>

        <p className="mt-10 max-w-xl text-sm leading-7 text-zinc-600">
          Importante: a Análise Ponto Cego é uma ferramenta de autoconhecimento.
          Não é diagnóstico e não substitui psicoterapia.
        </p>
      </div>
    </main>
  );
}