import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request, { params }) {
  try {
    const titulos = await employeeService.getTitulos(params.id);
    return NextResponse.json(titulos);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los títulos",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
