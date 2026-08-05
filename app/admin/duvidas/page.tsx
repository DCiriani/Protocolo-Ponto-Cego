import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ClarificationAnswerForm from "@/components/admin/ClarificationAnswerForm";

type ClarificationRequest = {
  id: string;
  submission_id: string;
  question: string;
  answer: string | null;
  status: "pending" | "answered";
  asked_at: string;
  answered_at: string | null;
  jornada_submissions: {
    name: string;
    email: string;
  } | null;
};

export const dynamic = "force-dynamic";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminClarificationsPage() {
  const { data, error } = await supabaseAdmin
    .from("clarification_requests")
    .select(
      `
      id,
      submission_id,
      question,
      answer,
      status,
      asked_at,
      answered_at,
      jornada_submissions ( name, email )
    `
    )
    .order("asked_at", { ascending: true });

  if (error) {
    console.error("Admin clarifications error:", error);
  }

  const requests = (data ?? []) as unknown as ClarificationRequest[];

  const pending = requests.filter((request) => request.status === "pending");
  const answered = requests
    .filter((request) => request.status === "answered")
    .sort((a, b) => {
      const aTime = a.answered_at ? new Date(a.answered_at).getTime() : 0;
      const bTime = b.answered_at ? new Date(b.answered_at).getTime() : 0;
      return bTime - aTime;
    });

  const ordered = [...pending, ...answered];

  return (
    <main
      className="min-h-screen bg-[#0F2032] px-6 py-24 text-[#EDEAE3]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-8 inline-block text-sm font-medium text-[#8E9BA7] transition hover:text-[#C08552]"
            >
              ← Voltar para análises
            </Link>

            <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#C08552]">
              Painel
            </span>

            <h1
              className="text-4xl leading-[1.05] tracking-[-0.01em] text-white md:text-6xl"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
              }}
            >
              Dúvidas recebidas.
            </h1>
          </div>

          {pending.length > 0 && (
            <span className="rounded-full border border-[#C08552]/35 bg-[#C08552]/10 px-4 py-2 text-center text-xs text-[#E0B877]">
              {pending.length} pendente{pending.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-red-200">
            Não foi possível carregar as dúvidas.
          </div>
        ) : ordered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-[#AFBAC5]">
            Nenhuma dúvida recebida ainda.
          </div>
        ) : (
          <div className="space-y-6">
            {ordered.map((request) => (
              <section
                key={request.id}
                id={request.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 scroll-mt-24"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#EDEAE3]">
                      {request.jornada_submissions?.name ?? "Cliente"}
                    </p>

                    <p className="mt-1 text-sm text-[#8E9BA7]">
                      {request.jornada_submissions?.email}
                    </p>

                    <p className="mt-1 text-xs text-[#7E8A96]">
                      Perguntou em {formatDateTime(request.asked_at)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs ${
                      request.status === "answered"
                        ? "border-[#7C8F6A]/40 bg-[#7C8F6A]/12 text-[#9DB18C]"
                        : "border-[#C08552]/35 bg-[#C08552]/10 text-[#E0B877]"
                    }`}
                  >
                    {request.status === "answered"
                      ? "Respondida"
                      : "Pendente"}
                  </span>
                </div>

                <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-[#DCE2E8]">
                  “{request.question}”
                </p>

                {request.status === "answered" ? (
                  <div className="mt-6 rounded-2xl border border-[#7C8F6A]/25 bg-[#7C8F6A]/[0.06] p-5">
                    <span className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-[#9DB18C]">
                      Resposta enviada
                      {request.answered_at
                        ? ` em ${formatDateTime(request.answered_at)}`
                        : ""}
                    </span>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-[#DCE2E8]">
                      {request.answer}
                    </p>
                  </div>
                ) : (
                  <ClarificationAnswerForm id={request.id} />
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
