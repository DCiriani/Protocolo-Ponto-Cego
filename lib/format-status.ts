export function formatAnalysisStatus(status?: string | null) {
  const labels: Record<string, string> = {
    received: "Recebida",
    in_analysis: "Em análise",
    reading_ready: "Leitura pronta",
    finished: "Finalizada",
  };

  return labels[status ?? "received"] ?? "Recebida";
}

export function formatPaymentStatus(status?: string | null) {
  const labels: Record<string, string> = {
    not_verified: "Não verificado",
    approved: "Aprovado",
    pending: "Pendente",
    rejected: "Recusado",
  };

  return labels[status ?? "not_verified"] ?? "Não verificado";
}