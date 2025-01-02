import pool from "../config/database";

export const areaService = {
  getAll: async () => {
    const query = `
      SELECT 
        a.are_id,
        a.are_nombre,
        a.are_descripcion,
        a.fk_sed_id,
        s.sed_nombre as sede_nombre,
        COUNT(DISTINCT z.zon_id) as cantidad_zonas
      FROM area a
      LEFT JOIN sede_planta s ON a.fk_sed_id = s.sed_id
      LEFT JOIN zona z ON z.fk_are_id = a.are_id
      GROUP BY 
        a.are_id,
        a.are_nombre,
        a.are_descripcion,
        a.fk_sed_id,
        s.sed_nombre
      ORDER BY a.are_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  create: async (area) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO area (
          are_nombre,
          are_descripcion,
          fk_sed_id
        ) VALUES ($1, $2, $3)
        RETURNING *
      `;

      const values = [area.are_nombre, area.are_descripcion, area.fk_sed_id];

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

  update: async (id, area) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        UPDATE area 
        SET 
          are_nombre = $1,
          are_descripcion = $2,
          fk_sed_id = $3
        WHERE are_id = $4
        RETURNING *
      `;

      const values = [
        area.are_nombre,
        area.are_descripcion,
        area.fk_sed_id,
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

      // Verificar si tiene zonas asociadas
      const checkQuery = `
        SELECT COUNT(*) 
        FROM zona 
        WHERE fk_are_id = $1
      `;
      const { rows } = await client.query(checkQuery, [id]);
      if (rows[0].count > 0) {
        throw new Error("No se puede eliminar un área con zonas asociadas");
      }

      const query = `
        DELETE FROM area 
        WHERE are_id = $1 
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
