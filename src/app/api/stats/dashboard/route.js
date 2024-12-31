import { NextResponse } from "next/server";
import { useDashboardStatsService } from "@/services/stats/useDashboardStatsService";

export async function GET() {
  try {
    const stats = await useDashboardStatsService.getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas del dashboard",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
