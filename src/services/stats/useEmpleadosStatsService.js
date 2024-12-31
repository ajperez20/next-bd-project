import pool from "../../config/database";

export const useEmpleadosStatsService = {
  getEmpleadosStats: async () => {
    const query = `
      WITH empleados_stats AS (
        SELECT
          COUNT(*) as total_empleados,
          COUNT(CASE WHEN per_fecha_contratacion >= CURRENT_DATE - INTERVAL '30 days'
                       THEN 1 END) as nuevos_empleados,
          COUNT(CASE WHEN per_experiencia < 2 THEN 1 END) as junior,
          COUNT(CASE WHEN per_experiencia BETWEEN 2 AND 5 THEN 1 END) as semi_senior,
          COUNT(CASE WHEN per_experiencia > 5 THEN 1 END) as senior,
          ROUND(AVG(per_experiencia)::numeric, 1) as promedio_experiencia
        FROM empleado
      ),
           cargos_stats AS (
             SELECT
               c.car_id,
               c.car_nombre,
               COUNT(ec.fk_per_id) as total
             FROM cargo c
                    LEFT JOIN empleado_cargo ec ON c.car_id = ec.fk_car_id
             GROUP BY c.car_id, c.car_nombre
           ),
           ubicaciones_stats AS (
             SELECT
               l.lug_id,
               l.lug_nombre,
               COUNT(e.per_id) as total
             FROM lugar l
                    LEFT JOIN empleado e ON l.lug_id = e.fk_lug_id
             GROUP BY l.lug_id, l.lug_nombre
           ),
           titulos_stats AS (
             SELECT COUNT(DISTINCT fk_per_id) as empleados_con_titulo
             FROM empleado_titulo
           ),
           beneficiarios_stats AS (
             SELECT COUNT(DISTINCT fk_per_id) as empleados_con_beneficiarios
             FROM per_ben
           )
      SELECT
        e.*,
        (SELECT array_to_json(array_agg(row_to_json(c))) FROM cargos_stats c) as empleados_por_cargo,
        (SELECT array_to_json(array_agg(row_to_json(u))) FROM ubicaciones_stats u) as empleados_por_ubicacion,
        t.empleados_con_titulo,
        b.empleados_con_beneficiarios
      FROM empleados_stats e
             CROSS JOIN titulos_stats t
             CROSS JOIN beneficiarios_stats b
    `;

    const result = await pool.query(query);
    const stats = result.rows[0];

    // Evitar división por cero
    const total = parseInt(stats.total_empleados) || 1;

    return {
      general: {
        total: parseInt(stats.total_empleados),
        nuevos: parseInt(stats.nuevos_empleados),
        porcentajeNuevos: parseFloat(
          ((stats.nuevos_empleados / total) * 100).toFixed(1),
        ),
      },
      experiencia: {
        junior: parseInt(stats.junior),
        semiSenior: parseInt(stats.semi_senior),
        senior: parseInt(stats.senior),
        promedio: parseFloat(stats.promedio_experiencia),
      },
      distribucion: {
        porCargo: stats.empleados_por_cargo || [],
        porUbicacion: stats.empleados_por_ubicacion || [],
      },
      calificaciones: {
        conTitulo: parseInt(stats.empleados_con_titulo),
        porcentajeConTitulo: parseFloat(
          ((stats.empleados_con_titulo / total) * 100).toFixed(1),
        ),
      },
      beneficiarios: {
        conBeneficiarios: parseInt(stats.empleados_con_beneficiarios),
        porcentajeConBeneficiarios: parseFloat(
          ((stats.empleados_con_beneficiarios / total) * 100).toFixed(1),
        ),
      },
    };
  },
};
