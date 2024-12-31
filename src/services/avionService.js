import pool from "../config/database";

export const avionService = {
  getAll: async () => {
    const query = `
      SELECT 
        tiv_id as id,
        tiv_nombre as nombre,
        tiv_descripcion as descripcion,
        (SELECT COUNT(*) FROM modelo_avion_conf 
         WHERE fk_tiv_id = tipo_avion.tiv_id) as cantidad_modelos
      FROM tipo_avion
      ORDER BY tiv_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        tiv_id as id,
        tiv_nombre as nombre,
        tiv_descripcion as descripcion
      FROM tipo_avion
      WHERE tiv_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (tipoAvion) => {
    const query = `
      INSERT INTO tipo_avion (
        tiv_nombre,
        tiv_descripcion
      )
      VALUES ($1, $2)
      RETURNING 
        tiv_id as id,
        tiv_nombre as nombre,
        tiv_descripcion as descripcion
    `;

    const values = [tipoAvion.nombre, tipoAvion.descripcion];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, tipoAvion) => {
    const query = `
      UPDATE tipo_avion 
      SET 
        tiv_nombre = $1,
        tiv_descripcion = $2
      WHERE tiv_id = $3
      RETURNING 
        tiv_id as id,
        tiv_nombre as nombre,
        tiv_descripcion as descripcion
    `;

    const values = [tipoAvion.nombre, tipoAvion.descripcion, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query =
      "DELETE FROM tipo_avion WHERE tiv_id = $1 RETURNING tiv_id as id";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
