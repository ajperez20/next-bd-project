import pool from "../config/database";

export const clienteJuridicoService = {
  getAll: async () => {
    const query = `
      SELECT 
        cj.cjd_id,
        cj.cjd_nombre,
        cj.cjd_rif,
        cj.cjd_direccion,
        cj.cjd_url_pagina,
        cj.cjd_descripcion,
        cj.cjd_fecha_ini_operaciones,
        cj.fk_lug_id,
        l.lug_nombre || COALESCE(', ' || l2.lug_nombre, '') || 
        COALESCE(', ' || l3.lug_nombre, '') as lugar_completo
      FROM cliente_juridico cj
      LEFT JOIN lugar l ON cj.fk_lug_id = l.lug_id
      LEFT JOIN lugar l2 ON l.fk_lug_id = l2.lug_id
      LEFT JOIN lugar l3 ON l2.fk_lug_id = l3.lug_id
      ORDER BY cj.cjd_nombre
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        cjd_id,
        cjd_nombre,
        cjd_rif,
        cjd_direccion,
        cjd_url_pagina,
        cjd_descripcion,
        cjd_fecha_ini_operaciones,
        fk_lug_id
      FROM cliente_juridico
      WHERE cjd_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (cliente) => {
    const query = `
      INSERT INTO cliente_juridico (
        cjd_nombre,
        cjd_rif,
        cjd_direccion,
        cjd_url_pagina,
        cjd_descripcion,
        cjd_fecha_ini_operaciones,
        fk_lug_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      cliente.cjd_nombre,
      cliente.cjd_rif,
      cliente.cjd_direccion,
      cliente.cjd_url_pagina,
      cliente.cjd_descripcion,
      cliente.cjd_fecha_ini_operaciones,
      cliente.fk_lug_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, cliente) => {
    const query = `
      UPDATE cliente_juridico 
      SET 
        cjd_nombre = $1,
        cjd_rif = $2,
        cjd_direccion = $3,
        cjd_url_pagina = $4,
        cjd_descripcion = $5,
        cjd_fecha_ini_operaciones = $6,
        fk_lug_id = $7
      WHERE cjd_id = $8
      RETURNING *
    `;

    const values = [
      cliente.cjd_nombre,
      cliente.cjd_rif,
      cliente.cjd_direccion,
      cliente.cjd_url_pagina,
      cliente.cjd_descripcion,
      cliente.cjd_fecha_ini_operaciones,
      cliente.fk_lug_id,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM cliente_juridico WHERE cjd_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
