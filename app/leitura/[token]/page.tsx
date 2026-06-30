import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Reading = {
  id: string;
  name: string;
  analysis_notes: string | null;
  delivery_enabled: boolean;
  delivery_viewed_at: string | null;
  delivery_created_at: string | null;
};

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ReadingPage({ params }: PageProps) {
  const { token } = await params;

  const { data, error } = await supabaseAdmin
    .from("jornada_submissions")
    .select(
      "id, name, analysis_notes, delivery_enabled, delivery_viewed_at, delivery_created_at"
    )
    .eq("delivery_token", token)
    .eq("delivery_enabled", true)
    .single();

  if (error || !data) {
    notFound();
  }

  const reading = data as Reading;

  if (
    typeof reading.analysis_notes !== "string" ||
    reading.analysis_notes.trim().length === 0
  ) {
    notFound();
  }

  if (!reading.delivery_viewed_at) {
    await supabaseAdmin
      .from("jornada_submissions")
      .update({
        delivery_viewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", reading.id);
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-20 text-[#F5F5F3]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16">
          <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#88B39A]">
            Leitura Ponto Cego
          </span>

          <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
            {reading.name}, esta é a sua leitura.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Esta devolutiva foi construída a partir das suas respostas na
            Jornada Ponto Cego.
          </p>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-lg leading-9 text-zinc-300 md:text-xl md:leading-10">
              {reading.analysis_notes}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-black/30 p-6 text-sm leading-7 text-zinc-500">
          <p>
            Esta leitura não substitui psicoterapia, avaliação psicológica,
            diagnóstico ou acompanhamento clínico. Ela tem caráter reflexivo e
            foi construída para ampliar clareza sobre padrões relacionais.
          </p>
        </section>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition hover:text-[#88B39A]"
          >
            Voltar para o Ponto Cego →
          </Link>
        </div>
      </div>
    </main>
  );
}