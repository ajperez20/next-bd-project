import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET() {
  try {
    const procesos = await piezaService.getProcesosDisponibles();
    return NextResponse.json(procesos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los procesos",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
