import Button from "@/components/ui/Button";

export default function JornadaInicioPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Jornada Ponto Cego
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">
          Sua análise começa agora.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
          Antes de responder, lembre-se: esta análise não procura descobrir quem
          está certo. Ela procura compreender padrões que podem estar
          influenciando sua forma de se relacionar.
        </p>

        <div className="mt-12">
          <Button href="/jornada">Começar minha jornada</Button>
        </div>

        <p className="mt-10 text-sm leading-7 text-zinc-600">
          Na próxima etapa, você responderá situações reais. Não existem
          respostas certas. Existe apenas a sua forma de perceber, interpretar e
          reagir.
        </p>
      </div>
    </main>
  );
}