import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AcolhimentoPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#F5F5F3] md:text-4xl">
          Obrigado por ter escrito isso.
        </h1>

        <p className="mt-8 text-lg leading-8 text-zinc-400">
          Pelo que você respondeu, uma leitura escrita entregue em 48 horas
          não é o que vai te ajudar agora. E eu não vou te vender uma.
        </p>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          O que você descreveu pede outra coisa: alguém disponível pra te
          escutar hoje, não daqui a dois dias.
        </p>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Agora
        </p>

        <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
          <div>
            <p className="font-semibold text-zinc-200">CVV — 188</p>
            <p className="mt-1 text-zinc-400">
              Ligação gratuita, 24 horas, todos os dias. Sigiloso. Você não
              precisa estar em crise pra ligar.
            </p>
          </div>

          <div>
            <p className="font-semibold text-zinc-200">CAPS da sua cidade</p>
            <p className="mt-1 text-zinc-400">
              Atendimento em saúde mental pelo SUS, sem precisar de
              encaminhamento.
            </p>
          </div>

          <div>
            <p className="font-semibold text-zinc-200">
              Emergência: 192 (SAMU)
            </p>
            <p className="mt-1 text-zinc-400">Se você está em risco agora.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-zinc-400">
            Suas respostas ficaram guardadas. Nada foi cobrado.
          </p>

          <p className="mt-4 text-zinc-400">
            Quando você estiver mais firme, se ainda quiser fazer a análise,
            ela vai estar aqui. Sem pressa e sem prazo.
          </p>

          <p className="mt-6 italic text-zinc-500">
            Diego Ciriani — psicólogo, CRP 04/44668
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-zinc-300 transition hover:border-white/30 hover:text-[#F5F5F3]"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
