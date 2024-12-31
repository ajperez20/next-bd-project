import { NextResponse } from "next/server";
import { materiaPrimaService } from "@/services/materiaPrimaService";

export async function GET() {
  try {
    const materiaPrima = await materiaPrimaService.getAll();
    return NextResponse.json(materiaPrima);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener la materia prima",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
