import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request, { params }) {
  try {
    const empleado = await employeeService.getById(params.id);
    if (!empleado) {
      return NextResponse.json(
        {
          error: {
            status: 404,
            message: "Empleado no encontrado",
          },
        },
        { status: 404 },
      );
    }
    return NextResponse.json(empleado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el empleado",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const empleado = await request.json();
    const updatedEmpleado = await employeeService.update(params.id, empleado);
    return NextResponse.json(updatedEmpleado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el empleado",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await employeeService.delete(params.id);
    return NextResponse.json({ message: "Empleado eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el empleado",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
