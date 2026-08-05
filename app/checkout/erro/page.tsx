import Button from "@/components/ui/Button";

export default function CheckoutErrorPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="mx-auto max-w-2xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Checkout
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Não foi possível concluir o pagamento.
        </h1>

        <p className="mt-8 text-lg leading-8 text-zinc-400">
          Algo impediu a conclusão do checkout. Você pode tentar novamente ou
          iniciar o processo mais tarde.
        </p>

        <div className="mt-10">
          <Button href="checkout">Tentar novamente</Button>
        </div>
      </div>
    </main>
  );
}