# TAREFA — Ponto Cego v1: inversão do fluxo + gates de risco

Você vai implementar uma mudança estrutural no projeto `protocolo-ponto-cego` (Next.js 16, App Router, Tailwind v4, Supabase, Mercado Pago).

Leia este documento inteiro antes de escrever qualquer código. Todas as decisões abaixo já foram tomadas e não devem ser revisadas.

---

## CONTEXTO

O produto é a "Análise Ponto Cego": a pessoa responde um questionário sobre padrões de relacionamento, e um psicólogo (Diego Ciriani, CRP 04/44668) lê as respostas e escreve uma devolutiva individual em até 48h.

**O problema que estamos resolvendo:** hoje a pessoa paga primeiro e responde depois. Isso significa que, se alguém em risco (ideação suicida, violência em curso) preencher o questionário, o dinheiro já entrou e a leitura já está a caminho. Uma leitura que aponta padrões de comportamento, entregue a alguém em crise, sem vínculo terapêutico e com 48h de atraso, pode causar dano real.

**A regra que não se quebra em nenhuma hipótese:** quem está em risco não recebe interpretação de padrão. Recebe encaminhamento.

---

## FLUXO ATUAL (o que existe hoje)

```
Landing → /checkout (coleta nome+email, cria checkout_order)
        → Mercado Pago
        → back_urls.success = /jornada?order={id}
        → JornadaForm (12 etapas, tudo em um componente client)
        → POST /api/jornada
```

Problemas do fluxo atual:
1. Pagamento antes do questionário → não dá pra detectar risco antes de cobrar
2. `JornadaForm.tsx` tem TODAS as etapas no mesmo array `steps` → o conteúdo autoral do produto viaja no bundle público, legível no DevTools sem pagar
3. `POST /api/jornada` grava `payment_status: "not_verified"` e **não valida pagamento nenhum** → dá pra postar respostas sem pagar
4. Existe uma rota `GET /api/checkout/route.ts` órfã que gera pagamento SEM criar `checkout_order` (usa `external_reference: pontocego_${Date.now()}`). Nenhum arquivo aponta pra ela.

---

## FLUXO ALVO

```
Landing (CTA → /jornada)
    ↓
Etapas 1-2 (nome, e-mail)
    → cria checkout_order (payment_status: 'pending', gate_status: 'pending')
    → cria jornada_submission vinculada
    ↓
Etapa 3 (contexto: 5 blocos de seleção)
    ↓
Etapa 4 (pergunta central + RASTREIO DE RISCO)
    ↓
[GATE 1] ──────────────────────┐
    ↓                           ↓
VERDE / AMARELO             VERMELHO
    ↓                           ↓
/checkout                   /acolhimento
(confirmação, SEM campos)   (nada cobrado, alerta pro Diego)
    ↓                           FIM
Mercado Pago
    ↓
Webhook → payment_status = 'approved'
    ↓
/jornada/continuacao (etapas 5-13, protegidas)
    ↓
[GATE 2] no envio → NÃO bloqueia, só alerta o Diego
    ↓
Fila de leitura
```

---

## PASSO 1 — MIGRATION (rodar no SQL Editor do Supabase)

```sql
-- checkout_orders
ALTER TABLE checkout_orders
  ADD COLUMN IF NOT EXISTS gate_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS jornada_submission_id uuid;
-- gate_status: 'pending' | 'approved' | 'blocked_acolhimento'

-- jornada_submissions
ALTER TABLE jornada_submissions
  ADD COLUMN IF NOT EXISTS risk_level      text,
  ADD COLUMN IF NOT EXISTS risk_category   text,
  ADD COLUMN IF NOT EXISTS risk_gate       text,
  ADD COLUMN IF NOT EXISTS risk_excerpts   jsonb,
  ADD COLUMN IF NOT EXISTS risk_reason     text,
  ADD COLUMN IF NOT EXISTS risk_flagged_at timestamptz,
  ADD COLUMN IF NOT EXISTS alert_sent_at   timestamptz;

CREATE INDEX IF NOT EXISTS idx_jornada_risk
  ON jornada_submissions (risk_level)
  WHERE risk_level IN ('amarelo', 'vermelho');

CREATE INDEX IF NOT EXISTS idx_jornada_email
  ON jornada_submissions (email);

CREATE INDEX IF NOT EXISTS idx_orders_gate
  ON checkout_orders (gate_status);
```

**Importante:** as respostas novas (rastreio, espelho, impacto, proximidade) NÃO ganham coluna. Elas vão no `raw_payload` (jsonb), que já existe. Só ganha coluna o que precisa ser consultado/filtrado.

**Variável de ambiente nova:** `ANTHROPIC_API_KEY` (adicionar no Vercel, Production + Preview). Já existem: `RESEND_API_KEY`, `EMAIL_FROM`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `MERCADO_PAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `PRODUCT_PRICE`.

---

## PASSO 2 — `lib/risk/index.ts` (novo)

Núcleo da classificação. Usado pelo Gate 1 e pelo Gate 2.

### Tipos

```ts
export type RiskLevel = "verde" | "amarelo" | "vermelho";

export type RiskCategory =
  | "autoexterminio" | "violencia_atual" | "violencia_passada"
  | "colapso" | "desorganizacao" | "substancia" | null;

export type Screening = {
  mood: "nenhum_dia" | "alguns_dias" | "mais_da_metade" | "quase_todos_os_dias";
  functioning: "normalmente" | "com_dificuldade" | "muito_pouco" | "nao_tenho_conseguido";
  ideation: "nao" | "passou_pela_cabeca" | "tenho_pensado" | "tenho_pensado_em_como";
};

export type RiskExcerpt = { etapa: number | null; trecho: string };

export type RiskAssessment = {
  level: RiskLevel;
  category: RiskCategory;
  excerpts: RiskExcerpt[];
  reason: string;
};
```

### `classifyScreening(s: Screening): RiskLevel` — determinístico

```
VERMELHO se: ideation === 'tenho_pensado' OU 'tenho_pensado_em_como'

AMARELO se (e não for vermelho):
  ideation === 'passou_pela_cabeca'
  OU mood === 'quase_todos_os_dias'
  OU functioning === 'nao_tenho_conseguido'
  OU (mood === 'mais_da_metade' E functioning === 'muito_pouco')

VERDE: todo o resto
```

### `classifyText(content: string): Promise<RiskAssessment>` — API Claude

Chama `https://api.anthropic.com/v1/messages`, modelo `claude-sonnet-4-5`, `max_tokens: 1000`, header `x-api-key` e `anthropic-version: 2023-06-01`.

**System prompt (usar exatamente este):**

```
Você está avaliando o que uma pessoa escreveu ao buscar uma análise psicológica sobre padrões de relacionamento. Sua ÚNICA tarefa é sinalizar risco.

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

Na dúvida entre dois níveis, escolha SEMPRE o mais alto.
```

**FAIL-SAFE OBRIGATÓRIO:** se a API falhar, der timeout, vier sem `ANTHROPIC_API_KEY`, ou retornar JSON inválido — a função retorna `level: "amarelo"` com `reason: "Classificador indisponível. Revisar manualmente."`.

**NUNCA retorna `verde` por falha técnica.** Falha técnica não pode virar liberação silenciosa.

### `hasPreviousRedFlag(email): Promise<boolean>`

Consulta `jornada_submissions` por `email` (lowercase, trim) com `risk_level = 'vermelho'`. Retorna true se existir.

### `runGate1({ email, mainQuestion, screening }): Promise<RiskAssessment>`

1. `screeningLevel = classifyScreening(screening)`
2. `textAssessment = await classifyText(mainQuestion)`
3. `level = max(screeningLevel, textAssessment.level)`
4. Se `hasPreviousRedFlag(email)` → `level = max(level, 'amarelo')`
5. Se não houver `category` mas `screeningLevel === 'vermelho'` → `category = 'autoexterminio'`

Ordem dos níveis: verde(0) < amarelo(1) < vermelho(2).

### `runGate2(fullAnswers): Promise<RiskAssessment>`

Monta um texto com todas as respostas dissertativas (mainQuestion, sceneConflict, reactionPurpose, sceneProximity, mirrorCriticism, mirrorTruth, intentionImpact, patternHypothesis, desireFear), cada uma rotulada com sua etapa, e chama `classifyText`.

---

## PASSO 3 — Separar as etapas

### `lib/jornada/publicSteps.ts` (novo) — PODE ir no bundle

Contém etapas 1-4: nome, e-mail, contexto (5 blocos de seleção), pergunta central + rastreio.

Reaproveitar do `JornadaForm.tsx` atual: `relationshipStatusOptions`, `ageRangeOptions`, `relationshipDurationOptions`, `discomfortDurationOptions`, `therapyHistoryOptions`, e os textos das 4 primeiras etapas (copiar exatamente).

**Adicionar as opções do rastreio:**

```ts
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
```

**Validação da etapa 4:** a pergunta central E os 3 itens do rastreio são obrigatórios. Sem os 3, não há gate.

### `lib/jornada/privateSteps.server.ts` (novo) — NÃO pode ir no bundle

Contém as etapas 5-13, hoje dentro do `JornadaForm.tsx`: `sceneConflict`, `reactionSelections` + `reactionPurpose`, `sceneProximity`, `mirrorCriticism` + `mirrorTruth`, `intentionImpact`, `patternHypothesis`, `desireFear`, `consent`. Mais `reactionOptions`.

Copiar os textos EXATAMENTE como estão hoje. Não reescrever copy.

Este módulo só pode ser importado por Server Components / Route Handlers. Nunca por `"use client"`.

---

## PASSO 4 — UI da etapa 4 (rastreio)

Na etapa 4, abaixo do textarea da pergunta central, renderizar um **card visualmente separado**:

- Borda discreta, fundo levemente distinto do resto
- **Não usar a cor de destaque do produto** (`#88B39A` / `#6F8F5E`) neste card. Usar cinza neutro.
- Label pequeno em caps: "ANTES DE CONTINUAR"
- Título + descrição do `screeningCopy`
- 3 grupos de seleção única (mesmo estilo dos `ContextChoiceGroup` que já existem)
- Footer com o texto do CVV, em texto pequeno e cor apagada

O tom é sóbrio e de cuidado. Não é alarme, não é triagem médica.

---

## PASSO 5 — `POST /api/jornada/start` (novo)

Chamado quando a pessoa completa a etapa 2 (nome + e-mail).

1. Valida nome e e-mail
2. Cria `checkout_orders` (`payment_status: 'pending'`, `gate_status: 'pending'`)
3. Cria `jornada_submissions` vinculada (`checkout_order_id`, `payment_status: 'pending'`, `analysis_status: 'draft'`)
4. Atualiza `checkout_orders.jornada_submission_id`
5. Retorna `{ ok: true, orderId, submissionId }`

O client guarda o `orderId` no localStorage e o usa nas chamadas seguintes.

---

## PASSO 6 — `POST /api/jornada/gate` (novo) — **GATE 1**

Chamado quando a pessoa completa a etapa 4.

Body: `{ orderId, publicAnswers }` (inclui `mainQuestion` e os 3 itens do rastreio).

1. Busca a `checkout_order` pelo `orderId`. Se não existir → 404.
2. Salva as respostas públicas no `raw_payload` da submission vinculada.
3. Roda `runGate1({ email, mainQuestion, screening })`.
4. Salva na submission: `risk_level`, `risk_category`, `risk_excerpts`, `risk_reason`, `risk_gate: 'gate_1'`, `risk_flagged_at` (se não for verde).
5. Decide:

**VERDE ou AMARELO:**
- `checkout_orders.gate_status = 'approved'`
- Se AMARELO: dispara alerta por e-mail (Resend) pro Diego. Não urgente.
- Retorna `{ ok: true, allowed: true }`

**VERMELHO:**
- `checkout_orders.gate_status = 'blocked_acolhimento'`
- `payment_status` permanece `'pending'` (nada é cobrado, nunca)
- **Dispara alerta IMEDIATO por e-mail (Resend)**
- Retorna `{ ok: true, allowed: false }`

O client redireciona pra `/acolhimento` quando `allowed === false`.

### REGRA CRÍTICA: AMARELO NÃO BLOQUEIA

Só VERMELHO bloqueia. Sofrimento intenso não é incapacidade de comprar. Barrar quem está mal mas não em risco é paternalismo e mata o produto. Amarelo segue pro checkout normalmente, só fica marcado e o Diego é avisado.

---

## PASSO 7 — `/acolhimento` (rota nova)

**Rota própria.** NÃO reaproveitar `/jornada/inicio` (que continua sendo a tela de boas-vindas do fluxo normal).

Regras da tela:
- Sem logo de produto
- Sem CTA de venda
- Sem preço em lugar nenhum
- Sem a cor de destaque comercial
- **Botão único: "Voltar ao início".** Nenhuma saída lateral, nenhum "tentar novamente" (isso viraria convite pra contornar o gate)
- Sóbria, silenciosa

**Copy (usar exatamente):**

```
### Obrigado por ter escrito isso.

Pelo que você respondeu, uma leitura escrita entregue em 48 horas não é o que
vai te ajudar agora. E eu não vou te vender uma.

O que você descreveu pede outra coisa: alguém disponível pra te escutar hoje,
não daqui a dois dias.

**Agora:**

**CVV — 188**
Ligação gratuita, 24 horas, todos os dias. Sigiloso. Você não precisa estar
em crise pra ligar.

**CAPS da sua cidade**
Atendimento em saúde mental pelo SUS, sem precisar de encaminhamento.

**Emergência: 192 (SAMU)**
Se você está em risco agora.

---

Suas respostas ficaram guardadas. Nada foi cobrado.

Quando você estiver mais firme, se ainda quiser fazer a análise, ela vai estar
aqui. Sem pressa e sem prazo.

*Diego Ciriani — psicólogo, CRP 04/44668*

[Voltar ao início]
```

**Nota sobre a copy:** a primeira linha nunca é sobre o bloqueio, é sobre reconhecer o que a pessoa escreveu. A frase "e eu não vou te vender uma" é a peça central: transforma uma porta fechada numa escolha do psicólogo. Não reescrever.

---

## PASSO 8 — `/checkout` (reescrever)

**Remover os campos de nome e e-mail.** Eles já vieram das etapas 1-2.

A página agora:
1. Lê o `orderId` (localStorage ou query param)
2. Chama uma rota server que **valida `gate_status === 'approved'`**
3. Se não estiver aprovado → redireciona pra `/jornada`
4. Mostra tela de confirmação: o que a pessoa vai receber, preço, prazo de 48h
5. Botão chama `POST /api/checkout/preference` com o `orderId`

### `POST /api/checkout/preference` (adaptar de `/api/checkout/orders`)

Não cria mais a order (ela já existe). Ele:
1. Busca a order pelo `orderId`
2. **Valida `gate_status === 'approved'`.** Se não → 403.
3. Gera a preferência no Mercado Pago com `external_reference = order.id`
4. `back_urls.success = ${siteUrl}/jornada/continuacao?order=${order.id}`
5. Salva `mercado_pago_preference_id` na order
6. Retorna `{ checkoutUrl }`

**A validação de `gate_status` tem que ser NO SERVIDOR.** Se confiar no client, alguém barrado abre o DevTools e contorna em dez segundos.

---

## PASSO 9 — `/jornada/continuacao` (rota nova, protegida)

**Server Component.** Ele:
1. Lê `?order={id}`
2. Consulta o Supabase: `payment_status === 'approved'` **E** `gate_status === 'approved'`
3. Se qualquer uma falhar → `redirect('/jornada')`
4. Se passar → importa `privateSteps.server.ts` e passa as etapas como prop pro componente client `PaidJourneyForm`

As duas condições, sempre. Não basta o pagamento: um `checkout_order` bloqueado no gate nunca deve abrir a continuação.

---

## PASSO 10 — `POST /api/jornada` (reescrever) — **GATE 2**

O arquivo atual **não valida pagamento nenhum** e grava `payment_status: "not_verified"`. Corrigir.

Nova ordem:

1. Recebe `{ orderId, answers }`
2. **Valida no servidor:** busca a order, confirma `payment_status === 'approved'` E `gate_status === 'approved'`. Se falhar → **403**. Esta validação é indispensável: alguém pode montar o POST na mão.
3. Valida os campos obrigatórios (como já faz hoje)
4. Atualiza a `jornada_submission` (não cria nova — ela já existe desde a etapa 2):
   - `raw_payload` = todas as respostas (públicas + privadas)
   - Colunas que já existem: `name`, `email`, `relationship_status`, `main_question`, `scene_conflict`, `consent`
   - `payment_status: 'approved'`
   - `analysis_status: 'received'`
5. **Roda `runGate2(answers)`** (não bloqueia nada)
6. Se resultado for amarelo ou vermelho:
   - Salva `risk_level`, `risk_category`, `risk_excerpts`, `risk_reason`
   - `risk_gate` = `'ambos'` se já havia sinalização do Gate 1, senão `'gate_2'`
   - **Dispara alerta pro Diego (Resend), imediato**
7. Retorna `{ ok: true, id }`

### O que o Gate 2 NÃO faz na v1

- **Não bloqueia.** O envio acontece normalmente, a pessoa vê a tela de confirmação de sempre.
- **Não reembolsa.** Não automatizar reembolso agora.

O Gate 2 é o radar do Diego: garante que ele nunca seja pego de surpresa ao abrir a fila. A decisão (entregar com cuidado, ou não entregar e reembolsar na mão) é dele.

**REGRA CRÍTICA:** o alerta tem que chegar ANTES do Diego abrir a fila. Alerta imediato no envio, não digest diário. Se o primeiro contato dele com o caso for o texto cru na fila, o gate não serviu pra nada.

---

## PASSO 11 — `lib/alerts.ts` (novo) — alertas via Resend

```ts
export async function sendRiskAlert(params: {
  level: "amarelo" | "vermelho";
  gate: "gate_1" | "gate_2";
  name: string;
  email: string;
  category: string | null;
  excerpts: { etapa: number | null; trecho: string }[];
  reason: string;
  screening?: Screening;
  hadPreviousRedFlag?: boolean;
  submissionId: string;
})
```

Envia via Resend (`RESEND_API_KEY`, `EMAIL_FROM` já configurados).

**Assunto:** `[PONTO CEGO] {NÍVEL} — {gate} — {nome}`

**Corpo:** nome, e-mail, horário, nível, categoria, trechos (com etapa de origem), respostas do rastreio, e — se houver — o aviso de que o e-mail já tinha sinalização vermelha anterior.

Para VERMELHO no Gate 1, incluir no corpo:
```
AÇÕES AUTOMÁTICAS EXECUTADAS:
- Checkout bloqueado. Nada foi cobrado.
- Tela de acolhimento exibida (CVV 188, CAPS, SAMU).
- Respostas guardadas.
```

Para VERMELHO no Gate 2, incluir:
```
ATENÇÃO: o pagamento JÁ foi aprovado. O envio aconteceu normalmente.

DECISÃO PENDENTE (sua):
- Entregar com cuidado + encaminhamento no fim, OU
- Não entregar, reembolsar manualmente e enviar o acolhimento
```

Falha no envio do alerta **não pode derrubar a request**. Loga o erro e segue.

---

## PASSO 12 — Limpeza

1. **Deletar `app/api/checkout/route.ts`** (o `GET`). É órfão — nenhum arquivo aponta pra ele — e gera pagamento sem criar `checkout_order`, o que produziria uma compra que não vincula com nenhuma submission.
2. **CTA da landing** (`components/sections/Why.tsx` e qualquer outro): trocar `href="/checkout"` por `href="/jornada"`.
3. **`/jornada/inicio`**: continua existindo como tela de boas-vindas. Ajustar o botão pra apontar pra `/jornada`.

---

## DECISÕES TRAVADAS (não revisar)

1. **Fail-safe é amarelo, nunca verde.** Falha técnica no classificador não vira liberação silenciosa.
2. **Amarelo não bloqueia.** Só vermelho.
3. **Validação de `gate_status` e `payment_status` sempre no servidor**, em três pontos: `/checkout`, `/jornada/continuacao`, e `POST /api/jornada`.
4. **Acolhimento em rota própria**, sem saída lateral.
5. **Gate 2 não bloqueia e não reembolsa na v1.** Só alerta.
6. **Herança por e-mail não bloqueia.** Quem já foi vermelho e refaz limpo entra como amarelo permanente, segue pro checkout, e o Diego é avisado. Bloquear seria inútil (novo e-mail em 10 segundos) e pior: ensinaria a mentir, e aí a pessoa chegaria até a leitura sem nenhum sinal.
7. **Não reescrever a copy** das telas e das etapas. Os textos foram trabalhados e estão fechados.

---

## ORDEM DE EXECUÇÃO

**Caminho crítico:**
1. Migration
2. `lib/risk/index.ts`
3. `lib/alerts.ts`
4. `lib/jornada/publicSteps.ts` + `lib/jornada/privateSteps.server.ts`
5. `POST /api/jornada/start`
6. `POST /api/jornada/gate` (Gate 1)
7. `/acolhimento`
8. Refatorar `JornadaForm` → `PublicJourneyForm` (etapas 1-4 + rastreio)
9. `/checkout` sem campos + `POST /api/checkout/preference` com validação
10. `/jornada/continuacao` (Server Component) + `PaidJourneyForm`
11. `POST /api/jornada` reescrito (Gate 2 + validação de pagamento)
12. Limpeza (passo 12)

**Não fazer deploy do Gate 1 antes de `ANTHROPIC_API_KEY` estar no Vercel.** Sem ela, tudo cai no fail-safe amarelo e o gate não bloqueia ninguém.

---

## TESTES ANTES DE PUBLICAR

1. **Verde:** responde tudo normal → chega no checkout
2. **Amarelo (rastreio):** marca "quase todos os dias" no humor → chega no checkout, Diego recebe e-mail
3. **Vermelho (rastreio):** marca "Sim, tenho pensado nisso" → vai pra `/acolhimento`, nada cobrado, Diego recebe e-mail imediato
4. **Vermelho (texto):** escreve algo grave na pergunta central com rastreio limpo → mesmo resultado
5. **Contorno:** refaz com o mesmo e-mail e respostas limpas → passa pro checkout, mas entra como amarelo, e o alerta menciona a sinalização anterior
6. **Bypass do checkout:** digita `/checkout` direto na URL sem passar pelo gate → redireciona pra `/jornada`
7. **Bypass da continuação:** digita `/jornada/continuacao?order={id}` com uma order não paga → redireciona
8. **Bypass da API:** faz `POST /api/jornada` na mão com uma order não paga → 403
9. **Classificador fora do ar:** remove a `ANTHROPIC_API_KEY` num deploy de preview → tudo vira amarelo, nada vira verde

O teste 9 é o mais importante. Se uma falha do classificador liberar alguém como verde, o sistema inteiro está errado.
