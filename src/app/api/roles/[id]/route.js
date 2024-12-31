import { NextResponse } from "next/server";
import { rolService } from "@/services/rolService";

export async function GET(request, { params }) {
  try {
    const rol = await rolService.getById(params.id);
    if (!rol) {
      return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
    }
    return NextResponse.json(rol);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el rol",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const rol = await request.json();
    const rolActualizado = await rolService.update(params.id, rol);
    return NextResponse.json(rolActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el rol",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await rolService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el rol",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
