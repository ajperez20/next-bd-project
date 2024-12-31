import { NextResponse } from "next/server";
import { usePiezasStatsService } from "@/services/stats/usePiezasStatsService";

export async function GET() {
  try {
    const stats = await usePiezasStatsService.getPiezasStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de piezas",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
