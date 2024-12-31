import pool from "../../config/database";

export const usePiezasStatsService = {
  getPiezasStats: async () => {
    const query = `
            WITH piezas_total AS (
                SELECT COUNT(*) as total_piezas
                FROM modelo_pieza_conf
            ),
                 piezas_tipo AS (
                     SELECT
                         tpc.tpc_nombre as tipo,
                         COUNT(mpc.mec_id) as cantidad
                     FROM tipo_pieza_conf tpc
                              LEFT JOIN modelo_pieza_conf mpc ON tpc.tpc_id = mpc.fk_tpc_id
                     GROUP BY tpc.tpc_id, tpc.tpc_nombre
                 ),
                 piezas_caracteristicas AS (
                     SELECT COUNT(DISTINCT fk_mec_id) as con_caracteristicas
                     FROM modelo_pieza_caracteristica
                 ),
                 piezas_materiales AS (
                     SELECT COUNT(DISTINCT fk_mec_id) as con_materiales
                     FROM material_fase
                 ),
                 piezas_procesos AS (
                     SELECT COUNT(DISTINCT fk_mec_id) as con_procesos
                     FROM fase_ensamble_pieza_conf
                 ),
                 stock_stats AS (
                     SELECT
                         COALESCE(SUM(pie_cantidad_disponible), 0) as stock_total,
                         COUNT(DISTINCT pie_id) FILTER (WHERE pie_cantidad_disponible > 0) as piezas_en_stock,
                         COUNT(*) FILTER (WHERE pie_fecha_fabricacion >= CURRENT_DATE - INTERVAL '30 days') as piezas_nuevas
                     FROM pieza_stock
                 )
            SELECT
                pt.total_piezas as total,
                (SELECT json_agg(row_to_json(p)) FROM piezas_tipo p) as por_tipo,
                pc.con_caracteristicas,
                pm.con_materiales,
                pp.con_procesos,
                s.stock_total,
                s.piezas_en_stock as en_stock,
                s.piezas_nuevas as nuevas
            FROM piezas_total pt
                     CROSS JOIN piezas_caracteristicas pc
                     CROSS JOIN piezas_materiales pm
                     CROSS JOIN piezas_procesos pp
                     CROSS JOIN stock_stats s
        `;

    const result = await pool.query(query);
    return result.rows[0];
  },
};
