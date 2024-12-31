import { NextResponse } from "next/server";
import { modeloAvionService } from "@/services/modeloAvionService";

export async function GET(request, { params }) {
  try {
    const modelo = await modeloAvionService.getById(params.id);
    if (!modelo) {
      return NextResponse.json(
        { error: "Modelo no encontrado" },
        { status: 404 },
      );
    }

    // Obtener características del modelo
    const caracteristicas = await modeloAvionService.getCaracteristicas(
      params.id,
    );
    return NextResponse.json({ ...modelo, caracteristicas });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el modelo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const modelo = await request.json();
    const modeloActualizado = await modeloAvionService.update(
      params.id,
      modelo,
    );
    return NextResponse.json(modeloActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el modelo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const modelo = await modeloAvionService.delete(params.id);
    if (!modelo) {
      return NextResponse.json(
        { error: "Modelo no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Modelo eliminado exitosamente" });
  } catch (error) {
    if (error.code === "23503") {
      return NextResponse.json(
        {
          error: {
            status: 400,
            message:
              "No se puede eliminar el modelo porque tiene registros asociados",
            details: "El modelo está siendo utilizado en procesos o pruebas",
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el modelo",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
