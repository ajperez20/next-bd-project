import { useState, useEffect } from "react";

export const useZonasStats = () => {
  const [stats, setStats] = useState({
    general: {
      total: 0,
      enUso: 0,
    },
    distribucion: {
      porArea: {
        labels: [],
        data: [],
      },
      porSede: {
        labels: [],
        data: [],
      },
    },
    actividadReciente: {
      nuevas: 0,
      modificadas: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/zonas");
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
