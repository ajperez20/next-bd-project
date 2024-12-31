import { NextResponse } from "next/server";
import { useEmpleadosStatsService } from "@/services/stats/useEmpleadosStatsService";

export async function GET() {
  try {
    const stats = await useEmpleadosStatsService.getEmpleadosStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.log("Error al obtener estadísticas de empleados", error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener estadísticas de empleados",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
