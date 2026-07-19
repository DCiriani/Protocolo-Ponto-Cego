import DeleteAnalysisButton from "@/components/admin/DeleteAnalysisButton";
import DeliveryLinkBox from "@/components/admin/DeliveryLinkBox";
import AnalysisNotesForm from "@/components/admin/AnalysisNotesForm";
import StatusActions from "@/components/admin/StatusActions";
import AssistantPanel from "@/components/admin/AssistantPanel";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  formatAnalysisStatus,
  formatPaymentStatus,
} from "@/lib/format-status";

type Submission = {
  id: string;
  name: string;
  email: string;
  relationship_status: string;
  main_question: string;
  scene_conflict: string;
  scene_silence: string;
  scene_limit: string;
  scene_shrunk_life: string | null;
  scene_repetition: string;
  scene_choice: string;
  expected_clarity: string;
  consent: boolean;
  payment_status: string | null;
  analysis_status: string | null;
  created_at: string;
  analysis_notes: string | null;
  analysis_notes_updated_at: string | null;
  delivery_token: string | null;
  delivery_enabled: boolean;
  delivery_created_at: string | null;
  delivery_viewed_at: string | null;
  delivery_email_sent_at: string | null;
  delivery_email_error: string | null;
  delivery_email_message_id: string | null;
};

type Lens = {
  grade: string[];
  cde: string[];
  observar: string;
};

type Item = {
  label: string;
  value: string | null;
  lens?: Lens;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AdminAnalysisPage({ params }: PageProps) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("jornada_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Admin analysis detail error:", error);
    notFound();
  }

  const submission = data as Submission;

  const { data: latestRun } = await supabaseAdmin
    .from("analysis_assistant_runs")
    .select("id, output, created_at, model")
    .eq("submission_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const currentStatus = submission.analysis_status ?? "received";

  const items: Item[] = [
    {
      label: "Pergunta central",
      value: submission.main_question,
    },
    {
      label: "Cena 01 — O conflito",
      value: submission.scene_conflict,
      lens: {
        grade: ["Regulação emocional", "Pensamentos automáticos", "Estilo de conflito"],
        cde: ["Expressão limite", "Busca de atenção"],
        observar:
          "Distância entre 'o que fiz na hora' e 'o que fiz depois'. Quem pede desculpa sem ter errado aparece aqui.",
      },
    },
    {
      label: "Cena 02 — O silêncio",
      value: submission.scene_silence,
      lens: {
        grade: ["Apego", "Medo de abandono", "Crença central de rejeição"],
        cde: ["Ansiedade de separação (principal)", "Reasseguramento"],
        observar:
          "O que ela fez com a angústia: cobrou, testou, fingiu indiferença, se puniu? A estratégia diz mais que a emoção.",
      },
    },
    {
      label: "Cena 03 — O limite",
      value: submission.scene_limit,
      lens: {
        grade: ["Assertividade", "Culpa", "Submissão", "Medo de perda como moeda"],
        cde: ["Preço do 'não' (se dizer não custa a relação, tem dependência sustentando)"],
        observar:
          "Reconhece o limite e não defende, OU nem reconhece que tinha um? São dois pontos cegos diferentes.",
      },
    },
    {
      label: "Cena 04 — A vida que encolheu",
      value: submission.scene_shrunk_life,
      lens: {
        grade: ["Identidade", "Autonomia", "Fusão relacional"],
        cde: ["Modificação de planos (principal)"],
        observar:
          "Renúncia pedida pelo outro + isolamento de amigos = cruzar com Domínio 13 (controle). Autoapagamento preventivo ('ninguém pediu, fui eu') também é dado clínico.",
      },
    },
    {
      label: "Cena 05 — O padrão",
      value: submission.scene_repetition,
      lens: {
        grade: ["Nível de insight (calibra a leitura inteira)"],
        cde: [],
        observar:
          "Padrão descrito culpando só os outros vs se incluindo na equação. A ausência da própria pessoa no padrão é o ponto cego mais frequente.",
      },
    },
    {
      label: "Cena 06 — A escolha revista",
      value: submission.scene_choice,
      lens: {
        grade: ["Idealização", "Permanência", "Crença sobre estar só"],
        cde: ["Medo da solidão (embutido, sem virar item)"],
        observar:
          "Se o que segurava for sobre o outro ('ele prometia mudar') = dependência da esperança. Se for sobre si ('não sabia ficar só') = dependência da presença.",
      },
    },
    {
      label: "Clareza esperada",
      value: submission.expected_clarity,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-8 inline-block text-sm font-medium text-zinc-500 transition hover:text-[#88B39A]"
            >
              ← Voltar para análises
            </Link>

            <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              Análise recebida
            </span>

            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">
              {submission.name}
            </h1>

            <p className="mt-6 text-lg text-zinc-400">{submission.email}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-zinc-500 md:text-right">
            <span>
              Enviada em{" "}
              {new Date(submission.created_at).toLocaleDateString("pt-BR")}
            </span>

            <span className="rounded-full border border-[#88B39A]/30 bg-[#88B39A]/10 px-4 py-2 text-center text-xs text-[#88B39A]">
              {formatAnalysisStatus(currentStatus)}
            </span>

            <StatusActions id={submission.id} currentStatus={currentStatus} />
          </div>
        </div>

         <AssistantPanel id={submission.id} initialRun={latestRun ?? null} />
         
        <AnalysisNotesForm
        
          id={submission.id}
          initialNotes={submission.analysis_notes ?? ""}
        />

        <DeliveryLinkBox
          id={submission.id}
          name={submission.name}
          initialToken={submission.delivery_token}
          deliveryEnabled={submission.delivery_enabled}
          deliveryEmailSentAt={submission.delivery_email_sent_at}
          deliveryEmailError={submission.delivery_email_error}
        />

        <section className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <InfoCard
              label="Momento relacional"
              value={submission.relationship_status}
            />

            <InfoCard
              label="Pagamento"
              value={formatPaymentStatus(submission.payment_status)}
            />

            <InfoCard
              label="Consentimento"
              value={submission.consent ? "Confirmado" : "Não confirmado"}
            />
          </div>
        </section>

        <section className="divide-y divide-white/10 rounded-[2rem] border border-white/10">
          {items.map((item) => (
            <div key={item.label} className="p-8 md:p-10">
              <span className="mb-5 block text-xs uppercase tracking-[0.3em] text-zinc-600">
                {item.label}
              </span>

              <p className="whitespace-pre-wrap text-lg leading-9 text-zinc-300 md:text-xl md:leading-10">
                {item.value || "Sem resposta"}
              </p>

              {item.lens && <LensPanel lens={item.lens} />}
            </div>
          ))}
        </section>

        <DeleteAnalysisButton id={submission.id} name={submission.name} />
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-zinc-600">
        {label}
      </span>

      <p className="text-lg text-[#F5F5F3]">{value}</p>
    </div>
  );
}

function LensPanel({ lens }: { lens: Lens }) {
  return (
    <div className="mt-8 rounded-2xl border border-[#88B39A]/20 bg-[#88B39A]/[0.04] p-6">
      <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.35em] text-[#88B39A]">
        Lente clínica
      </span>

      <div className="grid gap-4 text-sm text-zinc-400 md:grid-cols-2">
        <div>
          <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
            Grade
          </span>
          <p className="leading-6 text-zinc-300">{lens.grade.join(" · ")}</p>
        </div>

        {lens.cde.length > 0 && (
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
              CDE
            </span>
            <p className="leading-6 text-zinc-300">{lens.cde.join(" · ")}</p>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-[#88B39A]/15 pt-5">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
          Observar
        </span>
        <p className="text-sm leading-6 text-zinc-300">{lens.observar}</p>
      </div>
    </div>
  );
}
