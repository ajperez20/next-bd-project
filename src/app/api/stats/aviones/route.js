import { NextResponse } from "next/server";
import { useAvionesStatsService } from "@/services/stats/useAvionesStatsService";

export async function GET() {
  try {
    const stats = await useAvionesStatsService.getAvionesStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de aviones",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
