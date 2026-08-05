import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import PrintReadingButton from "@/components/leitura/PrintReadingButton";
import ReadingContent from "@/components/leitura/ReadingContent";
import ClarificationBlock from "@/components/leitura/ClarificationBlock";
import { getClarificationWindow } from "@/lib/clarification/deadline";

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
  searchParams: Promise<{
    pdf?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ReadingPage({ params, searchParams }: PageProps) {
  const { token } = await params;
  const { pdf } = await searchParams;
  const isPdf = pdf === "1";

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

  const deliveryDate = reading.delivery_created_at
    ? new Date(reading.delivery_created_at).toLocaleDateString("pt-BR")
    : new Date().toLocaleDateString("pt-BR");

  const { data: clarificationData } = await supabaseAdmin
    .from("clarification_requests")
    .select("question, answer, status")
    .eq("submission_id", reading.id)
    .maybeSingle();

  const clarification = clarificationData as {
    question: string;
    answer: string | null;
    status: "pending" | "answered";
  } | null;

  const { withinWindow } = getClarificationWindow(reading.delivery_created_at);

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-20 text-[#F5F5F3] print:bg-white print:px-12 print:py-10 print:text-black">
      <div className="mx-auto max-w-3xl print:mx-auto print:max-w-[720px]">
        <div className="mb-16 print:mb-10">
          <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#88B39A] print:text-zinc-600">
            Leitura Ponto Cego
          </span>

          <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl print:text-4xl print:tracking-[-0.03em]">
            {reading.name}, esta é a sua leitura.
          </h1>

          <p className="mt-8 text-lg leading-8 text-zinc-400 print:text-base print:text-zinc-700">
            Esta devolutiva foi construída a partir das suas respostas na
            Jornada Ponto Cego.
          </p>

          <p className="mt-4 text-sm text-zinc-600 print:text-zinc-600">
            Entregue em {deliveryDate}
          </p>

          {!isPdf && (
            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <PrintReadingButton token={token} />

              <Link
                href="/"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:border-[#88B39A]/40 hover:text-[#F5F5F3]"
              >
                Voltar para o Ponto Cego
              </Link>
            </div>
          )}
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 print:border-0 print:bg-white print:p-0">
          <ReadingContent text={reading.analysis_notes} />
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-black/30 p-6 text-sm leading-7 text-zinc-500 print:mt-10 print:rounded-2xl print:border print:border-zinc-300 print:bg-white print:p-6 print:text-xs print:text-zinc-700">
          <p>
            Esta leitura não substitui psicoterapia, avaliação psicológica,
            diagnóstico ou acompanhamento clínico. Ela tem caráter reflexivo e
            foi construída para ampliar clareza sobre padrões relacionais.
          </p>
        </section>

        {!isPdf && (
          <ClarificationBlock
            token={token}
            withinWindow={withinWindow}
            existing={clarification}
          />
        )}

        <footer className="mt-12 text-center text-sm text-zinc-600 print:mt-10 print:text-left print:text-xs">
          <p>Ponto Cego — Diego Ciriani</p>
        </footer>
      </div>
    </main>
  );
}