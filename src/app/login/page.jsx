"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo - Imagen/Logo */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center p-8">
        <div className="max-w-md text-white space-y-4">
          <h1 className="text-4xl font-bold">UcabAir</h1>
          <p className="text-xl text-blue-100">
            Sistema de Gestión de Producción de Aviones
          </p>
          <Link
            href="/login/about"
            className="inline-block mt-4 text-blue-100 hover:text-white hover:underline transition-colors"
          >
            Conoce más sobre nosotros →
          </Link>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Logo para móviles */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">UcabAir</h1>
          </div>

          {/* Contenido del formulario */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Bienvenido
              </h2>
              <p className="text-sm text-gray-500">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="ejemplo@ucabair.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              © 2024 UcabAir. Todos los derechos reservados.
            </p>
            <Link
              href="/login/about"
              className="text-sm text-blue-600 hover:text-blue-700 md:hidden"
            >
              Conoce más sobre nosotros →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
