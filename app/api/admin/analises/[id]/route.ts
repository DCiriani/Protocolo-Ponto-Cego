import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("jornada_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete analysis error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível excluir a análise.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Admin delete analysis API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao excluir análise.",
      },
      { status: 500 }
    );
  }
}