import pool from "../../config/database";

export const useClientesStatsService = {
  getClientesStats: async () => {
    const query = `
      WITH stats AS (
        SELECT 
          (SELECT COUNT(*) FROM cliente_natural) as naturales,
          (SELECT COUNT(*) FROM cliente_juridico) as juridicos,
          (SELECT COUNT(*) FROM cliente_natural 
           WHERE ctn_fecha_ini_operaciones >= CURRENT_DATE - INTERVAL '30 days') as nuevos_naturales,
          (SELECT COUNT(*) FROM cliente_juridico 
           WHERE cjd_fecha_ini_operaciones >= CURRENT_DATE - INTERVAL '30 days') as nuevos_juridicos
      )
      SELECT 
        naturales,
        juridicos,
        (naturales + juridicos) as total,
        nuevos_naturales,
        nuevos_juridicos,
        (nuevos_naturales + nuevos_juridicos) as nuevos_total
      FROM stats
    `;

    const result = await pool.query(query);
    const counts = result.rows[0];

    return {
      naturales: parseInt(counts.naturales),
      juridicos: parseInt(counts.juridicos),
      total: parseInt(counts.total),
      nuevosNaturales: parseInt(counts.nuevos_naturales),
      nuevosJuridicos: parseInt(counts.nuevos_juridicos),
      nuevosTotal: parseInt(counts.nuevos_total),
    };
  },
};
