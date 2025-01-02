import { NextResponse } from "next/server";
import { useInventarioStatsService } from "@/services/stats/useInventarioStatsService";

export async function GET() {
  try {
    const stats = await useInventarioStatsService.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de inventario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
