import Button from "@/components/ui/Button";

export default function JornadaPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="mx-auto max-w-3xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Jornada Ponto Cego
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">
          A próxima etapa será responder suas cenas.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
          Esta página será o início do questionário da Análise Ponto Cego.
          Na próxima sprint, vamos construir a jornada completa, uma pergunta
          por tela.
        </p>

        <div className="mt-12">
          <Button href="/">Voltar para o início</Button>
        </div>
      </div>
    </main>
  );
}