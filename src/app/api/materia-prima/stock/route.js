import { NextResponse } from "next/server";
import { materiaPrimaStockService } from "@/services/materiaPrimaStockService";

export async function GET() {
  try {
    const stock = await materiaPrimaStockService.getAll();
    return NextResponse.json(stock);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener stock de materias primas",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const stock = await materiaPrimaStockService.create(data);
    return NextResponse.json(stock, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear stock",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
