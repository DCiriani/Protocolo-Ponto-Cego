import type { Step } from "@/lib/jornada/types";

export const publicSteps: Step[] = [
  {
    key: "name",
    eyebrow: "Identificação",
    title: "Como você quer ser chamado nesta análise?",
    description:
      "Use o nome pelo qual você se sente confortável em ser chamado na sua Análise Ponto Cego.",
    type: "input",
    placeholder: "Seu nome",
  },
  {
    key: "email",
    eyebrow: "Entrega",
    title: "Para qual e-mail sua análise deve ser enviada?",
    description:
      "Esse e-mail será usado para identificar suas respostas e enviar sua devolutiva quando ela estiver pronta.",
    type: "email",
    placeholder: "seuemail@exemplo.com",
  },
];