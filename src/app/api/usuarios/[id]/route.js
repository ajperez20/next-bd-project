import { NextResponse } from "next/server";
import { usuarioService } from "@/services/usuarioService";

export async function GET(request, { params }) {
  try {
    const usuario = await usuarioService.getById(params.id);
    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el usuario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const usuario = await request.json();
    const usuarioActualizado = await usuarioService.update(params.id, usuario);
    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el usuario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await usuarioService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el usuario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
