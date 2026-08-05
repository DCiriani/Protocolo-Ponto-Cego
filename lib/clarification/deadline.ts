export const CLARIFICATION_WINDOW_DAYS = 7;

const WINDOW_MS = CLARIFICATION_WINDOW_DAYS * 24 * 60 * 60 * 1000;

/**
 * O prazo de 7 dias conta a partir de `delivery_created_at` (o momento em que
 * o link de entrega foi gerado pela primeira vez), nunca de
 * `delivery_email_sent_at` (que pode mudar se o e-mail for reenviado).
 *
 * Se `deliveryCreatedAt` não existir, tratamos como prazo encerrado — falha
 * fechada, já que essa situação não deveria acontecer numa leitura entregue.
 */
export function getClarificationWindow(
  deliveryCreatedAt: string | null,
  now: Date = new Date()
) {
  if (!deliveryCreatedAt) {
    return { withinWindow: false, deadline: null as Date | null };
  }

  const deadline = new Date(
    new Date(deliveryCreatedAt).getTime() + WINDOW_MS
  );

  return {
    withinWindow: now.getTime() <= deadline.getTime(),
    deadline,
  };
}
