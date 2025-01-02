// app/dashboard/inventario/page.jsx
"use client";

import { useInventarioStats } from "@/hooks/useInventarioStats";
import Link from "next/link";
import {
  CircleStackIcon,
  Square3Stack3DIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function InventarioPage() {
  const { materiaPrima, sedes, movimientos, isLoading } = useInventarioStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Gestión de Inventario
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Control y seguimiento de materias primas, stock y movimientos
        </p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Materia Prima */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CircleStackIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                Materia Prima
              </h3>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {materiaPrima.total}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-red-500">Crítico</p>
              <p className="text-lg font-medium text-red-600">
                {materiaPrima.stockCritico}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-yellow-500">Bajo</p>
              <p className="text-lg font-medium text-yellow-600">
                {materiaPrima.stockBajo}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-500">Normal</p>
              <p className="text-lg font-medium text-green-600">
                {materiaPrima.stockNormal}
              </p>
            </div>
          </div>
        </div>

        {/* Card de Sedes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Square3Stack3DIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Sedes</h3>
              <p className="text-sm text-gray-500">
                {sedes.conInventario} de {sedes.total} con inventario
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    Ocupación
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {sedes.porcentajeOcupacion}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${sedes.porcentajeOcupacion}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Movimientos */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ArrowPathIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Movimientos</h3>
              <p className="text-sm text-gray-500">
                {movimientos.pendientes} solicitudes pendientes
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Último mes</p>
              <p className="text-lg font-medium text-gray-900">
                {movimientos.ultimoMes} movimientos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/dashboard/inventario/materia-prima"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <CircleStackIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Materia Prima</span>
        </Link>

        <Link
          href="/dashboard/inventario/stock"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <Square3Stack3DIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Control de Stock</span>
        </Link>
      </div>
    </div>
  );
}
