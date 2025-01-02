import { NextResponse } from "next/server";
import { materiaPrimaStockService } from "@/services/materiaPrimaStockService";

export async function GET(request, { params }) {
  try {
    const stock = await materiaPrimaStockService.getById(params.id);
    if (!stock) {
      return NextResponse.json(
        { error: { message: "Stock no encontrado" } },
        { status: 404 },
      );
    }
    return NextResponse.json(stock);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener stock",
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
    const stock = await materiaPrimaStockService.update(params.id, data);
    return NextResponse.json(stock);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar stock",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await materiaPrimaStockService.delete(params.id);
    return NextResponse.json({ message: "Stock eliminado correctamente" });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar stock",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
