import { NextResponse } from "next/server";
import { sedeService } from "@/services/sedeService";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const sede = await sedeService.update(params.id, data);
    return NextResponse.json(sede);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await sedeService.delete(params.id);
    return NextResponse.json({ message: "Sede eliminada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
