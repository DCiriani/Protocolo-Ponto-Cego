import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const allowedStatuses = [
  "received",
  "in_analysis",
  "reading_ready",
  "finished",
];

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const status = body?.status;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Status inválido.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("jornada_submissions")
      .update({
        analysis_status: status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Update analysis status error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível atualizar o status.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      status,
    });
  } catch (error) {
    console.error("Admin status API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao atualizar status.",
      },
      { status: 500 }
    );
  }
}