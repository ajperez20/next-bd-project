import pool from "../config/database";

export const piezaService = {
  getAll: async () => {
    const query = `
      SELECT 
        mp.mec_id as id,
        mp.mec_nombre_pieza as nombre,
        mp.mec_descripcion as descripcion,
        tp.tpc_id as tipo_id,
        tp.tpc_nombre as tipo_nombre,
        tp.tpc_descripcion as tipo_descripcion,
        COUNT(DISTINCT mac.fk_pcc_id) as cantidad_caracteristicas,
        COUNT(DISTINCT mf.fk_mac_id) as cantidad_materiales,
        COUNT(DISTINCT fp.fk_epc_id) as cantidad_procesos
      FROM modelo_pieza_conf mp
      LEFT JOIN tipo_pieza_conf tp ON mp.fk_tpc_id = tp.tpc_id
      LEFT JOIN modelo_pieza_caracteristica mac ON mp.mec_id = mac.fk_mec_id
      LEFT JOIN material_fase mf ON mp.mec_id = mf.fk_mec_id
      LEFT JOIN fase_ensamble_pieza_conf fp ON mp.mec_id = fp.fk_mec_id
      GROUP BY 
        mp.mec_id,
        mp.mec_nombre_pieza,
        mp.mec_descripcion,
        tp.tpc_id,
        tp.tpc_nombre,
        tp.tpc_descripcion
      ORDER BY mp.mec_nombre_pieza
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        mp.mec_id as id,
        mp.mec_nombre_pieza as nombre,
        mp.mec_descripcion as descripcion,
        mp.fk_tpc_id as tipo_id,
        tp.tpc_nombre as tipo_nombre,
        tp.tpc_descripcion as tipo_descripcion
      FROM modelo_pieza_conf mp
      LEFT JOIN tipo_pieza_conf tp ON mp.fk_tpc_id = tp.tpc_id
      WHERE mp.mec_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  getCaracteristicas: async (id) => {
    const query = `
      SELECT 
        c.pcc_id as id,
        c.pcc_nombre_caracteristica as nombre,
        mpc.pzi_unidad_medida as unidad_medida,
        mpc.pzi_valor as valor
      FROM modelo_pieza_caracteristica mpc
      JOIN caracteristica_pieza_conf c ON mpc.fk_pcc_id = c.pcc_id
      WHERE mpc.fk_mec_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows;
  },

  getMateriales: async (id) => {
    const query = `
      SELECT DISTINCT
        m.mac_id as id,
        m.mac_nombre_material as nombre,
        m.mac_descripcion as descripcion,
        mf.mtf_cantidad_material as cantidad,
        mf.mtf_unidad_medida as unidad_medida,
        p.epc_nombre_proceso as proceso
      FROM material_fase mf
      JOIN material_pieza_conf m ON mf.fk_mac_id = m.mac_id
      JOIN proceso_ensamble_pieza_conf p ON mf.fk_epc_id = p.epc_id
      WHERE mf.fk_mec_id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows;
  },

  create: async (pieza) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Insertar la pieza
      const piezaQuery = `
        INSERT INTO modelo_pieza_conf (
          mec_nombre_pieza,
          mec_descripcion,
          fk_tpc_id
        )
        VALUES ($1, $2, $3)
        RETURNING 
          mec_id as id,
          mec_nombre_pieza as nombre,
          mec_descripcion as descripcion,
          fk_tpc_id as tipo_id
      `;

      const piezaValues = [pieza.nombre, pieza.descripcion, pieza.tipo_id];

      const piezaResult = await client.query(piezaQuery, piezaValues);
      const nuevaPieza = piezaResult.rows[0];

      // Si hay características, insertarlas
      if (pieza.caracteristicas?.length > 0) {
        const caracteristicasQuery = `
          INSERT INTO modelo_pieza_caracteristica (
            fk_mec_id,
            fk_pcc_id,
            pzi_unidad_medida,
            pzi_valor
          )
          VALUES ($1, $2, $3, $4)
        `;

        for (const caract of pieza.caracteristicas) {
          await client.query(caracteristicasQuery, [
            nuevaPieza.id,
            caract.caracteristica_id,
            caract.unidad_medida,
            caract.valor,
          ]);
        }
      }

      // Si hay materiales, insertarlos
      if (pieza.materiales?.length > 0) {
        const materialesQuery = `
          INSERT INTO material_fase (
            fk_mec_id,
            fk_epc_id,
            fk_mac_id,
            mtf_cantidad_material,
            mtf_unidad_medida
          )
          VALUES ($1, $2, $3, $4, $5)
        `;

        for (const material of pieza.materiales) {
          await client.query(materialesQuery, [
            nuevaPieza.id,
            material.proceso_id,
            material.material_id,
            material.cantidad,
            material.unidad_medida,
          ]);
        }
      }

      await client.query("COMMIT");
      return nuevaPieza;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  update: async (id, pieza) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Actualizar la pieza
      const piezaQuery = `
        UPDATE modelo_pieza_conf 
        SET 
          mec_nombre_pieza = $1,
          mec_descripcion = $2,
          fk_tpc_id = $3
        WHERE mec_id = $4
        RETURNING 
          mec_id as id,
          mec_nombre_pieza as nombre,
          mec_descripcion as descripcion,
          fk_tpc_id as tipo_id
      `;

      const piezaValues = [pieza.nombre, pieza.descripcion, pieza.tipo_id, id];

      const piezaResult = await client.query(piezaQuery, piezaValues);
      const piezaActualizada = piezaResult.rows[0];

      // Actualizar características
      if (pieza.caracteristicas) {
        await client.query(
          "DELETE FROM modelo_pieza_caracteristica WHERE fk_mec_id = $1",
          [id],
        );

        const caracteristicasQuery = `
          INSERT INTO modelo_pieza_caracteristica (
            fk_mec_id,
            fk_pcc_id,
            pzi_unidad_medida,
            pzi_valor
          )
          VALUES ($1, $2, $3, $4)
        `;

        for (const caract of pieza.caracteristicas) {
          await client.query(caracteristicasQuery, [
            id,
            caract.caracteristica_id,
            caract.unidad_medida,
            caract.valor,
          ]);
        }
      }

      // Actualizar materiales
      if (pieza.materiales) {
        await client.query("DELETE FROM material_fase WHERE fk_mec_id = $1", [
          id,
        ]);

        const materialesQuery = `
          INSERT INTO material_fase (
            fk_mec_id,
            fk_epc_id,
            fk_mac_id,
            mtf_cantidad_material,
            mtf_unidad_medida
          )
          VALUES ($1, $2, $3, $4, $5)
        `;

        for (const material of pieza.materiales) {
          await client.query(materialesQuery, [
            id,
            material.proceso_id,
            material.material_id,
            material.cantidad,
            material.unidad_medida,
          ]);
        }
      }

      await client.query("COMMIT");
      return piezaActualizada;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  delete: async (id) => {
    const query =
      "DELETE FROM modelo_pieza_conf WHERE mec_id = $1 RETURNING mec_id as id";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Métodos auxiliares para obtener datos relacionados
  getTipos: async () => {
    const query = `
      SELECT 
        tpc_id as id,
        tpc_nombre as nombre,
        tpc_descripcion as descripcion
      FROM tipo_pieza_conf
      ORDER BY tpc_nombre
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getCaracteristicasDisponibles: async () => {
    const query = `
      SELECT 
        pcc_id as id,
        pcc_nombre_caracteristica as nombre
      FROM caracteristica_pieza_conf
      ORDER BY pcc_nombre_caracteristica
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getMaterialesDisponibles: async () => {
    const query = `
      SELECT 
        mac_id as id,
        mac_nombre_material as nombre,
        mac_descripcion as descripcion
      FROM material_pieza_conf
      ORDER BY mac_nombre_material
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  getProcesosDisponibles: async () => {
    const query = `
      SELECT 
        epc_id as id,
        epc_nombre_proceso as nombre,
        epc_descripcion as descripcion,
        epc_tiempo_estimado as tiempo_estimado
      FROM proceso_ensamble_pieza_conf
      ORDER BY epc_nombre_proceso
    `;

    const result = await pool.query(query);
    return result.rows;
  },
};
