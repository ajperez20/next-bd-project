import { useState, useEffect } from "react";

export const useInventarioStats = () => {
  const [stats, setStats] = useState({
    materiaPrima: {
      total: 0,
      stockCritico: 0,
      stockBajo: 0,
      stockNormal: 0,
    },
    sedes: {
      total: 0,
      conInventario: 0,
      porcentajeOcupacion: 0,
    },
    movimientos: {
      pendientes: 0,
      ultimoMes: 0,
      ultimosMovimientos: [],
    },
    stockCritico: [],
    disponibilidad: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          generalResponse,
          stockCriticoResponse,
          movimientosResponse,
          disponibilidadResponse,
        ] = await Promise.all([
          fetch("/api/stats/inventario"),
          fetch("/api/stats/inventario/stock-critico"),
          fetch("/api/stats/inventario/movimientos"),
          fetch("/api/stats/inventario/disponibilidad"),
        ]);

        if (
          !generalResponse.ok ||
          !stockCriticoResponse.ok ||
          !movimientosResponse.ok ||
          !disponibilidadResponse.ok
        ) {
          throw new Error("Error al cargar estadísticas");
        }

        const [
          generalData,
          stockCriticoData,
          movimientosData,
          disponibilidadData,
        ] = await Promise.all([
          generalResponse.json(),
          stockCriticoResponse.json(),
          movimientosResponse.json(),
          disponibilidadResponse.json(),
        ]);

        setStats({
          materiaPrima: generalData.materiaPrima,
          sedes: generalData.sedes,
          movimientos: {
            ...generalData.movimientos,
            ultimosMovimientos: movimientosData,
          },
          stockCritico: stockCriticoData.map((item) => ({
            id: item.id,
            nombre: item.rpm_nombre,
            cantidad: item.mps_cantidad_disponible,
            sede: item.sed_nombre,
            unidadMedida: item.mps_unidad_medida,
            estado: determinarEstado(item.mps_cantidad_disponible),
          })),
          disponibilidad: disponibilidadData.map((item) => ({
            sede: item.sede,
            totalMateriales: item.total_materiales,
            materialesDisponibles: item.materiales_disponibles,
            porcentajeDisponibilidad: item.porcentaje_disponibilidad,
          })),
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const determinarEstado = (cantidad) => {
    if (cantidad <= 5) return "CRÍTICO";
    if (cantidad <= 10) return "BAJO";
    return "NORMAL";
  };

  return {
    ...stats,
    isLoading,
    // Métodos auxiliares para filtrar datos
    getStockCriticoPorSede: (sedeId) => {
      return stats.stockCritico.filter((item) => item.sedeId === sedeId);
    },
    getDisponibilidadPorSede: (sedeId) => {
      return stats.disponibilidad.find((item) => item.sedeId === sedeId);
    },
    getUltimosMovimientos: (limit = 5) => {
      return stats.movimientos.ultimosMovimientos.slice(0, limit);
    },
  };
};
