import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET() {
  try {
    const empleados = await employeeService.getAll();
    return NextResponse.json(empleados);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los empleados",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const empleado = await request.json();
    const newEmpleado = await employeeService.create(empleado);
    return NextResponse.json(newEmpleado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el empleado",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
