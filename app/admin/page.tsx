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

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function getSaoPauloRanges() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date())
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  const todayStart = new Date(
    `${year}-${pad(month)}-${pad(day)}T00:00:00-03:00`,
  );
  const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysStart = new Date(
    todayStart.getTime() - 6 * 24 * 60 * 60 * 1000,
  );
  const monthStart = new Date(
    `${year}-${pad(month)}-01T00:00:00-03:00`,
  );

  return {
    todayStart,
    tomorrowStart,
    yesterdayStart,
    sevenDaysStart,
    monthStart,
  };
}

async function countQuizCompletions(start?: Date, end?: Date) {
  let query = supabaseAdmin
    .from("quiz_completions")
    .select("id", { count: "exact", head: true });

  if (start) {
    query = query.gte("created_at", start.toISOString());
  }

  if (end) {
    query = query.lt("created_at", end.toISOString());
  }

  const { count, error } = await query;

  if (error) {
    console.error("Quiz analytics count error:", error);
    return 0;
  }

  return count ?? 0;
}

function getDeliveryLabel(submission: Submission) {
  if (submission.delivery_viewed_at) {
    return {
      label: "Visualizada",
      className: "border-[#7C8F6A]/40 bg-[#7C8F6A]/12 text-[#9DB18C]",
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
      className: "border-[#E0B877]/40 bg-[#E0B877]/10 text-[#E0B877]",
    };
  }

  return {
    label: "Sem leitura",
    className: "border-white/10 bg-white/[0.03] text-[#7E8A96]",
  };
}

export default async function AdminPage() {
  const {
    todayStart,
    tomorrowStart,
    yesterdayStart,
    sevenDaysStart,
    monthStart,
  } = getSaoPauloRanges();

  const [
    submissionsResult,
    todayCount,
    yesterdayCount,
    sevenDaysCount,
    monthCount,
    totalCount,
  ] = await Promise.all([
    supabaseAdmin
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
      `,
      )
      .order("created_at", { ascending: false }),
    countQuizCompletions(todayStart, tomorrowStart),
    countQuizCompletions(yesterdayStart, todayStart),
    countQuizCompletions(sevenDaysStart, tomorrowStart),
    countQuizCompletions(monthStart, tomorrowStart),
    countQuizCompletions(),
  ]);

  const { data, error } = submissionsResult;

  if (error) {
    console.error("Admin submissions error:", error);
  }

  const submissions = (data ?? []) as Submission[];
  const quizMetrics = [
    { label: "Hoje", value: todayCount },
    { label: "Ontem", value: yesterdayCount },
    { label: "Últimos 7 dias", value: sevenDaysCount },
    { label: "Este mês", value: monthCount },
    { label: "Total", value: totalCount },
  ];

  return (
    <main
      className="min-h-screen bg-[#0F2032] px-6 py-24 text-[#EDEAE3]"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
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
              Análises recebidas.
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin/duvidas"
              className="text-sm font-medium text-[#8E9BA7] transition hover:text-[#C08552]"
            >
              Dúvidas
            </Link>

            <Link
              href="/"
              className="text-sm font-medium text-[#8E9BA7] transition hover:text-[#C08552]"
            >
              Voltar para o site →
            </Link>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-6">
            <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-[#C08552]">
              Avaliação gratuita
            </span>
            <h2
              className="text-2xl text-white md:text-3xl"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
              }}
            >
              Conclusões anônimas
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {quizMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="block text-xs uppercase tracking-[0.2em] text-[#8E9BA7]">
                  {metric.label}
                </span>
                <strong className="mt-3 block text-3xl font-semibold text-[#EDEAE3]">
                  {metric.value}
                </strong>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-[#7E8A96]">
            A contagem é anônima e considera um identificador aleatório por
            navegador. Nenhum nome, e-mail ou resposta do questionário é salvo
            aqui.
          </p>
        </section>

        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-red-200">
            Não foi possível carregar as análises.
          </div>
        ) : submissions.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-[#AFBAC5]">
            Nenhuma análise recebida ainda.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <div className="hidden grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_0.7fr] border-b border-white/10 bg-white/[0.04] px-6 py-4 text-xs uppercase tracking-[0.25em] text-[#8E9BA7] md:grid">
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
                    className="grid gap-4 px-6 py-6 text-sm transition hover:bg-white/[0.05] md:grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_0.7fr]"
                  >
                    <div>
                      <p className="font-semibold text-[#EDEAE3]">
                        {submission.name}
                      </p>

                      <p className="mt-1 text-[#7E8A96]">
                        {submission.relationship_status}
                      </p>
                    </div>

                    <div className="text-[#AFBAC5]">{submission.email}</div>

                    <div>
                      <span className="rounded-full border border-[#C08552]/35 bg-[#C08552]/10 px-3 py-1 text-xs text-[#E0B877]">
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

                    <div className="text-[#7E8A96]">
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
