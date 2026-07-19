"use client";

import { useState } from "react";

type Dominio = {
  nome: string;
  leitura: string;
  evidencias: string[];
  hipotese_concorrente: string;
  confianca: string;
  o_que_faltaria: string;
};

type Contradicao = {
  descricao: string;
  onde: string;
  leitura_possivel: string;
};

type PontoCego = {
  formulacao: string;
  raciocinio: string;
  por_que_e_cego: string;
  risco_da_leitura: string;
};

type Direcionamento = {
  foco: string;
  justificativa_clinica: string;
  como_observar: string;
  cuidado: string;
};

type QualidadeMaterial = {
  avaliacao: string;
  observacao: string;
};

type AssistantOutput = {
  leitura_geral: string;
  qualidade_do_material: QualidadeMaterial;
  dominios: Dominio[];
  contradicoes: Contradicao[];
  ponto_cego_candidato: PontoCego;
  esqueleto_direcionamentos: Direcionamento[];
  atencao_clinica: string[];
  perguntas_para_o_psicologo: string[];
};

type Run = {
  id: string;
  output: AssistantOutput;
  created_at: string;
  model: string;
};

export default function AssistantPanel({
  id,
  initialRun,
}: {
  id: string;
  initialRun: Run | null;
}) {
  const [run, setRun] = useState<Run | null>(initialRun);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function generate(force: boolean) {
    setIsLoading(true);
    setErrorMessage("");
    setProgress(0);

    try {
      const response = await fetch(
        `/api/admin/analises/${id}/assistente${force ? "?force=1" : ""}`,
        { method: "POST" }
      );

      if (!response.ok || !response.body) {
        setErrorMessage("Não foi possível conectar ao assistente.");
        setIsLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          const lines = block.split("\n");
          let eventName = "";
          let dataRaw = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) eventName = line.slice(7).trim();
            if (line.startsWith("data: ")) dataRaw = line.slice(6).trim();
          }

          if (!eventName || !dataRaw) continue;

          try {
            const data = JSON.parse(dataRaw);

            if (eventName === "progress") {
              setProgress(data.chars ?? 0);
            }

            if (eventName === "done") {
              setRun(data.run);
              setIsLoading(false);
            }

            if (eventName === "error") {
              setErrorMessage(data.message ?? "Erro ao gerar análise.");
              setIsLoading(false);
            }
          } catch {
            // bloco incompleto, ignora
          }
        }
      }
    } catch {
      setErrorMessage("Erro ao chamar o assistente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mb-12 rounded-[2rem] border border-[#6F8F5E]/25 bg-[#6F8F5E]/[0.04] p-8 md:p-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#6F8F5E]">
            Assistente de análise
          </span>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F5F3] md:text-5xl">
            Leitura assistida por IA.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500">
            Análise interna de apoio ao raciocínio clínico. Não é a devolutiva
            do cliente — serve só para você organizar hipóteses antes de
            escrever a Leitura Ponto Cego.
          </p>
        </div>

        {run && (
          <span className="whitespace-nowrap text-xs text-zinc-600">
            Gerada em {new Date(run.created_at).toLocaleString("pt-BR")}
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="mb-6 text-sm text-red-300">{errorMessage}</p>
      )}

      {isLoading && (
        <p className="mb-6 text-sm text-[#6F8F5E]">
          Analisando o protocolo...{" "}
          {progress > 0 && `${progress} caracteres escritos`}
        </p>
      )}

      {!run && !isLoading && (
        <button
          type="button"
          onClick={() => generate(false)}
          className="rounded-full bg-[#6F8F5E] px-7 py-4 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#7fa06c]"
        >
          Gerar análise assistida
        </button>
      )}

      {run && (
        <>
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => generate(true)}
              disabled={isLoading}
              className="rounded-full border border-[#6F8F5E]/40 px-6 py-3 text-sm font-medium text-[#6F8F5E] transition hover:bg-[#6F8F5E]/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Gerando nova análise..." : "Gerar nova análise"}
            </button>
          </div>

          <AssistantResult output={run.output} />
        </>
      )}
    </section>
  );
}

function AssistantResult({ output }: { output: AssistantOutput }) {
  return (
    <div className="space-y-8">
      <Block title="Leitura geral">
        <p className="text-base leading-8 text-zinc-300">
          {output.leitura_geral}
        </p>
      </Block>

      {output.qualidade_do_material && (
        <Block title="Qualidade do material">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#6F8F5E]">
            {output.qualidade_do_material.avaliacao}
          </p>
          <p className="text-sm leading-7 text-zinc-400">
            {output.qualidade_do_material.observacao}
          </p>
        </Block>
      )}

      {output.dominios?.length > 0 && (
        <Block title="Domínios clínicos">
          <div className="space-y-5">
            {output.dominios.map((dominio, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <p className="mb-3 text-base font-semibold text-[#F5F5F3]">
                  {dominio.nome}
                </p>

                <p className="mb-4 text-sm leading-7 text-zinc-300">
                  {dominio.leitura}
                </p>

                {dominio.evidencias?.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {dominio.evidencias.map((trecho, i) => (
                      <p
                        key={i}
                        className="border-l-2 border-[#6F8F5E]/40 pl-4 text-sm italic leading-6 text-zinc-400"
                      >
                        &ldquo;{trecho}&rdquo;
                      </p>
                    ))}
                  </div>
                )}

                <div className="grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                      Hipótese concorrente
                    </span>
                    <p className="leading-6 text-zinc-400">
                      {dominio.hipotese_concorrente}
                    </p>
                  </div>

                  <div>
                    <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                      Confiança · o que faltaria
                    </span>
                    <p className="leading-6 text-zinc-400">
                      <span className="uppercase text-[#6F8F5E]">
                        {dominio.confianca}
                      </span>{" "}
                      — {dominio.o_que_faltaria}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {output.contradicoes?.length > 0 && (
        <Block title="Contradições identificadas">
          <div className="space-y-4">
            {output.contradicoes.map((c, index) => (
              <div
                key={index}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5"
              >
                <p className="mb-2 text-sm font-medium text-zinc-200">
                  {c.descricao}
                </p>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-amber-500/70">
                  {c.onde}
                </p>
                <p className="text-sm leading-6 text-zinc-400">
                  {c.leitura_possivel}
                </p>
              </div>
            ))}
          </div>
        </Block>
      )}

      {output.ponto_cego_candidato && (
        <Block title="Ponto cego candidato">
          <div className="rounded-2xl border border-[#6F8F5E]/30 bg-[#6F8F5E]/[0.06] p-6">
            <p className="mb-4 text-lg font-semibold leading-7 text-[#F5F5F3]">
              {output.ponto_cego_candidato.formulacao}
            </p>

            <div className="space-y-4 text-sm leading-6 text-zinc-300">
              <div>
                <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                  Raciocínio
                </span>
                <p>{output.ponto_cego_candidato.raciocinio}</p>
              </div>

              <div>
                <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                  Por que provavelmente é cego
                </span>
                <p>{output.ponto_cego_candidato.por_que_e_cego}</p>
              </div>

              <div>
                <span className="mb-1 block text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                  Onde essa leitura pode estar errada
                </span>
                <p>{output.ponto_cego_candidato.risco_da_leitura}</p>
              </div>
            </div>
          </div>
        </Block>
      )}

      {output.esqueleto_direcionamentos?.length > 0 && (
        <Block title="Esqueleto de direcionamentos">
          <div className="space-y-4">
            {output.esqueleto_direcionamentos.map((d, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <p className="mb-3 text-base font-semibold text-[#F5F5F3]">
                  {d.foco}
                </p>

                <div className="space-y-3 text-sm leading-6 text-zinc-400">
                  <p>
                    <span className="text-zinc-600">Justificativa: </span>
                    {d.justificativa_clinica}
                  </p>
                  <p>
                    <span className="text-zinc-600">Como observar: </span>
                    {d.como_observar}
                  </p>
                  <p>
                    <span className="text-zinc-600">Cuidado: </span>
                    {d.cuidado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {output.atencao_clinica?.length > 0 && (
        <Block title="Atenção clínica">
          <ul className="space-y-2">
            {output.atencao_clinica.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-zinc-300"
              >
                <span className="text-[#6F8F5E]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {output.perguntas_para_o_psicologo?.length > 0 && (
        <Block title="Perguntas para você considerar">
          <ul className="space-y-2">
            {output.perguntas_para_o_psicologo.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6 text-zinc-400"
              >
                <span className="text-zinc-600">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Block>
      )}
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-zinc-600">
        {title}
      </span>
      {children}
    </div>
  );
}
