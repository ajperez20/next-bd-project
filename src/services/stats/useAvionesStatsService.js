import pool from "../../config/database";

export const useAvionesStatsService = {
  getAvionesStats: async () => {
    const query = `
            WITH aviones_total AS (
                SELECT COUNT(*) as total_aviones
                FROM avion_creado
            ),
                 aviones_modelo AS (
                     SELECT
                         mac.mda_nombre as modelo,
                         ta.tiv_nombre as tipo,
                         COUNT(ac.avi_id) as cantidad
                     FROM modelo_avion_conf mac
                              LEFT JOIN tipo_avion ta ON mac.fk_tiv_id = ta.tiv_id
                              LEFT JOIN avion_creado ac ON mac.mda_id = ac.fk_mda_id
                     GROUP BY mac.mda_id, mac.mda_nombre, ta.tiv_nombre
                 ),
                 aviones_proceso AS (
                     SELECT COUNT(*) as aviones_en_proceso
                     FROM fase_ensamble_avion
                     WHERE fln_fecha_fin IS NULL
                 ),
                 aviones_mes AS (
                     SELECT COUNT(*) as aviones_nuevos
                     FROM avion_creado
                     WHERE avi_fecha_creacion >= CURRENT_DATE - INTERVAL '30 days'
                 ),
                 pruebas_stats AS (
                     SELECT
                         COUNT(*) FILTER (WHERE pzb_fecha_fin IS NULL) as pendientes,
                         COUNT(*) FILTER (WHERE pzb_fecha_fin IS NOT NULL) as completadas,
                         COUNT(*) FILTER (WHERE pzb_fecha_inicio IS NOT NULL AND pzb_fecha_fin IS NULL) as en_proceso
                     FROM prueba_pieza_solicitud
                 )
            SELECT
                t.total_aviones as total,
                (SELECT json_agg(row_to_json(am)) FROM aviones_modelo am) as por_modelo,
                p.aviones_en_proceso as en_proceso,
                m.aviones_nuevos as completados,
                json_build_object(
                        'pendientes', ps.pendientes,
                        'completadas', ps.completadas,
                        'enProceso', ps.en_proceso
                ) as pruebas
            FROM aviones_total t
                     CROSS JOIN aviones_proceso p
                     CROSS JOIN aviones_mes m
                     CROSS JOIN pruebas_stats ps
        `;

    const result = await pool.query(query);
    return result.rows[0];
  },
};
