// src/app/dashboard/page.jsx
"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import {
  UsersIcon,
  UserIcon,
  TruckIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/16/solid";

export default function DashboardPage() {
  const {
    empleados,
    clientes,
    proveedores,
    produccion,
    solicitudes,
    isLoading,
    error,
  } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-red-50 border border-red-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Empleados",
      total: empleados.total,
      nuevos: empleados.nuevos,
      icon: UsersIcon,
      color: "blue",
    },
    {
      title: "Clientes",
      total: clientes.total,
      nuevos: clientes.nuevos,
      icon: UserIcon,
      color: "indigo",
      details: [
        { label: "Naturales", value: clientes.naturales },
        { label: "Jurídicos", value: clientes.juridicos },
      ],
    },
    {
      title: "Proveedores",
      total: proveedores.total,
      nuevos: proveedores.nuevos,
      icon: TruckIcon,
      color: "purple",
    },
  ];

  const produccionCards = [
    {
      title: "Aviones",
      total: produccion.aviones.total,
      nuevos: produccion.aviones.nuevos,
      extra: {
        label: "En Proceso",
        value: produccion.aviones.enProceso,
      },
      icon: CubeIcon,
      color: "green",
    },
    {
      title: "Piezas",
      total: produccion.piezas.total,
      nuevos: produccion.piezas.nuevas,
      icon: WrenchScrewdriverIcon,
      color: "yellow",
    },
  ];

  const solicitudesCards = [
    {
      title: "Solicitudes de Clientes",
      total: solicitudes.clientes.total,
      nuevos: solicitudes.clientes.nuevas,
      icon: ClipboardDocumentListIcon,
      color: "pink",
    },
    {
      title: "Solicitudes de Proveedores",
      total: solicitudes.proveedores.total,
      nuevos: solicitudes.proveedores.nuevas,
      icon: DocumentTextIcon,
      color: "orange",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          Dashboard
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Vista general del sistema y estadísticas principales
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Producción */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Producción</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {produccionCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* Solicitudes */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Solicitudes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solicitudesCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, total, nuevos, icon: Icon, color, details, extra }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    pink: "bg-pink-50 text-pink-700",
    orange: "bg-orange-50 text-orange-700",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    pink: "text-pink-600",
    orange: "text-orange-600",
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500">Vista general</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-3xl font-semibold text-gray-900">{total}</div>
          <div className="flex items-center mt-2">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">{nuevos} nuevos</span>
            <span className="text-sm text-gray-500 ml-1">este mes</span>
          </div>
        </div>

        {details && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between items-center mt-2"
              >
                <span className="text-sm text-gray-500">{detail.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {extra && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{extra.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {extra.value}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
