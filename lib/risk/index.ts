import { supabaseAdmin } from "@/lib/supabase/admin";

export type RiskLevel = "verde" | "amarelo" | "vermelho";

export type RiskCategory =
  | "autoexterminio"
  | "violencia_atual"
  | "violencia_passada"
  | "colapso"
  | "desorganizacao"
  | "substancia"
  | null;

export type Screening = {
  mood: "nenhum_dia" | "alguns_dias" | "mais_da_metade" | "quase_todos_os_dias";
  functioning:
    | "normalmente"
    | "com_dificuldade"
    | "muito_pouco"
    | "nao_tenho_conseguido";
  ideation:
    | "nao"
    | "passou_pela_cabeca"
    | "tenho_pensado"
    | "tenho_pensado_em_como";
};

export type RiskExcerpt = { etapa: number | null; trecho: string };

export type RiskAssessment = {
  level: RiskLevel;
  category: RiskCategory;
  excerpts: RiskExcerpt[];
  reason: string;
};

const LEVEL_ORDER: Record<RiskLevel, number> = {
  verde: 0,
  amarelo: 1,
  vermelho: 2,
};

function maxLevel(a: RiskLevel, b: RiskLevel): RiskLevel {
  return LEVEL_ORDER[a] >= LEVEL_ORDER[b] ? a : b;
}

export function classifyScreening(s: Screening): RiskLevel {
  if (s.ideation === "tenho_pensado" || s.ideation === "tenho_pensado_em_como") {
    return "vermelho";
  }

  if (
    s.ideation === "passou_pela_cabeca" ||
    s.mood === "quase_todos_os_dias" ||
    s.functioning === "nao_tenho_conseguido" ||
    (s.mood === "mais_da_metade" && s.functioning === "muito_pouco")
  ) {
    return "amarelo";
  }

  return "verde";
}

const SYSTEM_PROMPT = `Você está avaliando o que uma pessoa escreveu ao buscar uma análise psicológica sobre padrões de relacionamento. Sua ÚNICA tarefa é sinalizar risco.

Você NÃO faz análise clínica. NÃO interpreta padrões. NÃO comenta o conteúdo. NÃO dá conselhos.

Classifique em três níveis:

VERMELHO — risco atual à vida ou à integridade da pessoa:
- Menção a suicídio, autoextermínio, automutilação, desejo de não existir, plano ou método
- Violência física, sexual, ameaça de morte ou cárcere sofridos ATUALMENTE ou em relação AINDA EM CURSO
- Perigo imediato de qualquer natureza

AMARELO — sofrimento intenso, sem risco imediato à vida:
- Desespero, colapso funcional, luto agudo
- Relação com controle sistemático, humilhação, coerção, isolamento imposto
- Uso de substância como fuga
- Sinais de desorganização psíquica (perda de contato com a realidade, pensamento desorganizado)
- Violência sofrida em relação JÁ ENCERRADA, sem risco atual

VERDE — sofrimento comum de quem busca autoconhecimento sobre relações.

Responda APENAS com JSON válido, sem markdown, sem crases, sem preâmbulo:
{
  "nivel": "VERMELHO" | "AMARELO" | "VERDE",
  "categoria": "autoexterminio" | "violencia_atual" | "violencia_passada" | "colapso" | "desorganizacao" | "substancia" | null,
  "trechos": [{ "etapa": <número ou null>, "trecho": "frase exata do texto" }],
  "motivo": "uma frase curta"
}

Na dúvida entre dois níveis, escolha SEMPRE o mais alto.`;

const FALLBACK_ASSESSMENT: RiskAssessment = {
  level: "amarelo",
  category: null,
  excerpts: [],
  reason: "Classificador indisponível. Revisar manualmente.",
};

function normalizeLevel(value: unknown): RiskLevel | null {
  if (value === "VERMELHO") return "vermelho";
  if (value === "AMARELO") return "amarelo";
  if (value === "VERDE") return "verde";
  return null;
}

function normalizeCategory(value: unknown): RiskCategory {
  const validCategories: RiskCategory[] = [
    "autoexterminio",
    "violencia_atual",
    "violencia_passada",
    "colapso",
    "desorganizacao",
    "substancia",
  ];

  if (typeof value === "string" && (validCategories as string[]).includes(value)) {
    return value as RiskCategory;
  }

  return null;
}

function normalizeExcerpts(value: unknown): RiskExcerpt[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is { etapa?: unknown; trecho?: unknown } =>
        typeof item === "object" && item !== null,
    )
    .map((item) => ({
      etapa: typeof item.etapa === "number" ? item.etapa : null,
      trecho: typeof item.trecho === "string" ? item.trecho : "",
    }))
    .filter((item) => item.trecho.length > 0);
}

export async function classifyText(content: string): Promise<RiskAssessment> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY ausente — aplicando fail-safe amarelo.");
    return { ...FALLBACK_ASSESSMENT };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      return { ...FALLBACK_ASSESSMENT };
    }

    const data = await response.json();
    const rawText = data?.content?.[0]?.text;

    if (typeof rawText !== "string") {
      console.error("Anthropic API resposta sem texto:", data);
      return { ...FALLBACK_ASSESSMENT };
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.error("Anthropic API JSON inválido:", rawText);
      return { ...FALLBACK_ASSESSMENT };
    }

    if (typeof parsed !== "object" || parsed === null) {
      return { ...FALLBACK_ASSESSMENT };
    }

    const record = parsed as Record<string, unknown>;
    const level = normalizeLevel(record.nivel);

    if (!level) {
      console.error("Anthropic API nível inválido:", record);
      return { ...FALLBACK_ASSESSMENT };
    }

    return {
      level,
      category: normalizeCategory(record.categoria),
      excerpts: normalizeExcerpts(record.trechos),
      reason: typeof record.motivo === "string" ? record.motivo : "",
    };
  } catch (error) {
    console.error("Anthropic API request falhou:", error);
    return { ...FALLBACK_ASSESSMENT };
  }
}

export async function hasPreviousRedFlag(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabaseAdmin
    .from("jornada_submissions")
    .select("id")
    .eq("email", normalizedEmail)
    .eq("risk_level", "vermelho")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("hasPreviousRedFlag query error:", error);
    return false;
  }

  return Boolean(data);
}

export async function runGate1({
  email,
  mainQuestion,
  screening,
}: {
  email: string;
  mainQuestion: string;
  screening: Screening;
}): Promise<RiskAssessment> {
  const screeningLevel = classifyScreening(screening);
  const textAssessment = await classifyText(mainQuestion);

  let level = maxLevel(screeningLevel, textAssessment.level);
  let category = textAssessment.category;

  if (await hasPreviousRedFlag(email)) {
    level = maxLevel(level, "amarelo");
  }

  if (!category && screeningLevel === "vermelho") {
    category = "autoexterminio";
  }

  return {
    level,
    category,
    excerpts: textAssessment.excerpts,
    reason: textAssessment.reason,
  };
}

export async function runGate2(fullAnswers: {
  mainQuestion?: string;
  sceneConflict?: string;
  reactionPurpose?: string;
  sceneProximity?: string;
  mirrorCriticism?: string;
  mirrorTruth?: string;
  intentionImpact?: string;
  patternHypothesis?: string;
  desireFear?: string;
}): Promise<RiskAssessment> {
  const labeledFields: Array<{ key: keyof typeof fullAnswers; etapa: number; label: string }> = [
    { key: "mainQuestion", etapa: 4, label: "Pergunta central" },
    { key: "sceneConflict", etapa: 5, label: "Cena 01 — O conflito" },
    { key: "reactionPurpose", etapa: 6, label: "A reação" },
    { key: "sceneProximity", etapa: 7, label: "Cena 02 — A proximidade" },
    { key: "mirrorCriticism", etapa: 8, label: "O espelho — crítica" },
    { key: "mirrorTruth", etapa: 8, label: "O espelho — verdade" },
    { key: "intentionImpact", etapa: 9, label: "Intenção e impacto" },
    { key: "patternHypothesis", etapa: 10, label: "O padrão" },
    { key: "desireFear", etapa: 11, label: "Desejo e medo" },
  ];

  const content = labeledFields
    .map(({ key, etapa, label }) => {
      const value = fullAnswers[key];
      if (typeof value !== "string" || value.trim().length === 0) return null;
      return `[Etapa ${etapa} — ${label}]\n${value.trim()}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return classifyText(content);
}
