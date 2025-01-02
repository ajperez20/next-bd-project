import { NextResponse } from "next/server";
import { zonaService } from "@/services/zonaService";

export async function GET(request, { params }) {
  try {
    const zona = await zonaService.getById(params.id);
    if (!zona) {
      return NextResponse.json(
        { error: { message: "Zona no encontrada" } },
        { status: 404 },
      );
    }
    return NextResponse.json(zona);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const zona = await zonaService.update(params.id, data);
    return NextResponse.json(zona);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await zonaService.delete(params.id);
    return NextResponse.json({ message: "Zona eliminada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
