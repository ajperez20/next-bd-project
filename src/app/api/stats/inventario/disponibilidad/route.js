import { NextResponse } from "next/server";
import { useInventarioStatsService } from "@/services/stats/useInventarioStatsService";

export async function GET() {
  try {
    const disponibilidad = await useInventarioStatsService.getDisponibilidad();
    return NextResponse.json(disponibilidad);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener disponibilidad de inventario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
