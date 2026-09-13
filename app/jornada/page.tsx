import { Suspense } from "react";
import PublicJourneyForm from "@/components/jornada/PublicJourneyForm";

export const dynamic = "force-dynamic";

export default function JornadaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F1F4F1] px-6 py-24 text-[#1E2B29]">
          <div className="mx-auto max-w-3xl">
            <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-[#8A9992]">
              Jornada Ponto Cego
            </span>

            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
              Carregando jornada.
            </h1>
          </div>
        </main>
      }
    >
      <PublicJourneyForm />
    </Suspense>
  );
}