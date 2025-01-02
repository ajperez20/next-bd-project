import { useState, useEffect } from "react";

export const useAreasStats = () => {
  const [stats, setStats] = useState({
    general: {
      total: 0,
      activas: 0,
    },
    distribucion: {
      conZonas: 0,
      sinZonas: 0,
      porcentajeOcupacion: 0,
    },
    porSede: {
      labels: [],
      data: [],
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/areas");
        if (!response.ok) throw new Error("Error al cargar estadísticas");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { ...stats, isLoading };
};
