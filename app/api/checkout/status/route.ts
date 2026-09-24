import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPlanPrice } from "@/lib/promotions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { ok: false, message: "orderId ausente." },
      { status: 400 },
    );
  }

  const { data: order, error } = await supabaseAdmin
    .from("checkout_orders")
    .select("id, gate_status, payment_status, plan")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) {
    return NextResponse.json(
      { ok: false, message: "Pedido não encontrado." },
      { status: 404 },
    );
  }

  const basePrice = Number(process.env.PRODUCT_PRICE ?? "147");
  const premiumPrice = Number(process.env.PRODUCT_PRICE_PREMIUM ?? "497");
  const price = getPlanPrice(order.plan, basePrice, premiumPrice);

  return NextResponse.json({
    ok: true,
    allowed: order.gate_status === "approved",
    paymentStatus: order.payment_status,
    price,
  });
}
