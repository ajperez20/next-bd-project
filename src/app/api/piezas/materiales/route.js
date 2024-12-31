import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET() {
  try {
    const materiales = await piezaService.getMaterialesDisponibles();
    return NextResponse.json(materiales);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los materiales",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
