import { NextResponse } from "next/server";
import { useClientesStatsService } from "@/services/stats/useClientesStatsService";

export async function GET() {
  try {
    const stats = await useClientesStatsService.getClientesStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de clientes",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
