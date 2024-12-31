import { NextResponse } from "next/server";
import { cargoService } from "@/services/cargoService";

export async function GET(request, { params }) {
  try {
    const cargo = await cargoService.getById(params.id);
    if (!cargo) {
      return NextResponse.json(
        {
          error: {
            status: 404,
            message: "Cargo no encontrado",
          },
        },
        { status: 404 },
      );
    }
    return NextResponse.json(cargo);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el cargo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const cargo = await request.json();
    const updatedCargo = await cargoService.update(params.id, cargo);
    return NextResponse.json(updatedCargo);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el cargo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await cargoService.delete(params.id);
    return NextResponse.json({ message: "Cargo eliminado exitosamente" });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el cargo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
