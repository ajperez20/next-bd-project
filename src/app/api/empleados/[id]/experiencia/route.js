import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request, { params }) {
  try {
    const experiencia = await employeeService.getExperiencia(params.id);
    return NextResponse.json(experiencia);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener la experiencia",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
