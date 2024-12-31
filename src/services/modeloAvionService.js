import pool from "../config/database";

export const modeloAvionService = {
  getAll: async () => {
    const query = `
      SELECT 
        mac.mda_id as id,
        mac.mda_nombre as nombre,
        mac.mda_descripcion as descripcion,
        ta.tiv_id as tipo_id,
        ta.tiv_nombre as tipo_nombre,
        COUNT(DISTINCT ac.fk_epv_id) as cantidad_procesos,
        COUNT(DISTINCT fp.fk_prc_id) as cantidad_pruebas,
        COUNT(DISTINCT mnc.fk_pvv_id) as cantidad_caracteristicas
      FROM modelo_avion_conf mac
      LEFT JOIN tipo_avion ta ON mac.fk_tiv_id = ta.tiv_id
      LEFT JOIN fase_ensamble_avion_conf ac ON mac.mda_id = ac.fk_mda_id
      LEFT JOIN fase_prueba fp ON mac.mda_id = fp.fk_mda_id
      LEFT JOIN modelo_avion_caracteristica mnc ON mac.mda_id = mnc.fk_mda_id
      GROUP BY 
        mac.mda_id,
        mac.mda_nombre,
        mac.mda_descripcion,
        ta.tiv_id,
        ta.tiv_nombre
      ORDER BY mac.mda_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        mac.mda_id as id,
        mac.mda_nombre as nombre,
        mac.mda_descripcion as descripcion,
        mac.fk_tiv_id as tipo_id,
        ta.tiv_nombre as tipo_nombre
      FROM modelo_avion_conf mac
      LEFT JOIN tipo_avion ta ON mac.fk_tiv_id = ta.tiv_id
      WHERE mac.mda_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  getCaracteristicas: async (id) => {
    const query = `
      SELECT 
        c.pvv_id as id,
        c.pvv_nombre_caracteristica as nombre,
        mac.mnc_unidad_medida as unidad_medida,
        mac.mnc_valor as valor
      FROM modelo_avion_caracteristica mac
      JOIN caracteristica_anv_conf c ON mac.fk_pvv_id = c.pvv_id
      WHERE mac.fk_mda_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows;
  },

  create: async (modelo) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insertar el modelo
      const modeloQuery = `
        INSERT INTO modelo_avion_conf (
          mda_nombre,
          mda_descripcion,
          fk_tiv_id
        )
        VALUES ($1, $2, $3)
        RETURNING 
          mda_id as id,
          mda_nombre as nombre,
          mda_descripcion as descripcion,
          fk_tiv_id as tipo_id
      `;

      const modeloValues = [modelo.nombre, modelo.descripcion, modelo.tipo_id];

      const modeloResult = await client.query(modeloQuery, modeloValues);
      const nuevoModelo = modeloResult.rows[0];

      // Si hay características, insertarlas
      if (modelo.caracteristicas && modelo.caracteristicas.length > 0) {
        const caracteristicasQuery = `
          INSERT INTO modelo_avion_caracteristica (
            fk_mda_id,
            fk_pvv_id,
            mnc_unidad_medida,
            mnc_valor
          )
          VALUES ($1, $2, $3, $4)
        `;

        for (const caract of modelo.caracteristicas) {
          await client.query(caracteristicasQuery, [
            nuevoModelo.id,
            caract.caracteristica_id,
            caract.unidad_medida,
            caract.valor,
          ]);
        }
      }

      await client.query("COMMIT");
      return nuevoModelo;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  update: async (id, modelo) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Actualizar el modelo
      const modeloQuery = `
        UPDATE modelo_avion_conf 
        SET 
          mda_nombre = $1,
          mda_descripcion = $2,
          fk_tiv_id = $3
        WHERE mda_id = $4
        RETURNING 
          mda_id as id,
          mda_nombre as nombre,
          mda_descripcion as descripcion,
          fk_tiv_id as tipo_id
      `;

      const modeloValues = [
        modelo.nombre,
        modelo.descripcion,
        modelo.tipo_id,
        id,
      ];

      const modeloResult = await client.query(modeloQuery, modeloValues);
      const modeloActualizado = modeloResult.rows[0];

      // Si hay características, actualizar
      if (modelo.caracteristicas) {
        // Eliminar características existentes
        await client.query(
          "DELETE FROM modelo_avion_caracteristica WHERE fk_mda_id = $1",
          [id],
        );

        // Insertar nuevas características
        const caracteristicasQuery = `
          INSERT INTO modelo_avion_caracteristica (
            fk_mda_id,
            fk_pvv_id,
            mnc_unidad_medida,
            mnc_valor
          )
          VALUES ($1, $2, $3, $4)
        `;

        for (const caract of modelo.caracteristicas) {
          await client.query(caracteristicasQuery, [
            id,
            caract.caracteristica_id,
            caract.unidad_medida,
            caract.valor,
          ]);
        }
      }

      await client.query("COMMIT");
      return modeloActualizado;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  delete: async (id) => {
    const query =
      "DELETE FROM modelo_avion_conf WHERE mda_id = $1 RETURNING mda_id as id";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Método adicional para obtener las características disponibles
  getCaracteristicasDisponibles: async () => {
    const query = `
      SELECT 
        pvv_id as id,
        pvv_nombre_caracteristica as nombre
      FROM caracteristica_anv_conf
      ORDER BY pvv_nombre_caracteristica
    `;

    const result = await pool.query(query);
    return result.rows;
  },
};
