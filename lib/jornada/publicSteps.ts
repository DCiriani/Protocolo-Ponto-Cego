import type { Step } from "@/lib/jornada/types";

export const relationshipStatusOptions = [
  "Estou em um relacionamento",
  "Sou casado(a)",
  "Estou solteiro(a)",
  "Estou em uma relação indefinida",
  "Passei por um término recentemente",
];

export const ageRangeOptions = [
  "Até 24 anos",
  "De 25 a 34 anos",
  "De 35 a 44 anos",
  "45 anos ou mais",
];

export const relationshipDurationOptions = [
  "Menos de 1 ano",
  "De 1 a 3 anos",
  "De 3 a 7 anos",
  "Mais de 7 anos",
  "Não se aplica",
];

export const discomfortDurationOptions = [
  "Começou recentemente",
  "Há alguns meses",
  "Há alguns anos",
  "Aparece desde as minhas primeiras relações",
];

export const therapyHistoryOptions = [
  "Nunca fiz",
  "Já fiz, mas não faço atualmente",
  "Faço atualmente",
];

export const screeningMoodOptions = [
  { label: "Nenhum dia", value: "nenhum_dia" },
  { label: "Alguns dias", value: "alguns_dias" },
  { label: "Mais da metade dos dias", value: "mais_da_metade" },
  { label: "Quase todos os dias", value: "quase_todos_os_dias" },
];

export const screeningFunctioningOptions = [
  { label: "Sim, normalmente", value: "normalmente" },
  { label: "Com dificuldade, mas tenho conseguido", value: "com_dificuldade" },
  { label: "Muito pouco", value: "muito_pouco" },
  { label: "Não tenho conseguido", value: "nao_tenho_conseguido" },
];

export const screeningIdeationOptions = [
  { label: "Não, nenhuma vez", value: "nao" },
  { label: "Passou pela minha cabeça, mas não levei adiante", value: "passou_pela_cabeca" },
  { label: "Sim, tenho pensado nisso", value: "tenho_pensado" },
  { label: "Sim, e tenho pensado em como", value: "tenho_pensado_em_como" },
];

export const screeningCopy = {
  eyebrow: "Antes de continuar",
  title: "Como você tem passado nas últimas duas semanas.",
  description:
    "Essas perguntas não fazem parte da análise. Elas existem porque, dependendo do seu momento, uma leitura escrita não é o que você mais precisa agora.\n\nResponde com sinceridade. Não tem resposta errada e ninguém vai te julgar.",
  moodLabel:
    "Nas últimas duas semanas, com que frequência você se sentiu pra baixo, sem esperança ou sem vontade de nada?",
  functioningLabel:
    "Nas últimas duas semanas, você tem conseguido tocar sua rotina (trabalho, casa, cuidar de você)?",
  ideationLabel:
    "Nas últimas duas semanas, você teve pensamentos de que seria melhor não estar aqui, ou de se machucar de alguma forma?",
  footer:
    "Se você marcou algo aqui e quer falar com alguém agora, o CVV atende 24 horas pelo 188. A ligação é gratuita e sigilosa.",
};

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
  {
    key: "relationshipStatus",
    eyebrow: "Contexto",
    title: "Antes das cenas, um pouco sobre o seu momento.",
    description:
      "Essas informações ajudam a contextualizar suas respostas. Não existe opção melhor ou mais correta.",
    type: "context",
  },
  {
    key: "mainQuestion",
    eyebrow: "Pergunta central",
    title: "O que te fez procurar a Análise Ponto Cego agora?",
    description:
      "Conta o que está acontecendo, o que vem se repetindo ou o que você sente que ainda não conseguiu entender sozinho.\n\nNão precisa organizar perfeitamente. Escreve do seu jeito.",
    type: "textarea",
    placeholder: "O que está acontecendo na sua vida afetiva neste momento?",
  },
];
