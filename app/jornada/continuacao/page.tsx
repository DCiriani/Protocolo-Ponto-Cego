import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { privateSteps, reactionOptions } from "@/lib/jornada/privateSteps.server";
import PaidJourneyForm from "@/components/jornada/PaidJourneyForm";

type PageProps = {
  searchParams: Promise<{ order?: string }>;
};

export const dynamic = "force-dynamic";

export default async function JornadaContinuacaoPage({
  searchParams,
}: PageProps) {
  const { order: orderId } = await searchParams;

  if (!orderId) {
    redirect("/jornada");
  }

  const { data: order, error } = await supabaseAdmin
    .from("checkout_orders")
    .select("id, payment_status, gate_status")
    .eq("id", orderId)
    .maybeSingle();

  if (
    error ||
    !order ||
    order.payment_status !== "approved" ||
    order.gate_status !== "approved"
  ) {
    redirect("/jornada");
  }

  return (
    <PaidJourneyForm
      orderId={order.id}
      steps={privateSteps}
      reactionOptions={reactionOptions}
    />
  );
}
