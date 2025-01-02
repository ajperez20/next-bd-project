import pool from "../config/database";

export const zonaService = {
  getAll: async () => {
    const query = `
      SELECT 
        z.zon_id,
        z.zon_nombre,
        z.zon_descripcion,
        z.fk_are_id,
        a.are_nombre as area_nombre,
        s.sed_nombre as sede_nombre
      FROM zona z
      LEFT JOIN area a ON z.fk_are_id = a.are_id
      LEFT JOIN sede_planta s ON a.fk_sed_id = s.sed_id
      ORDER BY z.zon_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  create: async (zona) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO zona (
          zon_nombre,
          zon_descripcion,
          fk_are_id
        ) VALUES ($1, $2, $3)
        RETURNING *
      `;

      const values = [zona.zon_nombre, zona.zon_descripcion, zona.fk_are_id];

      const result = await client.query(query, values);
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  update: async (id, zona) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        UPDATE zona 
        SET 
          zon_nombre = $1,
          zon_descripcion = $2,
          fk_are_id = $3
        WHERE zon_id = $4
        RETURNING *
      `;

      const values = [
        zona.zon_nombre,
        zona.zon_descripcion,
        zona.fk_are_id,
        id,
      ];

      const result = await client.query(query, values);
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  delete: async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const query = `
        DELETE FROM zona 
        WHERE zon_id = $1 
        RETURNING *
      `;
      const result = await client.query(query, [id]);
      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};
