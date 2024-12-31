import { NextResponse } from "next/server";
import { piezaService } from "@/services/piezaService";

export async function GET(request, { params }) {
  try {
    const pieza = await piezaService.getById(params.id);
    if (!pieza) {
      return NextResponse.json(
        { error: "Pieza no encontrada" },
        { status: 404 },
      );
    }

    // Obtener datos adicionales
    const [caracteristicas, materiales] = await Promise.all([
      piezaService.getCaracteristicas(params.id),
      piezaService.getMateriales(params.id),
    ]);

    return NextResponse.json({
      ...pieza,
      caracteristicas,
      materiales,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener la pieza",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const pieza = await request.json();
    const piezaActualizada = await piezaService.update(params.id, pieza);
    return NextResponse.json(piezaActualizada);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar la pieza",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const pieza = await piezaService.delete(params.id);
    if (!pieza) {
      return NextResponse.json(
        { error: "Pieza no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Pieza eliminada exitosamente" });
  } catch (error) {
    if (error.code === "23503") {
      return NextResponse.json(
        {
          error: {
            status: 400,
            message: "No se puede eliminar la pieza porque está en uso",
            details: "Esta pieza está siendo utilizada en procesos o ensambles",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar la pieza",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
