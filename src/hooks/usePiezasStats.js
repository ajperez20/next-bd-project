import { useState, useEffect } from "react";

export const usePiezasStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    porTipo: [],
    conCaracteristicas: 0,
    conMateriales: 0,
    conProcesos: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/piezas");
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
          error: error.message || "Error al cargar estadísticas de piezas",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
