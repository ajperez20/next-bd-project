import { NextResponse } from "next/server";
import { cargoService } from "@/services/cargoService";

export async function GET() {
  try {
    const cargos = await cargoService.getAll();
    return NextResponse.json(cargos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los cargos",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const cargo = await request.json();
    const newCargo = await cargoService.create(cargo);
    return NextResponse.json(newCargo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el cargo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
