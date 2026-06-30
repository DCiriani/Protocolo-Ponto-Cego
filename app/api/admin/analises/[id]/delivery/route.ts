import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

function createDeliveryToken() {
  return crypto.randomUUID().replaceAll("-", "");
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { data: currentSubmission, error: fetchError } = await supabaseAdmin
      .from("jornada_submissions")
      .select("id, delivery_token, analysis_notes")
      .eq("id", id)
      .single();

    if (fetchError || !currentSubmission) {
      console.error("Fetch delivery submission error:", fetchError);

      return NextResponse.json(
        {
          ok: false,
          message: "Análise não encontrada.",
        },
        { status: 404 }
      );
    }

    if (
      typeof currentSubmission.analysis_notes !== "string" ||
      currentSubmission.analysis_notes.trim().length === 0
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "Escreva e salve a leitura antes de gerar o link.",
        },
        { status: 400 }
      );
    }

    const token = currentSubmission.delivery_token ?? createDeliveryToken();

    const { data, error } = await supabaseAdmin
      .from("jornada_submissions")
      .update({
        delivery_token: token,
        delivery_enabled: true,
        delivery_created_at: new Date().toISOString(),
        analysis_status: "reading_ready",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("delivery_token")
      .single();

    if (error) {
      console.error("Create delivery link error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível gerar o link de entrega.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      token: data.delivery_token,
    });
  } catch (error) {
    console.error("Delivery API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao gerar link de entrega.",
      },
      { status: 500 }
    );
  }
}