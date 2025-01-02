import pool from "@/config/database";

export const zonasStatsService = {
  getStats: async () => {
    const client = await pool.connect();
    try {
      // Estadísticas generales
      const generalQuery = `
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE EXISTS (
            SELECT 1 
            FROM equipo_encargado eq 
            WHERE eq.fk_zon_id = z.zon_id
          )) as en_uso
        FROM zona z
      `;

      // Distribución por área
      const porAreaQuery = `
        SELECT 
          a.are_nombre,
          COUNT(z.zon_id) as cantidad
        FROM area a
        LEFT JOIN zona z ON z.fk_are_id = a.are_id
        GROUP BY a.are_id, a.are_nombre
        ORDER BY cantidad DESC
      `;

      // Distribución por sede
      const porSedeQuery = `
        SELECT 
          s.sed_nombre,
          COUNT(z.zon_id) as cantidad
        FROM sede_planta s
        LEFT JOIN area a ON a.fk_sed_id = s.sed_id
        LEFT JOIN zona z ON z.fk_are_id = a.are_id
        GROUP BY s.sed_id, s.sed_nombre
        ORDER BY cantidad DESC
      `;

      // Actividad reciente (últimos 30 días)
      const actividadQuery = `
        SELECT 
          COUNT(*) FILTER (
            WHERE z.zon_id > (SELECT COALESCE(MAX(zon_id) - 10, 0) FROM zona)
          ) as nuevas,
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 
              FROM equipo_encargado eq 
              WHERE eq.fk_zon_id = z.zon_id
              AND eq.eqc_id > (SELECT COALESCE(MAX(eqc_id) - 10, 0) FROM equipo_encargado)
            )
          ) as modificadas
        FROM zona z
      `;

      const [generalResult, porAreaResult, porSedeResult, actividadResult] =
        await Promise.all([
          client.query(generalQuery),
          client.query(porAreaQuery),
          client.query(porSedeQuery),
          client.query(actividadQuery),
        ]);

      return {
        general: {
          total: parseInt(generalResult.rows[0].total),
          enUso: parseInt(generalResult.rows[0].en_uso),
        },
        distribucion: {
          porArea: {
            labels: porAreaResult.rows.map((row) => row.are_nombre),
            data: porAreaResult.rows.map((row) => parseInt(row.cantidad)),
          },
          porSede: {
            labels: porSedeResult.rows.map((row) => row.sed_nombre),
            data: porSedeResult.rows.map((row) => parseInt(row.cantidad)),
          },
        },
        actividadReciente: {
          nuevas: parseInt(actividadResult.rows[0].nuevas),
          modificadas: parseInt(actividadResult.rows[0].modificadas),
        },
      };
    } finally {
      client.release();
    }
  },
};
