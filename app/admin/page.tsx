import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { formatAnalysisStatus } from "@/lib/format-status";

type Submission = {
  id: string;
  name: string;
  email: string;
  relationship_status: string;
  analysis_status: string | null;
  payment_status: string | null;
  analysis_notes: string | null;
  delivery_token: string | null;
  delivery_enabled: boolean | null;
  delivery_viewed_at: string | null;
  created_at: string;
};

export const dynamic = "force-dynamic";

function getDeliveryLabel(submission: Submission) {
  if (submission.delivery_viewed_at) {
    return {
      label: "Visualizada",
      className: "border-[#88B39A]/30 bg-[#88B39A]/10 text-[#88B39A]",
    };
  }

  if (submission.delivery_enabled && submission.delivery_token) {
    return {
      label: "Link ativo",
      className: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    };
  }

  if (
    typeof submission.analysis_notes === "string" &&
    submission.analysis_notes.trim().length > 0
  ) {
    return {
      label: "Leitura salva",
      className: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    };
  }

  return {
    label: "Sem leitura",
    className: "border-white/10 bg-white/[0.03] text-zinc-500",
  };
}

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from("jornada_submissions")
    .select(
      `
      id,
      name,
      email,
      relationship_status,
      analysis_status,
      payment_status,
      analysis_notes,
      delivery_token,
      delivery_enabled,
      delivery_viewed_at,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin submissions error:", error);
  }

  const submissions = (data ?? []) as Submission[];

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              Painel
            </span>

            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">
              Análises recebidas.
            </h1>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition hover:text-[#88B39A]"
          >
            Voltar para o site →
          </Link>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-red-200">
            Não foi possível carregar as análises.
          </div>
        ) : submissions.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
            Nenhuma análise recebida ainda.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <div className="hidden grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_0.7fr] border-b border-white/10 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.25em] text-zinc-600 md:grid">
              <span>Nome</span>
              <span>E-mail</span>
              <span>Status</span>
              <span>Entrega</span>
              <span>Data</span>
            </div>

            <div className="divide-y divide-white/10">
              {submissions.map((submission) => {
                const delivery = getDeliveryLabel(submission);

                return (
                  <Link
                    key={submission.id}
                    href={`/admin/analises/${submission.id}`}
                    className="grid gap-4 px-6 py-6 text-sm transition hover:bg-white/[0.04] md:grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_0.7fr]"
                  >
                    <div>
                      <p className="font-semibold text-[#F5F5F3]">
                        {submission.name}
                      </p>

                      <p className="mt-1 text-zinc-600">
                        {submission.relationship_status}
                      </p>
                    </div>

                    <div className="text-zinc-400">{submission.email}</div>

                    <div>
                      <span className="rounded-full border border-[#88B39A]/30 bg-[#88B39A]/10 px-3 py-1 text-xs text-[#88B39A]">
                        {formatAnalysisStatus(submission.analysis_status)}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${delivery.className}`}
                      >
                        {delivery.label}
                      </span>
                    </div>

                    <div className="text-zinc-500">
                      {new Date(submission.created_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}