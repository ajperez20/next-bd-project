import { NextResponse } from "next/server";
import { zonasStatsService } from "@/services/stats/useZonasStatsService";

export async function GET() {
  try {
    const stats = await zonasStatsService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de zonas",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
