"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Informe seu nome.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      alert("Informe um e-mail válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.checkoutUrl) {
        alert(result?.message ?? "Não foi possível iniciar o checkout.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = result.checkoutUrl;
    } catch {
      alert("Erro ao iniciar o checkout.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-3xl">
        <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Checkout
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Antes de seguir para o pagamento.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Informe seus dados para que possamos vincular seu pagamento à sua
          Jornada Ponto Cego.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10"
        >
          <div className="grid gap-6">
            <label>
              <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-zinc-600">
                Nome
              </span>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/50"
              />
            </label>

            <label>
              <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-zinc-600">
                E-mail
              </span>

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@exemplo.com"
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-[#88B39A]/50"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 rounded-full bg-[#88B39A] px-7 py-4 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Iniciando pagamento..." : "Ir para pagamento"}
          </button>

         <p className="mt-6 text-xs leading-6 text-zinc-600">
  Seu pagamento será processado pelo Mercado Pago. Ao continuar, você declara
  estar ciente dos{" "}
  <a href="/termos" className="text-[#88B39A] hover:text-[#9fcaad]">
    Termos de Uso
  </a>{" "}
  e da{" "}
  <a
    href="/politica-de-privacidade"
    className="text-[#88B39A] hover:text-[#9fcaad]"
  >
    Política de Privacidade
  </a>
  .
</p>
        </form>
      </div>
    </main>
  );
}