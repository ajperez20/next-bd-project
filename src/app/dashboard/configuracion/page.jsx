"use client";

import Link from "next/link";
import {
  PaperAirplaneIcon,
  CubeIcon,
  WrenchIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const configModules = [
  {
    title: "Tipos de Avión",
    description: "Gestión de categorías y tipos de aeronaves",
    href: "/dashboard/configuracion/tipos-avion",
    icon: PaperAirplaneIcon,
    color: "blue",
  },
  {
    title: "Modelos de Avión",
    description: "Configuración de modelos específicos",
    href: "/dashboard/configuracion/modelos-avion",
    icon: Cog6ToothIcon,
    color: "indigo",
  },
  {
    title: "Piezas y Componentes",
    description: "Gestión de partes y componentes",
    href: "/dashboard/configuracion/piezas",
    icon: CubeIcon,
    color: "purple",
  },
  {
    title: "Procesos de Ensamblaje",
    description: "Configuración de procesos de producción",
    href: "/dashboard/configuracion/procesos",
    icon: WrenchIcon,
    color: "green",
  },
];

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
        <p className="mt-2 text-sm text-gray-600">
          Gestión de configuraciones del sistema de producción
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {configModules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${module.color}-100`}>
                <module.icon className={`h-6 w-6 text-${module.color}-600`} />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {module.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {module.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
