import { Resend } from "resend";

type SendJornadaEmailParams = {
  to: string;
  name: string;
  orderId: string;
};

export async function sendJornadaAccessEmail({
  to,
  name,
  orderId,
}: SendJornadaEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY não configurada.");
  }

  if (!emailFrom) {
    throw new Error("EMAIL_FROM não configurado.");
  }

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL não configurada.");
  }

  const resend = new Resend(resendApiKey);

  const jornadaUrl = `${siteUrl}/jornada?order=${orderId}`;

  const subject = "Sua Jornada Ponto Cego está liberada";

  const text = `Olá, ${name}.

Seu pagamento foi aprovado.

Para iniciar sua Jornada Ponto Cego, acesse:
${jornadaUrl}

Recomendo que responda com calma, em um momento reservado.

Diego Ciriani
Ponto Cego`;

  const html = `
    <div style="font-family: Arial, sans-serif; background:#0A0A0A; color:#F5F5F3; padding:40px;">
      <div style="max-width:620px; margin:0 auto;">
        <p style="color:#88B39A; letter-spacing:4px; text-transform:uppercase; font-size:12px;">
          Ponto Cego
        </p>

        <h1 style="font-size:36px; line-height:1.1; margin:24px 0;">
          Sua Jornada está liberada.
        </h1>

        <p style="font-size:16px; line-height:1.7; color:#D4D4D8;">
          Olá, ${name}.
        </p>

        <p style="font-size:16px; line-height:1.7; color:#D4D4D8;">
          Seu pagamento foi aprovado. Agora você já pode iniciar sua Jornada Ponto Cego.
        </p>

        <p style="margin:32px 0;">
          <a href="${jornadaUrl}" style="display:inline-block; background:#88B39A; color:#0A0A0A; padding:14px 22px; border-radius:999px; text-decoration:none; font-weight:700;">
            Iniciar Jornada Ponto Cego
          </a>
        </p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA;">
          Se o botão não funcionar, copie e cole este link no navegador:
        </p>

        <p style="font-size:14px; line-height:1.7; color:#88B39A; word-break:break-all;">
          ${jornadaUrl}
        </p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA; margin-top:32px;">
          Recomendo que responda com calma, em um momento reservado.
        </p>

        <p style="font-size:14px; line-height:1.7; color:#A1A1AA;">
          Diego Ciriani<br />
          Ponto Cego
        </p>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: emailFrom,
    to,
    subject,
    text,
    html,
  });
}