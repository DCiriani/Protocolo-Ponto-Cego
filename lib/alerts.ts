import nodemailer from "nodemailer";
import type { RiskExcerpt, Screening } from "@/lib/risk";

type SendRiskAlertParams = {
  level: "amarelo" | "vermelho";
  gate: "gate_1" | "gate_2";
  name: string;
  email: string;
  category: string | null;
  excerpts: RiskExcerpt[];
  reason: string;
  screening?: Screening;
  hadPreviousRedFlag?: boolean;
  submissionId: string;
};

const SCREENING_MOOD_LABELS: Record<string, string> = {
  nenhum_dia: "Nenhum dia",
  alguns_dias: "Alguns dias",
  mais_da_metade: "Mais da metade dos dias",
  quase_todos_os_dias: "Quase todos os dias",
};

const SCREENING_FUNCTIONING_LABELS: Record<string, string> = {
  normalmente: "Sim, normalmente",
  com_dificuldade: "Com dificuldade, mas tenho conseguido",
  muito_pouco: "Muito pouco",
  nao_tenho_conseguido: "Não tenho conseguido",
};

const SCREENING_IDEATION_LABELS: Record<string, string> = {
  nao: "Não, nenhuma vez",
  passou_pela_cabeca: "Passou pela minha cabeça, mas não levei adiante",
  tenho_pensado: "Sim, tenho pensado nisso",
  tenho_pensado_em_como: "Sim, e tenho pensado em como",
};

export async function sendRiskAlert(params: SendRiskAlertParams) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM;
  const alertTo = process.env.ALERT_EMAIL_TO;

  if (!smtpHost || !smtpUser || !smtpPassword || !emailFrom || !alertTo) {
    console.error(
      "sendRiskAlert: SMTP_HOST, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM ou ALERT_EMAIL_TO ausente. Alerta não enviado.",
      { submissionId: params.submissionId, level: params.level, gate: params.gate },
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const nivelLabel = params.level.toUpperCase();
    const subject = `[PONTO CEGO] ${nivelLabel} — ${params.gate} — ${params.name}`;

    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    const excerptsText =
      params.excerpts.length > 0
        ? params.excerpts
            .map(
              (excerpt) =>
                `- (etapa ${excerpt.etapa ?? "?"}) "${excerpt.trecho}"`,
            )
            .join("\n")
        : "Nenhum trecho destacado.";

    const screeningText = params.screening
      ? [
          `Humor: ${SCREENING_MOOD_LABELS[params.screening.mood] ?? params.screening.mood}`,
          `Funcionamento: ${SCREENING_FUNCTIONING_LABELS[params.screening.functioning] ?? params.screening.functioning}`,
          `Ideação: ${SCREENING_IDEATION_LABELS[params.screening.ideation] ?? params.screening.ideation}`,
        ].join("\n")
      : "Rastreio não disponível neste gate.";

    const previousFlagText = params.hadPreviousRedFlag
      ? "\nATENÇÃO: este e-mail já teve uma sinalização VERMELHA anterior.\n"
      : "";

    let actionsText = "";

    if (params.level === "vermelho" && params.gate === "gate_1") {
      actionsText = `

AÇÕES AUTOMÁTICAS EXECUTADAS:
- Checkout bloqueado. Nada foi cobrado.
- Tela de acolhimento exibida (CVV 188, CAPS, SAMU).
- Respostas guardadas.`;
    }

    if (params.level === "vermelho" && params.gate === "gate_2") {
      actionsText = `

ATENÇÃO: o pagamento JÁ foi aprovado. O envio aconteceu normalmente.

DECISÃO PENDENTE (sua):
- Entregar com cuidado + encaminhamento no fim, OU
- Não entregar, reembolsar manualmente e enviar o acolhimento`;
    }

    const text = `Nome: ${params.name}
E-mail: ${params.email}
Horário: ${timestamp}
Nível: ${nivelLabel}
Categoria: ${params.category ?? "não especificada"}
Motivo: ${params.reason || "não especificado"}
${previousFlagText}
Trechos:
${excerptsText}

Rastreio:
${screeningText}
${actionsText}

ID da submission: ${params.submissionId}`;

    await transporter.sendMail({
      from: emailFrom,
      to: alertTo,
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("sendRiskAlert: falha ao enviar alerta.", error, {
      submissionId: params.submissionId,
      level: params.level,
      gate: params.gate,
    });

    return false;
  }
}
