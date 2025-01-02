import pool from "../config/database";

export const sedeService = {
  getAll: async () => {
    const query = `
      WITH lugar_completo AS (
        SELECT
          l1.lug_id,
          CASE
            WHEN l3.lug_nombre IS NOT NULL THEN CONCAT(l3.lug_nombre, ' - ', l2.lug_nombre, ' - ', l1.lug_nombre)
            WHEN l2.lug_nombre IS NOT NULL THEN CONCAT(l2.lug_nombre, ' - ', l1.lug_nombre)
            ELSE l1.lug_nombre
            END as ubicacion_completa
        FROM lugar l1
               LEFT JOIN lugar l2 ON l1.fk_lug_id = l2.lug_id
               LEFT JOIN lugar l3 ON l2.fk_lug_id = l3.lug_id
      )
      SELECT
        sp.sed_id,
        sp.sed_nombre,
        sp.sed_direccion,
        sp.sed_descripcion,
        sp.fk_lug_id,
        lc.ubicacion_completa,
        COUNT(DISTINCT a.are_id) as cantidad_areas
      FROM sede_planta sp
             LEFT JOIN lugar_completo lc ON sp.fk_lug_id = lc.lug_id
             LEFT JOIN area a ON a.fk_sed_id = sp.sed_id
      GROUP BY
        sp.sed_id,
        sp.sed_nombre,
        sp.sed_direccion,
        sp.sed_descripcion,
        sp.fk_lug_id,
        lc.ubicacion_completa
      ORDER BY sp.sed_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  create: async (sede) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO sede_planta (
          sed_nombre,
          sed_direccion,
          sed_descripcion,
          fk_lug_id
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      const values = [
        sede.sed_nombre,
        sede.sed_direccion,
        sede.sed_descripcion,
        sede.fk_lug_id,
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

  update: async (id, sede) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        UPDATE sede_planta
        SET
          sed_nombre = $1,
          sed_direccion = $2,
          sed_descripcion = $3,
          fk_lug_id = $4
        WHERE sed_id = $5
        RETURNING *
      `;

      const values = [
        sede.sed_nombre,
        sede.sed_direccion,
        sede.sed_descripcion,
        sede.fk_lug_id,
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

      // Verificar si tiene áreas asociadas
      const checkQuery = `
        SELECT COUNT(*)
        FROM area
        WHERE fk_sed_id = $1
      `;
      const { rows } = await client.query(checkQuery, [id]);
      if (rows[0].count > 0) {
        throw new Error("No se puede eliminar una sede con áreas asociadas");
      }

      const query = `
        DELETE FROM sede_planta 
        WHERE sed_id = $1 
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
