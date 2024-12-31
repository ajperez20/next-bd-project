"use client";

import { useEmpleadosStats } from "@/hooks/useEmpleadosStats";
import Link from "next/link";
import {
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function RRHHPage() {
  const { general, experiencia, calificaciones, beneficiarios, isLoading } =
    useEmpleadosStats();

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
          Recursos Humanos
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Gestión de personal y recursos humanos
        </p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Empleados */}
        <Link
          href="/dashboard/rrhh/empleados"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Empleados</h3>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-2xl font-semibold text-gray-900">
                  {general.total}
                </span>
                <span className="text-sm text-green-600">
                  +{general.nuevos} nuevos
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Card de Experiencia */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Experiencia</h3>
              <p className="text-sm text-gray-500">
                Promedio: {experiencia.promedio} años
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Junior</p>
              <p className="text-lg font-medium text-gray-900">
                {experiencia.junior}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Semi-Sr</p>
              <p className="text-lg font-medium text-gray-900">
                {experiencia.semiSenior}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Senior</p>
              <p className="text-lg font-medium text-gray-900">
                {experiencia.senior}
              </p>
            </div>
          </div>
        </div>

        {/* Card de Beneficiarios */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Beneficiarios
              </h3>
              <p className="text-sm text-gray-500">
                {beneficiarios.conBeneficiarios} empleados registrados
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Cobertura
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {beneficiarios.porcentajeConBeneficiarios}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{
                    width: `${beneficiarios.porcentajeConBeneficiarios}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/dashboard/rrhh/cargos"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <AcademicCapIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Gestionar Cargos</span>
        </Link>

        <Link
          href="/dashboard/rrhh/horarios"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <ClockIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Horarios</span>
        </Link>

        <Link
          href="/dashboard/rrhh/asistencia"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <ChartBarIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Control de Asistencia</span>
        </Link>

        <Link
          href="/dashboard/rrhh/nomina"
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <UsersIcon className="h-6 w-6 text-gray-400 mr-3" />
          <span className="text-gray-700">Nómina</span>
        </Link>
      </div>
    </div>
  );
}
