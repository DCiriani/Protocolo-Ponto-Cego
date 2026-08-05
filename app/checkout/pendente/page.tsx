"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

function PendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tooLong, setTooLong] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get("order");

    if (!orderId) {
      router.replace("/jornada");
      return;
    }

    let attempts = 0;
    const maxAttempts = 40; // 40 x 3s = 2 minutos

    const interval = setInterval(async () => {
      attempts += 1;

      try {
        const response = await fetch(
          `/api/checkout/status?orderId=${encodeURIComponent(orderId)}`,
        );
        const result = await response.json();

        if (result?.ok && result.paymentStatus === "approved") {
          clearInterval(interval);
          router.replace(`/jornada/continuacao?order=${orderId}`);
          return;
        }
      } catch {
        // silencioso — tenta de novo no próximo ciclo
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTooLong(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center bg-[#0A0A0A] px-6 text-[#F5F5F3]">
      <div className="mx-auto max-w-2xl">
        <span className="mb-8 block text-sm uppercase tracking-[0.35em] text-zinc-600">
          Confirmando pagamento
        </span>

        <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-7xl">
          Estamos confirmando seu pagamento.
        </h1>

        {!tooLong ? (
          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Isso costuma levar alguns segundos. Assim que o pagamento for
            confirmado, você será levado automaticamente para a continuação da
            sua jornada. Não feche esta página.
          </p>
        ) : (
          <>
            <p className="mt-8 text-lg leading-8 text-zinc-400">
              A confirmação está demorando mais que o normal. Se você já pagou,
              não se preocupe: assim que o pagamento for aprovado, você receberá
              um e-mail com o acesso para continuar. Você pode fechar esta
              página com segurança.
            </p>

            <div className="mt-10">
              <Button href="/">Voltar para o início</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function CheckoutPendingPage() {
  return (
    <Suspense fallback={null}>
      <PendingContent />
    </Suspense>
  );
}