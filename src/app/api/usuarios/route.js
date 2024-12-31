import { NextResponse } from "next/server";
import { usuarioService } from "@/services/usuarioService";

export async function GET() {
  try {
    const usuarios = await usuarioService.getAll();
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los usuarios",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const usuario = await request.json();
    const nuevoUsuario = await usuarioService.create(usuario);
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el usuario",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
