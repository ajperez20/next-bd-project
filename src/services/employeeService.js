import pool from "../config/database";

export const employeeService = {
  getAll: async () => {
    const query = `
            SELECT e.per_id,
                   e.per_dni,
                   e.per_nombre,
                   e.per_apellido,
                   e.per_direccion,
                   e.per_experiencia,
                   e.per_fecha_contratacion,
                   e.per_profesion,
                   l.lug_nombre as lugar
            FROM EMPLEADO e
                     LEFT JOIN LUGAR l ON e.fk_lug_id = l.lug_id
            ORDER BY e.per_id ASC
        `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
            SELECT e.per_id,
                   e.per_dni,
                   e.per_nombre,
                   e.per_apellido,
                   e.per_direccion,
                   e.per_experiencia,
                   e.per_fecha_contratacion,
                   e.per_profesion,
                   l.lug_nombre as lugar
            FROM EMPLEADO e
                     LEFT JOIN LUGAR l ON e.fk_lug_id = l.lug_id
            WHERE e.per_id = $1
        `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (empleado) => {
    const {
      per_dni,
      per_nombre,
      per_apellido,
      per_direccion,
      per_experiencia,
      per_profesion,
      fk_lug_id,
    } = empleado;

    const query = `
            INSERT INTO EMPLEADO (per_dni,
                                  per_nombre,
                                  per_apellido,
                                  per_direccion,
                                  per_experiencia,
                                  per_profesion,
                                  fk_lug_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
    const values = [
      per_dni,
      per_nombre,
      per_apellido,
      per_direccion,
      per_experiencia,
      per_profesion,
      fk_lug_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, empleado) => {
    const {
      per_dni,
      per_nombre,
      per_apellido,
      per_direccion,
      per_experiencia,
      per_profesion,
      fk_lug_id,
    } = empleado;

    const query = `
            UPDATE EMPLEADO
            SET per_dni         = $1,
                per_nombre      = $2,
                per_apellido    = $3,
                per_direccion   = $4,
                per_experiencia = $5,
                per_profesion   = $6,
                fk_lug_id       = $7
            WHERE per_id = $8
            RETURNING *
        `;
    const values = [
      per_dni,
      per_nombre,
      per_apellido,
      per_direccion,
      per_experiencia,
      per_profesion,
      fk_lug_id,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM EMPLEADO WHERE per_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
