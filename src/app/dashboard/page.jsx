"use client";

import { useEmpleadosStats } from "@/hooks/useEmpleadosStats";
import { useClientesStats } from "@/hooks/useClientesStats";
import { usePiezasStats } from "@/hooks/usePiezasStats";
import { useAvionesStats } from "@/hooks/useAvionesStats";
import {
  UsersIcon,
  UserGroupIcon,
  CubeIcon,
  PaperAirplaneIcon,
  WrenchIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/16/solid";

export default function DashboardPage() {
  const empleadosStats = useEmpleadosStats();
  const clientesStats = useClientesStats();
  const piezasStats = usePiezasStats();
  const avionesStats = useAvionesStats();

  const mainStats = [
    {
      title: "Empleados",
      total: empleadosStats.general?.total || 0,
      nuevos: empleadosStats.general?.nuevos || 0,
      icon: UsersIcon,
      color: "blue",
      href: "/dashboard/rrhh/empleados",
      loading: empleadosStats.isLoading,
    },
    {
      title: "Clientes",
      total: clientesStats.totalClientes || 0,
      nuevos: clientesStats.nuevosClientes || 0,
      icon: UserGroupIcon,
      color: "indigo",
      href: "/dashboard/clientes",
      loading: clientesStats.isLoading,
      details: [
        {
          label: "Naturales",
          value: clientesStats.clientesNaturales || 0,
        },
        {
          label: "Jurídicos",
          value: clientesStats.clientesJuridicos || 0,
        },
      ],
    },
    {
      title: "Aviones",
      total: parseInt(avionesStats.total) || 0,
      nuevos: parseInt(avionesStats.completados) || 0,
      icon: PaperAirplaneIcon,
      color: "green",
      href: "/dashboard/produccion/aviones",
      loading: avionesStats.isLoading,
      details: [
        {
          label: "En Proceso",
          value: parseInt(avionesStats.en_proceso) || 0,
        },
        {
          label: "En Pruebas",
          value: avionesStats.pruebas?.en_proceso || 0,
        },
      ],
    },
    {
      title: "Piezas",
      total: piezasStats?.total || 0,
      icon: CubeIcon,
      color: "yellow",
      href: "/dashboard/configuracion/piezas",
      loading: piezasStats.isLoading,
      details: [
        {
          label: "Con Materiales",
          value: piezasStats?.con_materiales || 0,
        },
        {
          label: "Con Procesos",
          value: piezasStats?.con_procesos || 0,
        },
      ],
    },
  ];

  const quickAccess = [
    {
      name: "Producción",
      description: "Gestión de ensamblaje y pruebas",
      href: "/dashboard/produccion",
      icon: WrenchIcon,
      color: "blue",
    },
    {
      name: "Configuración",
      description: "Configuración de modelos y piezas",
      href: "/dashboard/configuracion",
      icon: CubeIcon,
      color: "indigo",
    },
    {
      name: "Sedes",
      description: "Gestión de plantas y áreas",
      href: "/dashboard/produccion/sedes",
      icon: BuildingOfficeIcon,
      color: "purple",
    },
    {
      name: "Reportes",
      description: "Informes y estadísticas",
      href: "/dashboard/reportes",
      icon: ChartBarIcon,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Vista general del sistema de producción
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {stat.title}
                  </h2>
                </div>
              </div>
              <div className="mt-4">
                {stat.loading ? (
                  <div className="animate-pulse h-9 bg-gray-200 rounded" />
                ) : (
                  <>
                    <div className="text-3xl font-semibold text-gray-900">
                      {stat.total}
                    </div>
                    {stat.nuevos && (
                      <div className="flex items-center mt-2">
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">
                          {stat.nuevos} nuevos
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              {stat.details && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {stat.details.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex justify-between items-center mt-2"
                    >
                      <span className="text-sm text-gray-500">
                        {detail.label}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Acceso Rápido
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {[empleadosStats, clientesStats, piezasStats, avionesStats].map(
        (stats, index) => {
          if (stats.error) {
            return (
              <div
                key={index}
                className="bg-red-50 border border-red-200 rounded-md p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error al cargar estadísticas
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {stats.error}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        },
      )}
    </div>
  );
}
