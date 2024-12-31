import pool from "../config/database";

export const employeeService = {
  getAll: async () => {
    const query = `
      WITH RECURSIVE lugar_jerarquia AS (
        -- Caso base: lugares sin padre
        SELECT
          l.lug_id,
          l.lug_nombre,
          CAST(l.lug_nombre AS VARCHAR) as lugar_completo
        FROM lugar l
        WHERE l.fk_lug_id IS NULL

        UNION ALL

        -- Caso recursivo
        SELECT
          l.lug_id,
          l.lug_nombre,
          CAST(lj.lugar_completo || ' > ' || l.lug_nombre AS VARCHAR)
        FROM lugar l
               INNER JOIN lugar_jerarquia lj ON l.fk_lug_id = lj.lug_id
      )
      SELECT
        e.per_id,
        e.per_dni,
        e.per_nombre,
        e.per_apellido,
        e.per_direccion,
        e.per_experiencia,
        e.per_fecha_contratacion,
        e.per_profesion,
        e.fk_lug_id,
        l.lug_nombre as lugar,
        lj.lugar_completo
      FROM empleado e
             LEFT JOIN lugar l ON e.fk_lug_id = l.lug_id
             LEFT JOIN lugar_jerarquia lj ON l.lug_id = lj.lug_id
      ORDER BY e.per_id
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      WITH RECURSIVE lugar_jerarquia AS (
        SELECT
          l.lug_id,
          l.lug_nombre,
          CAST(l.lug_nombre AS VARCHAR) as lugar_completo
        FROM lugar l
        WHERE l.fk_lug_id IS NULL

        UNION ALL

        SELECT
          l.lug_id,
          l.lug_nombre,
          CAST(lj.lugar_completo || ' > ' || l.lug_nombre AS VARCHAR)
        FROM lugar l
               INNER JOIN lugar_jerarquia lj ON l.fk_lug_id = lj.lug_id
      )
      SELECT
        e.per_id,
        e.per_dni,
        e.per_nombre,
        e.per_apellido,
        e.per_direccion,
        e.per_experiencia,
        e.per_fecha_contratacion,
        e.per_profesion,
        e.fk_lug_id,
        l.lug_nombre as lugar,
        lj.lugar_completo
      FROM empleado e
             LEFT JOIN lugar l ON e.fk_lug_id = l.lug_id
             LEFT JOIN lugar_jerarquia lj ON l.lug_id = lj.lug_id
      WHERE e.per_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (empleado) => {
    const query = `
      INSERT INTO empleado (
        per_dni,
        per_nombre,
        per_apellido,
        per_direccion,
        per_experiencia,
        per_profesion,
        fk_lug_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      empleado.per_dni,
      empleado.per_nombre,
      empleado.per_apellido,
      empleado.per_direccion,
      empleado.per_experiencia,
      empleado.per_profesion,
      empleado.fk_lug_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, empleado) => {
    const query = `
            UPDATE empleado SET
                per_dni = $1,
                per_nombre = $2,
                per_apellido = $3,
                per_direccion = $4,
                per_experiencia = $5,
                per_profesion = $6,
                fk_lug_id = $7
            WHERE per_id = $8
            RETURNING *
        `;
    const values = [
      empleado.per_dni,
      empleado.per_nombre,
      empleado.per_apellido,
      empleado.per_direccion,
      empleado.per_experiencia,
      empleado.per_profesion,
      empleado.fk_lug_id,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM empleado WHERE per_id = $1";
    await pool.query(query, [id]);
    return true;
  },

  // Beneficiarios
  getBeneficiarios: async (empleadoId) => {
    const query = `
            SELECT 
                b.ben_id,
                b.ben_dni,
                b.ben_nombre,
                b.ben_apellido,
                b.ben_direccion,
                pb.prb_parentezco as parentesco,
                l.lug_nombre as lugar
            FROM BENEFICIARIO b
            JOIN PER_BEN pb ON b.ben_id = pb.fk_ben_id
            LEFT JOIN LUGAR l ON b.fk_lug_id = l.lug_id
            WHERE pb.fk_per_id = $1
        `;
    const result = await pool.query(query, [empleadoId]);
    return result.rows;
  },

  // Experiencia
  getExperiencia: async (empleadoId) => {
    const query = `
            SELECT 
                exp_id,
                exp_nombre_empresa,
                exp_fecha_inicio,
                exp_fecha_fin
            FROM EXPERIENCIA
            WHERE fk_per_id = $1
            ORDER BY exp_fecha_inicio DESC
        `;
    const result = await pool.query(query, [empleadoId]);
    return result.rows;
  },

  // Títulos
  getTitulos: async (empleadoId) => {
    const query = `
            SELECT 
                t.tit_id,
                t.tit_nombre,
                t.tit_descripcion,
                et.edt_fecha_obtencion,
                et.edt_nombre_universidad
            FROM TITULO t
            JOIN EMPLEADO_TITULO et ON t.tit_id = et.fk_tit_id
            WHERE et.fk_per_id = $1
            ORDER BY et.edt_fecha_obtencion DESC
        `;
    const result = await pool.query(query, [empleadoId]);
    return result.rows;
  },
};
