import { NextResponse } from "next/server";
import { materiaPrimaService } from "@/services/materiaPrimaService";

export async function GET(request, { params }) {
  try {
    const materiaPrima = await materiaPrimaService.getById(params.id);
    if (!materiaPrima) {
      return NextResponse.json(
        { error: { message: "Materia prima no encontrada" } },
        { status: 404 },
      );
    }
    return NextResponse.json(materiaPrima);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener materia prima",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const materiaPrima = await materiaPrimaService.update(params.id, data);
    return NextResponse.json(materiaPrima);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar materia prima",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await materiaPrimaService.delete(params.id);
    return NextResponse.json({
      message: "Materia prima eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar materia prima",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
