import pool from "../config/database";

export const proveedorService = {
  getAll: async () => {
    const query = `
      SELECT
        p.com_id,
        p.com_nombre,
        p.com_direccion,
        p.com_url_pagina,
        p.com_fechai_operaciones,
        p.fk_mtp_id,
        p.fk_lug_id,
        mp.rpm_nombre as materia_prima,
        l.lug_nombre || COALESCE(', ' || l2.lug_nombre, '') ||
        COALESCE(', ' || l3.lug_nombre, '') as lugar_completo
      FROM proveedor p
             LEFT JOIN proveedor_mp_stock mps ON p.fk_mtp_id = mps.mtp_id
             LEFT JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
             LEFT JOIN lugar l ON p.fk_lug_id = l.lug_id
             LEFT JOIN lugar l2 ON l.fk_lug_id = l2.lug_id
             LEFT JOIN lugar l3 ON l2.fk_lug_id = l3.lug_id
      ORDER BY p.com_nombre
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT
        p.com_id,
        p.com_nombre,
        p.com_direccion,
        p.com_url_pagina,
        p.com_fechai_operaciones,
        p.fk_mtp_id,
        p.fk_lug_id
      FROM proveedor p
      WHERE p.com_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (proveedor) => {
    // Validar que los valores sean números
    const fk_mtp_id = parseInt(proveedor.fk_mtp_id);
    const fk_lug_id = parseInt(proveedor.fk_lug_id);

    if (isNaN(fk_mtp_id) || isNaN(fk_lug_id)) {
      throw new Error("IDs inválidos para materia prima o lugar");
    }

    const query = `
      INSERT INTO proveedor (
        com_nombre,
        com_direccion,
        com_url_pagina,
        com_fechai_operaciones,
        fk_mtp_id,
        fk_lug_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      proveedor.com_nombre,
      proveedor.com_direccion,
      proveedor.com_url_pagina,
      proveedor.com_fechai_operaciones,
      fk_mtp_id,
      fk_lug_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, proveedor) => {
    // Validar que los valores sean números
    const fk_mtp_id = parseInt(proveedor.fk_mtp_id);
    const fk_lug_id = parseInt(proveedor.fk_lug_id);

    if (isNaN(fk_mtp_id) || isNaN(fk_lug_id)) {
      throw new Error("IDs inválidos para materia prima o lugar");
    }

    const query = `
      UPDATE proveedor 
      SET 
        com_nombre = $1,
        com_direccion = $2,
        com_url_pagina = $3,
        com_fechai_operaciones = $4,
        fk_mtp_id = $5,
        fk_lug_id = $6
      WHERE com_id = $7
      RETURNING *
    `;

    const values = [
      proveedor.com_nombre,
      proveedor.com_direccion,
      proveedor.com_url_pagina,
      proveedor.com_fechai_operaciones,
      fk_mtp_id,
      fk_lug_id,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM proveedor WHERE com_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
