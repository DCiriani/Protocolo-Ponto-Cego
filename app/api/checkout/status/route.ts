import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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
    .select("id, gate_status, payment_status")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) {
    return NextResponse.json(
      { ok: false, message: "Pedido não encontrado." },
      { status: 404 },
    );
  }

  const price = Number(process.env.PRODUCT_PRICE ?? "147");

  return NextResponse.json({
    ok: true,
    allowed: order.gate_status === "approved",
    price,
  });
}
