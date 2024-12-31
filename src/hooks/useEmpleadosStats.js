import { useState, useEffect } from "react";

export const useEmpleadosStats = () => {
  const [stats, setStats] = useState({
    general: {
      total: 0,
      nuevos: 0,
      porcentajeNuevos: 0,
    },
    experiencia: {
      junior: 0,
      semiSenior: 0,
      senior: 0,
      promedio: 0,
    },
    distribucion: {
      porCargo: [],
      porUbicacion: [],
    },
    calificaciones: {
      conTitulo: 0,
      porcentajeConTitulo: 0,
    },
    beneficiarios: {
      conBeneficiarios: 0,
      porcentajeConBeneficiarios: 0,
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/empleados");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas de empleados");
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
          error: "Error al cargar estadísticas de empleados",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
