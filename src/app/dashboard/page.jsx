"use client";

import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  CubeIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  ClockIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    empleados: 0,
    aviones: 0,
    proveedores: 0,
    piezas: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Aquí irían tus llamadas a la API para obtener estadísticas reales
    // Por ahora usamos datos de ejemplo
    setStats({
      empleados: 150,
      aviones: 24,
      proveedores: 35,
      piezas: 1240,
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Título del Dashboard */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Panel de Control
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Empleados"
          value={stats.empleados}
          icon={<UserGroupIcon className="h-6 w-6" />}
          change={+5}
          color="blue"
        />
        <StatCard
          title="Aviones en Producción"
          value={stats.aviones}
          icon={<CubeIcon className="h-6 w-6" />}
          change={+2}
          color="green"
        />
        <StatCard
          title="Proveedores Activos"
          value={stats.proveedores}
          icon={<TruckIcon className="h-6 w-6" />}
          change={-1}
          color="purple"
        />
        <StatCard
          title="Piezas en Inventario"
          value={stats.piezas}
          icon={<WrenchScrewdriverIcon className="h-6 w-6" />}
          change={+150}
          color="yellow"
        />
      </div>

      {/* Sección de Actividad Reciente y KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {actividadesRecientes.map((actividad, index) => (
              <ActivityItem key={index} {...actividad} />
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Indicadores Clave
          </h3>
          <div className="space-y-4">
            {kpis.map((kpi, index) => (
              <KPIItem key={index} {...kpi} />
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Tiempo Promedio de Producción"
          value="45 días"
          description="Por avión"
          icon={<ClockIcon className="h-6 w-6 text-blue-600" />}
        />
        <MetricCard
          title="Ingresos Mensuales"
          value="$2.4M"
          description="+12% vs mes anterior"
          icon={<BanknotesIcon className="h-6 w-6 text-green-600" />}
        />
        <MetricCard
          title="Eficiencia de Planta"
          value="94%"
          description="Capacidad utilizada"
          icon={<ChartBarIcon className="h-6 w-6 text-purple-600" />}
        />
        <MetricCard
          title="Sedes Activas"
          value="5"
          description="En 3 países"
          icon={<BuildingOfficeIcon className="h-6 w-6 text-yellow-600" />}
        />
      </div>
    </div>
  );
}

// Componentes auxiliares
function StatCard({ title, value, icon, change, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className={`${colors[color]} p-3 rounded-full`}>{icon}</div>
        <span
          className={`text-sm font-medium ${change > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-4">
        {value.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}

function ActivityItem({ title, time, description, icon: Icon, color }) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-full ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-500">{time}</p>
          <span className="text-xs text-gray-500">•</span>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function KPIItem({ label, value, change }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="font-medium">{value}</span>
        <span
          className={`text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>
    </div>
  );
}

function MetricCard({ title, value, description, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          30d
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{value}</h3>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}

// Datos de ejemplo
const actividadesRecientes = [
  {
    title: "Nuevo avión en producción",
    time: "Hace 2 horas",
    description: "Modelo AU-747Plus iniciado",
    icon: CubeIcon,
    color: "bg-blue-600",
  },
  {
    title: "Entrega completada",
    time: "Hace 5 horas",
    description: "Cliente: Aerolíneas Plus",
    icon: TruckIcon,
    color: "bg-green-600",
  },
  // Añade más actividades...
];

const kpis = [
  { label: "Tasa de Producción", value: "98%", change: 2.5 },
  { label: "Calidad", value: "99.9%", change: 0.7 },
  { label: "Entregas a Tiempo", value: "95%", change: -1.2 },
  // Añade más KPIs...
];
