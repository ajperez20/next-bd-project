import { NextResponse } from "next/server";
import { lugarService } from "@/services/lugarService";

export async function GET() {
  try {
    const lugares = await lugarService.getAll();
    return NextResponse.json(lugares);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los lugares",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const lugar = await request.json();
    const newLugar = await lugarService.create(lugar);
    return NextResponse.json(newLugar, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el lugar",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
