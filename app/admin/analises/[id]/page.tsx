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

type RawPayload = {
  sceneConflict?: string;
  reactionSelections?: string[];
  reactionPurpose?: string;
  sceneProximity?: string;
  mirrorCriticism?: string;
  mirrorTruth?: string;
  intentionImpact?: string;
  patternHypothesis?: string;
  desireFear?: string;
  ageRange?: string;
  relationshipDuration?: string;
  discomfortDuration?: string;
  therapyHistory?: string;
};

type Submission = {
  id: string;
  name: string;
  email: string;
  relationship_status: string;
  main_question: string;
  raw_payload: RawPayload | null;
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

 const payload = submission.raw_payload ?? {};

  const items: Item[] = [
    {
      label: "Pergunta central",
      value: submission.main_question,
    },
    {
      label: "Contexto",
      value: [
        payload.ageRange,
        payload.relationshipDuration && `Relação: ${payload.relationshipDuration}`,
        payload.discomfortDuration && `Incômodo: ${payload.discomfortDuration}`,
        payload.therapyHistory,
      ]
        .filter(Boolean)
        .join(" · ") || null,
    },
    {
      label: "Cena — O conflito",
      value: payload.sceneConflict ?? null,
      lens: {
        grade: ["Regulação emocional", "Pensamentos automáticos", "Estilo de conflito"],
        cde: ["Expressão limite", "Busca de atenção"],
        observar:
          "Distância entre 'o que fiz na hora' e 'o que fiz depois'. Quem pede desculpa sem ter errado aparece aqui.",
      },
    },
    {
      label: "O que fez na hora",
      value: payload.reactionSelections?.length
        ? payload.reactionSelections.join(" · ")
        : null,
      lens: {
        grade: ["Estratégia de enfrentamento", "Assertividade", "Controle"],
        cde: ["Expressão limite", "Reasseguramento"],
        observar:
          "A estratégia diz mais que a emoção. Cobrar, testar, punir e fingir indiferença são coisas diferentes.",
      },
    },
    {
      label: "O que queria conseguir com isso",
      value: payload.reactionPurpose ?? null,
      lens: {
        grade: ["Função do comportamento", "Comunicação indireta"],
        cde: ["Busca de atenção", "Necessidade de validação externa"],
        observar:
          "Se a intenção só se realiza pelo sofrimento visível, a pessoa não aprendeu a pedir diretamente.",
      },
    },
    {
      label: "Há quanto tempo se repete",
      value: payload.sceneProximity ?? null,
      lens: {
        grade: ["Cronicidade", "Nível de insight"],
        cde: [],
        observar:
          "Reconhecer que é padrão e mesmo assim repetir indica que insight sozinho não está bastando.",
      },
    },
    {
      label: "Espelho — O que critica no outro",
      value: payload.mirrorCriticism ?? null,
      lens: {
        grade: ["Atribuição", "Projeção", "Crença sobre o outro"],
        cde: ["Idealização e decepção"],
        observar:
          "Comparar com o campo seguinte. O que ela critica no outro costuma ter versão própria não reconhecida.",
      },
    },
    {
      label: "Espelho — O que admite sobre si",
      value: payload.mirrorTruth ?? null,
      lens: {
        grade: ["Nível de insight (calibra a leitura inteira)", "Autocrítica"],
        cde: [],
        observar:
          "Se ela já nomeia o próprio padrão aqui, o ponto cego não é o padrão — é o que impede de agir sobre ele.",
      },
    },
    {
      label: "Intenção versus impacto",
      value: payload.intentionImpact ?? null,
      lens: {
        grade: ["Ciclo interpessoal", "Reforço negativo"],
        cde: ["Ansiedade de separação"],
        observar:
          "Quando a estratégia produz exatamente o que ela teme, o ciclo se sustenta sozinho. É onde o padrão fica visível.",
      },
    },
    {
      label: "Hipótese dela sobre o próprio padrão",
      value: payload.patternHypothesis ?? null,
      lens: {
        grade: ["Insight", "Formulação própria"],
        cde: [],
        observar:
          "Se a hipótese dela já está correta, a devolutiva precisa ir além dela, não repeti-la.",
      },
    },
    {
      label: "Desejo e medo",
      value: payload.desireFear ?? null,
      lens: {
        grade: ["Crença central", "Medo nuclear", "Esquema de abandono"],
        cde: ["Medo da solidão", "Modificação de planos"],
        observar:
          "Desejo formulado como 'sem precisar pedir' indica crença de que pedir invalida o que se recebe.",
      },
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
