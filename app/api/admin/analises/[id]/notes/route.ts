import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const notes = body?.notes;

    if (typeof notes !== "string") {
      return NextResponse.json(
        {
          ok: false,
          message: "Texto da leitura inválido.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("jornada_submissions")
      .update({
        analysis_notes: notes,
        analysis_notes_updated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Update analysis notes error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Não foi possível salvar a leitura.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Admin notes API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao salvar leitura.",
      },
      { status: 500 }
    );
  }
}