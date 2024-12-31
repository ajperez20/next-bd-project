import pool from "../config/database";

export const caracteristicasAvionService = {
  getAll: async () => {
    const query = `
      SELECT 
        pvv_id as id,
        pvv_nombre_caracteristica as nombre,
        COUNT(mac.fk_mda_id) as cantidad_modelos
      FROM caracteristica_anv_conf cac
      LEFT JOIN modelo_avion_caracteristica mac ON cac.pvv_id = mac.fk_pvv_id
      GROUP BY pvv_id, pvv_nombre_caracteristica
      ORDER BY pvv_nombre_caracteristica
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        pvv_id as id,
        pvv_nombre_caracteristica as nombre
      FROM caracteristica_anv_conf
      WHERE pvv_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (caracteristica) => {
    const query = `
      INSERT INTO caracteristica_anv_conf (
        pvv_nombre_caracteristica
      )
      VALUES ($1)
      RETURNING 
        pvv_id as id,
        pvv_nombre_caracteristica as nombre
    `;

    const result = await pool.query(query, [caracteristica.nombre]);
    return result.rows[0];
  },

  update: async (id, caracteristica) => {
    const query = `
      UPDATE caracteristica_anv_conf 
      SET pvv_nombre_caracteristica = $1
      WHERE pvv_id = $2
      RETURNING 
        pvv_id as id,
        pvv_nombre_caracteristica as nombre
    `;

    const result = await pool.query(query, [caracteristica.nombre, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query =
      "DELETE FROM caracteristica_anv_conf WHERE pvv_id = $1 RETURNING pvv_id as id";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
