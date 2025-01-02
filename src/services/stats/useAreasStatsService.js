import pool from "@/config/database";

export const areasStatsService = {
  getStats: async () => {
    const client = await pool.connect();
    try {
      // Estadísticas generales
      const generalQuery = `
        SELECT 
          COUNT(*) as total,
          COUNT(DISTINCT a.are_id) FILTER (WHERE EXISTS (
            SELECT 1 FROM zona z WHERE z.fk_are_id = a.are_id
          )) as activas
        FROM area a
      `;

      // Distribución
      const distribucionQuery = `
        SELECT 
          COUNT(*) FILTER (WHERE EXISTS (
            SELECT 1 FROM zona z WHERE z.fk_are_id = a.are_id
          )) as con_zonas,
          COUNT(*) FILTER (WHERE NOT EXISTS (
            SELECT 1 FROM zona z WHERE z.fk_are_id = a.are_id
          )) as sin_zonas,
          ROUND(
            (COUNT(*) FILTER (WHERE EXISTS (
              SELECT 1 FROM zona z WHERE z.fk_are_id = a.are_id
            )) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 2
          ) as porcentaje_ocupacion
        FROM area a
      `;

      // Áreas por sede
      const porSedeQuery = `
        SELECT 
          s.sed_nombre,
          COUNT(a.are_id) as cantidad
        FROM sede_planta s
        LEFT JOIN area a ON a.fk_sed_id = s.sed_id
        GROUP BY s.sed_id, s.sed_nombre
        ORDER BY cantidad DESC
      `;

      const [generalResult, distribucionResult, porSedeResult] =
        await Promise.all([
          client.query(generalQuery),
          client.query(distribucionQuery),
          client.query(porSedeQuery),
        ]);

      return {
        general: {
          total: parseInt(generalResult.rows[0].total),
          activas: parseInt(generalResult.rows[0].activas),
        },
        distribucion: {
          conZonas: parseInt(distribucionResult.rows[0].con_zonas),
          sinZonas: parseInt(distribucionResult.rows[0].sin_zonas),
          porcentajeOcupacion: parseFloat(
            distribucionResult.rows[0].porcentaje_ocupacion,
          ),
        },
        porSede: {
          labels: porSedeResult.rows.map((row) => row.sed_nombre),
          data: porSedeResult.rows.map((row) => parseInt(row.cantidad)),
        },
      };
    } finally {
      client.release();
    }
  },
};
