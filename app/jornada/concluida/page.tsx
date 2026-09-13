import Button from "@/components/ui/Button";

export default function JornadaConcluidaPage() {
  return (
    <main
      className="relative flex min-h-screen items-center overflow-hidden bg-[#F1F4F1] px-6 text-[#1E2B29]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(46,102,136,0.12),transparent_36%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-[#8A9992]">
          Jornada concluída
        </span>

        <h1
          className="max-w-4xl text-[1.65rem] leading-[1.2] tracking-[-0.01em] text-[#2E6688] min-[390px]:text-[1.8rem] md:text-[clamp(1.9rem,3vw,2.4rem)] md:leading-[1.2]"
          style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          Suas respostas foram registradas.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#52625D] md:text-xl md:leading-9">
          A partir daqui, suas cenas serão usadas como base para a construção da
          sua Leitura Ponto Cego.
        </p>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52625D] md:text-xl md:leading-9">
          Esta primeira etapa não procura definir quem você é. Ela organiza
          situações, interpretações e padrões para que a análise possa ser feita
          com mais cuidado.
        </p>

        <div className="mt-12">
          <Button href="/">Voltar para o início</Button>
        </div>

        <p className="mt-10 max-w-xl text-sm leading-7 text-[#8A9992]">
          Importante: a Análise Ponto Cego é uma ferramenta de autoconhecimento.
          Não é diagnóstico e não substitui psicoterapia.
        </p>
      </div>
    </main>
  );
}
