import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET() {
  try {
    const piezas = await piezaService.getAll();
    return NextResponse.json(piezas);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener las piezas",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const pieza = await request.json();
    const nuevaPieza = await piezaService.create(pieza);
    return NextResponse.json(nuevaPieza, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear la pieza",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
