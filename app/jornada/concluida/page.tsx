import Button from "@/components/ui/Button";

export default function JornadaConcluidaPage() {
  return (
    <main
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0F2032] px-6 text-[#EDEAE3]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(192,133,82,0.12),transparent_36%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-[#8E9BA7]">
          Jornada concluída
        </span>

        <h1
          className="max-w-4xl text-[2rem] leading-[1.12] tracking-[-0.01em] text-[#C08552] min-[390px]:text-[2.2rem] md:text-[clamp(2.6rem,5.2vw,4.6rem)] md:leading-[1.06]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
          }}
        >
          Suas respostas foram registradas.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#AFBAC5] md:text-xl md:leading-9">
          A partir daqui, suas cenas serão usadas como base para a construção da
          sua Leitura Ponto Cego.
        </p>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#AFBAC5] md:text-xl md:leading-9">
          Esta primeira etapa não procura definir quem você é. Ela organiza
          situações, interpretações e padrões para que a análise possa ser feita
          com mais cuidado.
        </p>

        <div className="mt-12">
          <Button href="/">Voltar para o início</Button>
        </div>

        <p className="mt-10 max-w-xl text-sm leading-7 text-[#7E8A96]">
          Importante: a Análise Ponto Cego é uma ferramenta de autoconhecimento.
          Não é diagnóstico e não substitui psicoterapia.
        </p>
      </div>
    </main>
  );
}
