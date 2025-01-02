import { NextResponse } from "next/server";
import { useInventarioStatsService } from "@/services/stats/useInventarioStatsService";

export async function GET() {
  try {
    const movimientos = await useInventarioStatsService.getMovimientos();
    return NextResponse.json(movimientos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener movimientos de inventario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
