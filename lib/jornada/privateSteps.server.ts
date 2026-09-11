import "server-only";
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
  eyebrow: "Antes de enviar",
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

export const reactionOptions = [
  "Tento resolver na hora, mesmo que a outra pessoa não esteja pronta",
  "Fico frio(a) e me afasto",
  "Cedo pra evitar que piore",
  "Cobro explicação ou garantia",
  "Começo a procurar sinais",
  "Falo mais duro do que queria",
  "Finjo que não me importo",
  "Evito o assunto e espero passar",
  "Penso em terminar ou sumir",
  "Faço algo pra provocar uma reação",
  "Reajo de outro jeito",
];

export const privateSteps: Step[] = [
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
  {
    key: "sceneConflict",
    eyebrow: "Cena 01 — O conflito",
    title: "Uma conversa que começou normal e foi esquentando.",
    description:
      "Pensa numa conversa real que virou briga. Ou que não virou, mas ficou marcada. A pessoa disse algo, você reagiu, e as coisas saíram diferentes do que você planejou.\n\nSe não lembrar de uma briga grande, vale uma pequena. O tamanho não importa, o jeito importa.",
    type: "textarea",
    guide:
      "Conte: o que foi dito · o que você entendeu · o que você fez na hora · o que você fez depois que a poeira baixou",
    placeholder: "Escreve com calma, do jeito que veio à cabeça...",
  },
  {
    key: "reactionSelections",
    eyebrow: "A reação",
    title:
      "Quando você sente que a relação tá ameaçada, o que acontece primeiro?",
    description:
      "Uma distância, uma frieza, uma briga no ar. Antes de pensar, você já reagiu de algum jeito.\n\nEscolhe até duas opções. Não escolhe a mais bonita. Escolhe a que acontece de verdade.",
    type: "reaction",
    secondaryTitle:
      "E o que você tá tentando conseguir, ou evitar, quando reage assim?",
    secondaryPlaceholder: "Quando eu faço isso, eu tô tentando...",
  },
  {
    key: "sceneProximity",
    eyebrow: "Cena 02 — A proximidade",
    title: "Quando alguém chegou de verdade.",
    description:
      "Agora inverte. Pensa numa vez em que alguém demonstrou interesse real em você. Presença, cuidado, vontade de construir. Sem joguinho.\n\nComo foi receber isso? Conta o que te deixou bem e o que te incomodou, se incomodou. E o que você fez com essa aproximação.",
    type: "textarea",
    guide:
      "Conte: o que a pessoa fez · o que te deu segurança · o que te deu dúvida ou vontade de recuar · como terminou",
    placeholder: "Como foi receber alguém que estava realmente disponível...",
  },
  {
    key: "mirrorCriticism",
    eyebrow: "O espelho",
    title: "A crítica que você já ouviu mais de uma vez.",
    description:
      "Pensa nas pessoas que já conviveram de perto com você. Parceiros, ex, amigos, família. Existe alguma reclamação sobre você que se repete? Algo que mais de uma pessoa, em momentos diferentes, já apontou?\n\nEscreve do jeito mais parecido possível com o que você ouviu.",
    type: "mirror",
    fieldLabel: "O que já disseram sobre o seu jeito?",
    placeholder: "\u201cVocê sempre...\u201d / \u201cCom você é difícil...\u201d",
    secondaryTitle: "E o que talvez tenha um fundo de verdade nela?",
    secondaryPlaceholder:
      "Olhando com honestidade, o que pode existir de verdadeiro nela...",
  },
  {
    key: "intentionImpact",
    eyebrow: "Intenção e impacto",
    title: "Uma vez em que alguém se magoou com o seu jeito.",
    description:
      "Pensa numa vez em que alguém disse que você magoou, pressionou, ignorou ou afastou. Mesmo que essa não tenha sido a sua intenção.\n\nVocê não precisa concordar com a versão da pessoa. Precisa apenas conseguir contar essa versão.",
    type: "textarea",
    guide:
      "Conte: o que a pessoa diria que você fez · o que você achava que estava fazendo · a diferença que você enxerga hoje",
    placeholder: "Do ponto de vista dela, eu...",
  },
  {
    key: "patternHypothesis",
    eyebrow: "O padrão",
    title: "O que você acha que se repete.",
    description:
      "Olhando pras suas relações até aqui, o que você suspeita que se repete? Pode ser o tipo de pessoa que você escolhe, o jeito como uma relação começa, o jeito como termina ou o papel que você acaba ocupando.\n\nNão precisa ter certeza. Essa é a hipótese que você tem hoje sobre você. A leitura vai colocar essa hipótese ao lado do que apareceu nas outras respostas.",
    type: "textarea",
    placeholder: "Uma frase basta se for a frase certa...",
  },
  {
    key: "desireFear",
    eyebrow: "Desejo e medo",
    title:
      "O que você mais quer encontrar e o que você mais teme viver de novo.",
    description:
      "São duas respostas nessa.\n\nNuma relação, o que você mais quer encontrar? E o que você mais tem medo de repetir?\n\nNão procura a resposta perfeita. Começa pelo que vier primeiro e completa se precisar.",
    type: "textarea",
    placeholder: "Primeiro o que você quer. Depois o que você teme...",
  },
  {
    key: "screeningMood",
    eyebrow: "Antes de enviar",
    title: "Como você tem passado nas últimas duas semanas.",
    description:
      "Essas perguntas não fazem parte da análise. Elas existem porque, dependendo do seu momento, uma leitura escrita não é o que você mais precisa agora.\n\nResponde com sinceridade. Não tem resposta errada e ninguém vai te julgar.",
    type: "screening",
  },
  {
    key: "consent",
    eyebrow: "Antes de enviar",
    title: "Confirme que você compreende o objetivo desta análise.",
    description:
      "A Análise Ponto Cego é uma ferramenta de autoconhecimento. Não é diagnóstico, não substitui psicoterapia e não oferece respostas definitivas sobre outra pessoa.\n\nA leitura é construída a partir do que você contou e do jeito que você contou.",
    type: "consent",
    helper:
      "Li e compreendo que esta análise tem finalidade de autoconhecimento e orientação inicial.",
  },
];