import { NextResponse } from "next/server";
import { proveedorService } from "@/services/proveedorService";

export async function GET(request, { params }) {
  try {
    const proveedor = await proveedorService.getById(params.id);
    return NextResponse.json(proveedor);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el proveedor",
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
    const proveedor = await proveedorService.update(params.id, data);
    return NextResponse.json(proveedor);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el proveedor",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await proveedorService.delete(params.id);
    return NextResponse.json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el proveedor",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
