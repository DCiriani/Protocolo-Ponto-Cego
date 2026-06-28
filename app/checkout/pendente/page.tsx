import Button from "@/components/ui/Button";

export default function CheckoutPendingPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="mx-auto max-w-2xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Pagamento pendente
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Seu pagamento ainda está em processamento.
        </h1>

        <p className="mt-8 text-lg leading-8 text-zinc-400">
          Assim que o pagamento for aprovado, você poderá iniciar sua Jornada
          Ponto Cego.
        </p>

        <div className="mt-10">
          <Button href="/">Voltar para o início</Button>
        </div>
      </div>
    </main>
  );
}