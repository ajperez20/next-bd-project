import { NextResponse } from "next/server";
import { areasStatsService } from "@/services/stats/useAreasStatsService";

export async function GET() {
  try {
    const stats = await areasStatsService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de áreas",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
