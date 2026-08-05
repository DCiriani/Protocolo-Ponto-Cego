import Button from "@/components/ui/Button";

export default function JornadaInicioPage() {
  return (
    <main
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0F2032] px-6 text-[#EDEAE3]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(192,133,82,0.12),transparent_36%)]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-[#8E9BA7]">
          Jornada Ponto Cego
        </span>

        <h1
          className="text-[2.4rem] leading-[1.08] tracking-[-0.01em] text-[#C08552] md:text-[clamp(3rem,6vw,5.6rem)] md:leading-[1.02]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
          }}
        >
          Sua análise começa agora.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#AFBAC5] md:text-xl md:leading-9">
          Antes de responder, lembre-se: esta análise não procura descobrir quem
          está certo. Ela procura compreender padrões que podem estar
          influenciando sua forma de se relacionar.
        </p>

        <div className="mt-12">
          <Button href="/jornada">Começar minha jornada</Button>
        </div>

        <p className="mt-10 text-sm leading-7 text-[#7E8A96]">
          Na próxima etapa, você responderá situações reais. Não existem
          respostas certas. Existe apenas a sua forma de perceber, interpretar e
          reagir.
        </p>
      </div>
    </main>
  );
}
