import { Suspense } from "react";
import JornadaForm from "@/components/jornada/JornadaForm";

export const dynamic = "force-dynamic";

export default function JornadaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0A0A0A] px-6 py-24 text-[#F5F5F3]">
          <div className="mx-auto max-w-3xl">
            <span className="mb-6 block text-sm uppercase tracking-[0.35em] text-zinc-600">
              Jornada Ponto Cego
            </span>

            <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
              Carregando jornada.
            </h1>
          </div>
        </main>
      }
    >
      <JornadaForm />
    </Suspense>
  );
}