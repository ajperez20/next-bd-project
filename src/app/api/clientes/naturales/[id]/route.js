import { NextResponse } from "next/server";
import { clienteNaturalService } from "@/services/clienteNaturalService";

export async function GET(request, { params }) {
  try {
    const cliente = await clienteNaturalService.getById(params.id);
    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener el cliente",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const cliente = await request.json();
    const clienteActualizado = await clienteNaturalService.update(
      params.id,
      cliente,
    );
    return NextResponse.json(clienteActualizado);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al actualizar el cliente",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await clienteNaturalService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al eliminar el cliente",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
