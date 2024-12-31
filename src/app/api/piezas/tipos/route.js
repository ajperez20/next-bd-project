import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET() {
  try {
    const tipos = await piezaService.getTipos();
    return NextResponse.json(tipos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los tipos de pieza",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
