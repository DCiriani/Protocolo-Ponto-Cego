import Button from "@/components/ui/Button";

export default function CheckoutErrorPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#F1F4F1] px-6 text-[#1E2B29]">
      <div className="mx-auto max-w-2xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-[#8A6A2E]">
          Checkout
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Não foi possível concluir o pagamento.
        </h1>

        <p className="mt-8 text-lg leading-8 text-[#52625D]">
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