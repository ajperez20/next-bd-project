import pool from "@/config/database";

export const materiaPrimaStockService = {
  getAll: async () => {
    const query = `
      SELECT 
        mps.mps_id as id,
        mps.mps_unidad_medida,
        mps.mps_cantidad_disponible,
        mps.fk_sed_id,
        mps.fk_rpm_id,
        mp.rpm_nombre,
        mp.rpm_descripcion,
        s.sed_nombre
      FROM materia_prima_stock mps
      JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
      JOIN sede_planta s ON mps.fk_sed_id = s.sed_id
      ORDER BY mp.rpm_nombre, s.sed_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        mps.mps_id as id,
        mps.mps_unidad_medida,
        mps.mps_cantidad_disponible,
        mps.fk_sed_id,
        mps.fk_rpm_id,
        mp.rpm_nombre,
        mp.rpm_descripcion,
        s.sed_nombre
      FROM materia_prima_stock mps
      JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
      JOIN sede_planta s ON mps.fk_sed_id = s.sed_id
      WHERE mps.mps_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (stock) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        INSERT INTO materia_prima_stock (
          mps_unidad_medida,
          mps_cantidad_disponible,
          fk_sed_id,
          fk_rpm_id
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      const values = [
        stock.mps_unidad_medida,
        stock.mps_cantidad_disponible,
        stock.fk_sed_id,
        stock.fk_rpm_id,
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

  update: async (id, stock) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const query = `
        UPDATE materia_prima_stock 
        SET 
          mps_unidad_medida = $1,
          mps_cantidad_disponible = $2,
          fk_sed_id = $3,
          fk_rpm_id = $4
        WHERE mps_id = $5
        RETURNING *
      `;

      const values = [
        stock.mps_unidad_medida,
        stock.mps_cantidad_disponible,
        stock.fk_sed_id,
        stock.fk_rpm_id,
        id,
      ];

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new Error("Stock no encontrado");
      }

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
        DELETE FROM materia_prima_stock 
        WHERE mps_id = $1 
        RETURNING *
      `;

      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        throw new Error("Stock no encontrado");
      }

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
