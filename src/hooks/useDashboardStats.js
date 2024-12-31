import { useState, useEffect } from "react";

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    empleados: { total: 0, nuevos: 0 },
    clientes: { total: 0, nuevos: 0, naturales: 0, juridicos: 0 },
    proveedores: { total: 0, nuevos: 0 },
    produccion: {
      aviones: { total: 0, nuevos: 0, enProceso: 0 },
      piezas: { total: 0, nuevas: 0 },
    },
    solicitudes: {
      clientes: { total: 0, nuevas: 0 },
      proveedores: { total: 0, nuevas: 0 },
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/dashboard");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas del dashboard");
        }

        const data = await response.json();

        setStats({
          ...data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || "Error al cargar estadísticas del dashboard",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
