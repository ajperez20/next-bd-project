import { NextResponse } from "next/server";
import { clienteNaturalService } from "@/services/clienteNaturalService";

export async function GET() {
  try {
    const clientes = await clienteNaturalService.getAll();
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los clientes naturales",
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
    const nuevoCliente = await clienteNaturalService.create(cliente);
    return NextResponse.json(nuevoCliente, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el cliente natural",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
