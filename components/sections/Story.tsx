import Container from "@/components/ui/Container";

export default function Story() {
  return (
    <section className="relative overflow-hidden bg-[#050705] py-24 text-[#F5F5F3] md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(190,170,110,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#050705_0%,#080a08_45%,#050705_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:3px_3px]" />

      <Container className="relative z-10">
        <div className="relative mx-auto min-h-[780px] max-w-[430px] md:min-h-[920px] md:max-w-[720px] lg:max-w-[860px]">
          {/* Bloco 1 */}
          <div className="absolute left-0 top-6">
            <div className="relative flex h-[210px] w-[250px] items-center justify-center rounded-full border border-[#6F8F5E]/10 md:h-[260px] md:w-[330px]">
              <div className="absolute inset-3 rounded-full border border-[#6F8F5E]/10" />
              <div className="absolute inset-6 rounded-full border border-[#6F8F5E]/10" />

              <div className="relative z-10">
                <p className="font-[family-name:var(--font-bodoni)] text-[2.8rem] font-medium leading-[0.92] tracking-[-0.03em] text-[#F5F5F3] md:text-[4.1rem]">
                  Existem
                  <br />
                  histórias
                </p>

                <p className="mt-4 font-satoshi text-[0.9rem] font-semibold uppercase tracking-[0.22em] text-[#6F8F5E] md:text-[1.2rem]">
                  que se repetem
                </p>
              </div>
            </div>
          </div>

          {/* Seta para direita */}
          <div className="absolute left-[57%] top-[140px] hidden items-center md:flex">
            <div className="h-[2px] w-[95px] bg-[#6F8F5E]/65" />
            <div className="-ml-5 h-8 w-8 rotate-45 border-r-2 border-t-2 border-[#6F8F5E]/65" />
          </div>

          <div className="absolute left-[58%] top-[120px] flex items-center md:hidden">
            <div className="h-[2px] w-[65px] bg-[#6F8F5E]/65" />
            <div className="-ml-4 h-6 w-6 rotate-45 border-r-2 border-t-2 border-[#6F8F5E]/65" />
          </div>

          {/* Bloco 2 */}
          <div className="absolute right-0 top-[120px] md:top-[150px]">
            <p className="font-[family-name:var(--font-bodoni)] text-[2.4rem] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F5F3] md:text-[4rem]">
              Mudam
              <br />
              os rostos
            </p>
          </div>

          {/* Linha vertical + seta para esquerda */}
          <div className="absolute right-[19%] top-[245px] h-[170px] w-[2px] bg-[#6F8F5E]/55 md:right-[20%] md:top-[310px] md:h-[210px]">
            <div className="absolute bottom-0 right-0 h-[2px] w-[170px] bg-[#6F8F5E]/55 md:w-[250px]" />
            <div className="absolute bottom-[-11px] right-[158px] h-6 w-6 -rotate-135 border-r-2 border-t-2 border-[#6F8F5E]/55 md:right-[238px]" />
          </div>

          {/* Bloco 3 */}
          <div className="absolute left-[7%] top-[420px] md:top-[540px]">
            <p className="font-[family-name:var(--font-bodoni)] text-[2.7rem] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F5F3] md:text-[4.4rem]">
              Muda o
              <br />
              cenário
            </p>

            <div className="mt-3 h-px w-[170px] bg-[#6F8F5E]/45 md:w-[230px]" />
          </div>

          {/* Seta para baixo */}
          <div className="absolute left-[34%] top-[565px] h-[85px] w-[2px] bg-[#6F8F5E]/55 md:left-[31%] md:top-[700px] md:h-[110px]">
            <div className="absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rotate-135 border-r-2 border-t-2 border-[#6F8F5E]/55" />
          </div>

          {/* Frase final */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <p className="font-[family-name:var(--font-bodoni)] text-[1.55rem] font-medium leading-tight text-[#6F8F5E]/80 md:text-[2.4rem]">
              Mas algo continua acontecendo
            </p>

            <p className="mt-5 font-[family-name:var(--font-bodoni)] text-[3.2rem] font-medium uppercase leading-none tracking-[-0.035em] text-[#F5F5F3] md:text-[5.8rem]">
              Do mesmo jeito
            </p>

            <div className="mx-auto mt-6 h-px w-[300px] bg-[#6F8F5E]/45 md:w-[540px]" />
            <div className="mx-auto mt-2 h-px w-[230px] bg-[#6F8F5E]/25 md:w-[420px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}