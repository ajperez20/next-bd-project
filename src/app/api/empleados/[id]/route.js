import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request, { params }) {
  try {
    const empleado = await employeeService.getById(params.id);

    if (!empleado) {
      return NextResponse.json(
        { error: true, message: "Empleado no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(empleado);
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Error al obtener el empleado",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
