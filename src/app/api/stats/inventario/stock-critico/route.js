import { NextResponse } from "next/server";
import { useInventarioStatsService } from "@/services/stats/useInventarioStatsService";

export async function GET() {
  try {
    const stockCritico = await useInventarioStatsService.getStockCritico();
    return NextResponse.json(stockCritico);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener stock crítico",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
