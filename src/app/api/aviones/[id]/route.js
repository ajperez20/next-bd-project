import { NextResponse } from "next/server";
import { avionService } from "@/services/avionService";

export async function GET(request, { params }) {
  try {
    const tipoAvion = await avionService.getById(params.id);
    if (!tipoAvion) {
      return NextResponse.json(
        { error: "Tipo de avión no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(tipoAvion);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el tipo de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const tipoAvion = await request.json();
    const tipoAvionActualizado = await avionService.update(
      params.id,
      tipoAvion,
    );
    if (!tipoAvionActualizado) {
      return NextResponse.json(
        { error: "Tipo de avión no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(tipoAvionActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el tipo de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const tipoAvion = await avionService.delete(params.id);
    if (!tipoAvion) {
      return NextResponse.json(
        { error: "Tipo de avión no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: "Tipo de avión eliminado exitosamente",
    });
  } catch (error) {
    // Si el error es por violación de llave foránea
    if (error.code === "23503") {
      return NextResponse.json(
        {
          error: {
            status: 400,
            message:
              "No se puede eliminar el tipo de avión porque tiene registros asociados",
            details: "Elimine primero los modelos de avión asociados",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el tipo de avión",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
