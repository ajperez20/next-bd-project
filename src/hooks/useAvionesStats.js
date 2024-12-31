import { useState, useEffect } from "react";

export const useAvionesStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    porModelo: [],
    enProceso: 0,
    completados: 0,
    pruebas: {
      pendientes: 0,
      completadas: 0,
      enProceso: 0,
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/aviones");
        if (!response.ok) throw new Error("Error al obtener estadísticas");
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
          error: error.message || "Error al cargar estadísticas de aviones",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
