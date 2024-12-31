import { NextResponse } from "next/server";
import { rolService } from "@/services/rolService";

export async function GET() {
  try {
    const roles = await rolService.getAll();
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los roles",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const rol = await request.json();
    const nuevoRol = await rolService.create(rol);
    return NextResponse.json(nuevoRol, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el rol",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
