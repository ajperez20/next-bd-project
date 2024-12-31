import { NextResponse } from "next/server";
import { avionService } from "@/services/avionService";

export async function GET() {
  try {
    const tiposAvion = await avionService.getAll();
    return NextResponse.json(tiposAvion);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los tipos de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const tipoAvion = await request.json();
    const nuevoTipoAvion = await avionService.create(tipoAvion);
    return NextResponse.json(nuevoTipoAvion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el tipo de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
