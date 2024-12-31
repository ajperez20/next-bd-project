import pool from "../config/database";

export const clienteNaturalService = {
  getAll: async () => {
    const query = `
      SELECT 
        cn.ctn_id,
        cn.ctn_nombre,
        cn.ctn_apellido,
        cn.ctn_dni,
        cn.ctn_direccion,
        cn.ctn_url_pagina,
        cn.ctn_fecha_ini_operaciones,
        cn.fk_lug_id,
        l.lug_nombre || COALESCE(', ' || l2.lug_nombre, '') || 
        COALESCE(', ' || l3.lug_nombre, '') as lugar_completo
      FROM cliente_natural cn
      LEFT JOIN lugar l ON cn.fk_lug_id = l.lug_id
      LEFT JOIN lugar l2 ON l.fk_lug_id = l2.lug_id
      LEFT JOIN lugar l3 ON l2.fk_lug_id = l3.lug_id
      ORDER BY cn.ctn_nombre, cn.ctn_apellido
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        ctn_id,
        ctn_nombre,
        ctn_apellido,
        ctn_dni,
        ctn_direccion,
        ctn_url_pagina,
        ctn_fecha_ini_operaciones,
        fk_lug_id
      FROM cliente_natural
      WHERE ctn_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (cliente) => {
    const query = `
      INSERT INTO cliente_natural (
        ctn_nombre,
        ctn_apellido,
        ctn_dni,
        ctn_direccion,
        ctn_url_pagina,
        ctn_fecha_ini_operaciones,
        fk_lug_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      cliente.ctn_nombre,
      cliente.ctn_apellido,
      cliente.ctn_dni,
      cliente.ctn_direccion,
      cliente.ctn_url_pagina,
      cliente.ctn_fecha_ini_operaciones,
      cliente.fk_lug_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, cliente) => {
    const query = `
      UPDATE cliente_natural 
      SET 
        ctn_nombre = $1,
        ctn_apellido = $2,
        ctn_dni = $3,
        ctn_direccion = $4,
        ctn_url_pagina = $5,
        ctn_fecha_ini_operaciones = $6,
        fk_lug_id = $7
      WHERE ctn_id = $8
      RETURNING *
    `;

    const values = [
      cliente.ctn_nombre,
      cliente.ctn_apellido,
      cliente.ctn_dni,
      cliente.ctn_direccion,
      cliente.ctn_url_pagina,
      cliente.ctn_fecha_ini_operaciones,
      cliente.fk_lug_id,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM cliente_natural WHERE ctn_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
