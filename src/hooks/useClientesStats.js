import { useState, useEffect } from "react";

export const useClientesStats = () => {
  const [stats, setStats] = useState({
    totalClientes: 0,
    clientesNaturales: 0,
    clientesJuridicos: 0,
    nuevosClientes: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/clientes");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data = await response.json();

        setStats({
          totalClientes: data.total,
          clientesNaturales: data.naturales,
          clientesJuridicos: data.juridicos,
          nuevosClientes: data.nuevosTotal,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || "Error al cargar estadísticas de clientes",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
