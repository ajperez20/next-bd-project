import { NextResponse } from "next/server";
import { clienteJuridicoService } from "@/services/clienteJuridicoService";

export async function GET() {
  try {
    const clientes = await clienteJuridicoService.getAll();
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los clientes jurídicos",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const cliente = await request.json();
    const nuevoCliente = await clienteJuridicoService.create(cliente);
    return NextResponse.json(nuevoCliente, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el cliente jurídico",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
