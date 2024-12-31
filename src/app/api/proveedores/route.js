import { NextResponse } from "next/server";
import { proveedorService } from "@/services/proveedorService";

export async function GET() {
  try {
    const proveedores = await proveedorService.getAll();
    return NextResponse.json(proveedores);
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al obtener los proveedores",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const proveedor = await request.json();
    const newProveedor = await proveedorService.create(proveedor);
    return NextResponse.json(newProveedor, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: {
          status: 500,
          message: "Error al crear el proveedor",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
