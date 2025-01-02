import { NextResponse } from "next/server";
import { sedeService } from "@/services/sedeService";

export async function GET() {
  try {
    const sedes = await sedeService.getAll();
    return NextResponse.json(sedes);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const sede = await sedeService.create(data);
    return NextResponse.json(sede, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
