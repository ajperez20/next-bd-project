import { NextResponse } from "next/server";
import { authService } from "@/services/authService";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await authService.login(email, password);

    if (user) {
      return NextResponse.json({
        success: true,
        user,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          status: 401,
          message: "Credenciales inválidas",
        },
      },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          status: 500,
          message: "Error en el servidor",
          details: error.message,
        },
      },
      { status: 500 },
    );
  }
}
