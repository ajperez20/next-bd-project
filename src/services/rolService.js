import pool from "../config/database";

export const rolService = {
  getAll: async () => {
    const query = `
      SELECT 
        rol_id,
        rol_nombre,
        rol_descripcion,
        COUNT(u.usu_id) as cantidad_usuarios
      FROM rol r
      LEFT JOIN usuario u ON r.rol_id = u.fk_rol_id
      GROUP BY rol_id, rol_nombre, rol_descripcion
      ORDER BY rol_nombre
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        rol_id,
        rol_nombre,
        rol_descripcion
      FROM rol
      WHERE rol_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (rol) => {
    const query = `
      INSERT INTO rol (
        rol_nombre,
        rol_descripcion
      )
      VALUES ($1, $2)
      RETURNING *
    `;

    const values = [rol.rol_nombre.toUpperCase(), rol.rol_descripcion];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, rol) => {
    const query = `
      UPDATE rol 
      SET 
        rol_nombre = $1,
        rol_descripcion = $2
      WHERE rol_id = $3
      RETURNING *
    `;

    const values = [rol.rol_nombre.toUpperCase(), rol.rol_descripcion, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM rol WHERE rol_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
