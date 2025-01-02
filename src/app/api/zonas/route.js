import { NextResponse } from "next/server";
import { zonaService } from "@/services/zonaService";

export async function GET() {
  try {
    const zonas = await zonaService.getAll();
    return NextResponse.json(zonas);
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
    const zona = await zonaService.create(data);
    return NextResponse.json(zona, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
