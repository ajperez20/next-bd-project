import { NextResponse } from "next/server";
import { modeloAvionService } from "@/services/modeloAvionService";

export async function GET(request, { params }) {
  try {
    const caracteristicas = await modeloAvionService.getCaracteristicas(
      params.id,
    );
    return NextResponse.json(caracteristicas);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener las características del modelo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
