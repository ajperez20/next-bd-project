import { NextResponse } from "next/server";
import { areaService } from "@/services/areaService";

export async function GET(request, { params }) {
  try {
    const area = await areaService.getById(params.id);
    if (!area) {
      return NextResponse.json(
        { error: { message: "Área no encontrada" } },
        { status: 404 },
      );
    }
    return NextResponse.json(area);
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
    const area = await areaService.update(params.id, data);
    return NextResponse.json(area);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await areaService.delete(params.id);
    return NextResponse.json({ message: "Área eliminada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
