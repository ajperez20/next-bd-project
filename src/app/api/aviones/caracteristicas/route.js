import { NextResponse } from "next/server";
import { caracteristicasAvionService } from "@/services/caracteristicasAvionService";

export async function GET() {
  try {
    const caracteristicas = await caracteristicasAvionService.getAll();
    return NextResponse.json(caracteristicas);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener las características",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const caracteristica = await request.json();
    const nuevaCaracteristica =
      await caracteristicasAvionService.create(caracteristica);
    return NextResponse.json(nuevaCaracteristica, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear la característica",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
