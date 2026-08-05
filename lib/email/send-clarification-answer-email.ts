import nodemailer from "nodemailer";

type SendClarificationAnswerEmailParams = {
  to: string;
  name: string;
  question: string;
  answer: string;
};

export async function sendClarificationAnswerEmail({
  to,
  name,
  question,
  answer,
}: SendClarificationAnswerEmailParams) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM;

  if (!smtpHost) {
    throw new Error("SMTP_HOST não configurado.");
  }

  if (!smtpUser) {
    throw new Error("SMTP_USER não configurado.");
  }

  if (!smtpPassword) {
    throw new Error("SMTP_PASSWORD não configurado.");
  }

  if (!emailFrom) {
    throw new Error("EMAIL_FROM não configurado.");
  }

  const subject = "Sua dúvida sobre a Análise Ponto Cego";

  const text = `Olá, ${name}.

Você perguntou:
"${question}"

${answer}

Se precisar de acompanhamento contínuo, considere buscar psicoterapia. Fico à disposição.

Diego Ciriani — psicólogo, CRP 04/44668`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#0A0A0A; color:#F5F5F3; padding:40px;">
      <div style="max-width:620px; margin:0 auto;">
        <p style="color:#88B39A; letter-spacing:4px; text-transform:uppercase; font-size:12px;">
          Ponto Cego
        </p>

        <h1 style="font-size:32px; line-height:1.15; margin:24px 0;">
          Sua dúvida sobre a Análise Ponto Cego.
        </h1>

        <p style="font-size:16px; line-height:1.7; color:#D4D4D8;">
          Olá, ${name}.
        </p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA; margin-top:28px;">
          Você perguntou:
        </p>

        <blockquote style="margin:12px 0 28px; padding:16px 20px; border-left:3px solid #88B39A; background:rgba(136,179,154,0.08); font-size:15px; line-height:1.7; color:#D4D4D8;">
          ${question}
        </blockquote>

        <p style="font-size:16px; line-height:1.8; color:#F5F5F3; white-space:pre-wrap;">${answer}</p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA; margin-top:32px;">
          Se precisar de acompanhamento contínuo, considere buscar psicoterapia.
          Fico à disposição.
        </p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA;">
          Diego Ciriani — psicólogo, CRP 04/44668<br />
          Ponto Cego
        </p>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const info = await transporter.sendMail({
    from: emailFrom,
    to,
    subject,
    text,
    html,
  });

  return {
    id: info.messageId,
  };
}
