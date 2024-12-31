import { NextResponse } from "next/server";
import { employeeService } from "@/services/employeeService";

export async function GET(request, { params }) {
  try {
    const beneficiarios = await employeeService.getBeneficiarios(params.id);
    return NextResponse.json(beneficiarios);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los beneficiarios",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
