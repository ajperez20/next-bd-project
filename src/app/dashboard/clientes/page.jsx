"use client";

import Link from "next/link";
import { useClientesStats } from "@/hooks/useClientesStats";
import {
  UserIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function ClientesPage() {
  const {
    totalClientes,
    clientesNaturales,
    clientesJuridicos,
    isLoading,
    error,
  } = useClientesStats();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Gestión de Clientes
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Administre los clientes naturales y jurídicos de la empresa
        </p>
      </div>

      {/* Tarjetas de navegación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de Clientes Naturales */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Clientes Naturales
                  </h2>
                  <p className="text-sm text-gray-500">
                    Gestione los clientes individuales
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {isLoading ? "..." : clientesNaturales} registros
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/dashboard/clientes/naturales"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Gestionar
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Registro de clientes individuales</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Clientes Jurídicos */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Clientes Jurídicos
                  </h2>
                  <p className="text-sm text-gray-500">
                    Gestione las empresas cliente
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                  {isLoading ? "..." : clientesJuridicos} registros
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/dashboard/clientes/juridicos"
                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gestionar
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Registro de empresas cliente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Total Clientes
              </h3>
              <p className="text-sm text-gray-500">Todos los registros</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-semibold text-gray-900">
              {isLoading ? "..." : totalClientes}
            </div>
            <div className="text-sm text-gray-600">Clientes registrados</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Clientes Naturales
              </h3>
              <p className="text-sm text-gray-500">Personas registradas</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-semibold text-gray-900">
              {isLoading ? "..." : clientesNaturales}
            </div>
            <div className="text-sm text-gray-600">Registros activos</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100">
              <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Clientes Jurídicos
              </h3>
              <p className="text-sm text-gray-500">Empresas registradas</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-semibold text-gray-900">
              {isLoading ? "..." : clientesJuridicos}
            </div>
            <div className="text-sm text-gray-600">Registros activos</div>
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
