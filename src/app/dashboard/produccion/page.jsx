"use client";

import { useAreasStats } from "@/hooks/useAreasStats";
import { useZonasStats } from "@/hooks/useZonasStats";
import Link from "next/link";
import {
  BuildingOfficeIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ProduccionPage() {
  const {
    general: areasGeneral,
    distribucion: areasDistribucion,
    porSede: areasPorSede,
    isLoading: isLoadingAreas,
  } = useAreasStats();

  const {
    general: zonasGeneral,
    distribucion: zonasDistribucion,
    actividadReciente: zonasActividad,
    isLoading: isLoadingZonas,
  } = useZonasStats();

  if (isLoadingAreas || isLoadingZonas) {
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
          Gestión de Producción
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Control y seguimiento de sedes, áreas y zonas de producción
        </p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Áreas */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Áreas</h3>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {areasGeneral.total}
                </span>
                <span className="text-sm text-green-600">
                  {areasGeneral.activas} activas
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Ocupación
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {areasDistribucion.porcentajeOcupacion}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${areasDistribucion.porcentajeOcupacion}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Zonas */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Zonas</h3>
              <p className="text-sm text-gray-500">
                {zonasGeneral.enUso} en uso de {zonasGeneral.total}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Nuevas</p>
              <p className="text-lg font-medium text-gray-900">
                {zonasActividad.nuevas}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Modificadas</p>
              <p className="text-lg font-medium text-gray-900">
                {zonasActividad.modificadas}
              </p>
            </div>
          </div>
        </div>

        {/* Card de Distribución */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Distribución por Sede
              </h3>
              <p className="text-sm text-gray-500">
                {areasPorSede.labels.length} sedes activas
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="space-y-2">
              {areasPorSede.labels.slice(0, 3).map((sede, index) => (
                <div key={sede} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{sede}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {areasPorSede.data[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/dashboard/produccion/sedes"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Gestionar Sedes</span>
        </Link>

        <Link
          href="/dashboard/produccion/areas-zonas"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <CubeIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Áreas y Zonas</span>
        </Link>

        <Link
          href="/dashboard/produccion/asignaciones"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <WrenchScrewdriverIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Asignaciones</span>
        </Link>
      </div>
    </div>
  );
}
