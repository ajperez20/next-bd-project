import { NextResponse } from "next/server";
import { modeloAvionService } from "@/services/modeloAvionService";

export async function GET() {
  try {
    const modelos = await modeloAvionService.getAll();
    return NextResponse.json(modelos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los modelos de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const modelo = await request.json();
    const nuevoModelo = await modeloAvionService.create(modelo);
    return NextResponse.json(nuevoModelo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el modelo de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
