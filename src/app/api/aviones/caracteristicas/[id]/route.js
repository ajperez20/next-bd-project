import { NextResponse } from "next/server";
import { caracteristicasAvionService } from "@/services/caracteristicasAvionService";

export async function GET(request, { params }) {
  try {
    const caracteristica = await caracteristicasAvionService.getById(params.id);
    if (!caracteristica) {
      return NextResponse.json(
        { error: "Característica no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json(caracteristica);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener la característica",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const caracteristica = await request.json();
    const caracteristicaActualizada = await caracteristicasAvionService.update(
      params.id,
      caracteristica,
    );
    if (!caracteristicaActualizada) {
      return NextResponse.json(
        { error: "Característica no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json(caracteristicaActualizada);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar la característica",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const caracteristica = await caracteristicasAvionService.delete(params.id);
    if (!caracteristica) {
      return NextResponse.json(
        { error: "Característica no encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: "Característica eliminada exitosamente",
    });
  } catch (error) {
    // Si el error es por violación de llave foránea
    if (error.code === "23503") {
      return NextResponse.json(
        {
          error: {
            status: 400,
            message:
              "No se puede eliminar la característica porque está en uso",
            details:
              "Esta característica está asociada a uno o más modelos de avión",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar la característica",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
