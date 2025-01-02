import pool from "@/config/database";

export const useInventarioStatsService = {
  getStats: async () => {
    const client = await pool.connect();
    try {
      // Estadísticas generales
      const generalQuery = `
        SELECT
          COUNT(DISTINCT mp.rpm_id) as total_materias,
          COUNT(DISTINCT s.sed_id) as total_sedes,
          COUNT(DISTINCT mps.fk_sed_id) as sedes_con_inventario,
          COUNT(*) FILTER (WHERE mps.mps_cantidad_disponible <= 5) as stock_critico,
          COUNT(*) FILTER (WHERE mps.mps_cantidad_disponible > 5 AND mps.mps_cantidad_disponible <= 10) as stock_bajo,
          COUNT(*) FILTER (WHERE mps.mps_cantidad_disponible > 10) as stock_normal
        FROM materia_prima mp
               CROSS JOIN sede_planta s
               LEFT JOIN materia_prima_stock mps ON
          mp.rpm_id = mps.fk_rpm_id AND
          s.sed_id = mps.fk_sed_id
      `;

      const movimientosQuery = `
        SELECT
          COUNT(*) FILTER (WHERE est.est_tipo_estatus = 'PENDIENTE') as pendientes,
          COUNT(*) FILTER (WHERE ss.sse_fecha >= CURRENT_DATE - INTERVAL '30 days') as movimientos_mes
        FROM solicitud_sede ss
               LEFT JOIN estatus_sol_pieza esp ON ss.sse_id = esp.fk_sse_id
               LEFT JOIN estatus est ON esp.fk_est_id = est.est_id
      `;

      const result = await client.query(generalQuery);
      const movResult = await client.query(movimientosQuery);

      const stats = result.rows[0];
      const movStats = movResult.rows[0];

      return {
        materiaPrima: {
          total: parseInt(stats.total_materias),
          stockCritico: parseInt(stats.stock_critico),
          stockBajo: parseInt(stats.stock_bajo),
          stockNormal: parseInt(stats.stock_normal),
        },
        sedes: {
          total: parseInt(stats.total_sedes),
          conInventario: parseInt(stats.sedes_con_inventario),
          porcentajeOcupacion: parseFloat(
            ((stats.sedes_con_inventario * 100) / stats.total_sedes).toFixed(2),
          ),
        },
        movimientos: {
          pendientes: parseInt(movStats.pendientes),
          ultimoMes: parseInt(movStats.movimientos_mes),
        },
      };
    } finally {
      client.release();
    }
  },

  getStockCritico: async () => {
    const query = `
      SELECT
        mps.mps_id as id,
        mp.rpm_nombre,
        mps.mps_cantidad_disponible,
        mps.mps_unidad_medida,
        s.sed_nombre,
        s.sed_id
      FROM materia_prima_stock mps
             JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
             JOIN sede_planta s ON mps.fk_sed_id = s.sed_id
      WHERE mps.mps_cantidad_disponible <= 10
      ORDER BY mps.mps_cantidad_disponible ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getMovimientos: async () => {
    const query = `
      SELECT
        ss.sse_id as id,
        ss.sse_fecha as fecha,
        s1.sed_nombre as sede_origen,
        s2.sed_nombre as sede_destino,
        COUNT(dss.fk_pie_id) as cantidad_items,
        est.est_tipo_estatus as estado
      FROM solicitud_sede ss
             JOIN sede_planta s1 ON ss.fk_sed_solicita = s1.sed_id
             JOIN sede_planta s2 ON ss.fk_sed_atiende = s2.sed_id
             LEFT JOIN detalle_sld_sede dss ON ss.sse_id = dss.fk_sse_id
             LEFT JOIN estatus_sol_pieza esp ON ss.sse_id = esp.fk_sse_id
             LEFT JOIN estatus est ON esp.fk_est_id = est.est_id
      WHERE ss.sse_fecha >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY
        ss.sse_id,
        ss.sse_fecha,
        s1.sed_nombre,
        s2.sed_nombre,
        est.est_tipo_estatus
      ORDER BY ss.sse_fecha DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getDisponibilidad: async () => {
    const query = `
      SELECT
        s.sed_nombre as sede,
        COUNT(DISTINCT mp.rpm_id) as total_materiales,
        COUNT(DISTINCT mps.fk_rpm_id) FILTER (
          WHERE mps.mps_cantidad_disponible > 0
          ) as materiales_disponibles,
        ROUND(
            (COUNT(DISTINCT mps.fk_rpm_id) FILTER (
              WHERE mps.mps_cantidad_disponible > 0
              ) * 100.0 / NULLIF(COUNT(DISTINCT mp.rpm_id), 0))::numeric,
            2
        ) as porcentaje_disponibilidad
      FROM sede_planta s
             CROSS JOIN materia_prima mp
             LEFT JOIN materia_prima_stock mps ON
        s.sed_id = mps.fk_sed_id AND
        mp.rpm_id = mps.fk_rpm_id
      GROUP BY s.sed_id, s.sed_nombre
      ORDER BY porcentaje_disponibilidad DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  },
};
