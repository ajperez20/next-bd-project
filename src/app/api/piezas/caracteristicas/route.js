import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET() {
  try {
    const caracteristicas = await piezaService.getCaracteristicasDisponibles();
    return NextResponse.json(caracteristicas);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener las características",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
