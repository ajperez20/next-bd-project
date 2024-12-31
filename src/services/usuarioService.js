import pool from "../config/database";

export const usuarioService = {
  getAll: async () => {
    const query = `
      SELECT 
        u.usu_id,
        u.usu_nombre_usuario,
        u.usu_email,
        r.rol_nombre,
        r.rol_descripcion,
        COALESCE(e.per_nombre || ' ' || e.per_apellido, 
                cj.cjd_nombre,
                cn.ctn_nombre || ' ' || cn.ctn_apellido,
                p.com_nombre) as entidad_nombre,
        CASE 
          WHEN e.per_id IS NOT NULL THEN 'Empleado'
          WHEN cj.cjd_id IS NOT NULL THEN 'Cliente Jurídico'
          WHEN cn.ctn_id IS NOT NULL THEN 'Cliente Natural'
          WHEN p.com_id IS NOT NULL THEN 'Proveedor'
        END as tipo_usuario
      FROM usuario u
      JOIN rol r ON u.fk_rol_id = r.rol_id
      LEFT JOIN empleado e ON u.fk_per_id = e.per_id
      LEFT JOIN cliente_juridico cj ON u.fk_cjd_id = cj.cjd_id
      LEFT JOIN cliente_natural cn ON u.fk_ctn_id = cn.ctn_id
      LEFT JOIN proveedor p ON u.fk_com_id = p.com_id
      ORDER BY u.usu_nombre_usuario
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT 
        u.usu_id,
        u.usu_nombre_usuario,
        u.usu_email,
        u.usu_contrasena,
        u.fk_rol_id,
        u.fk_per_id,
        u.fk_cjd_id,
        u.fk_ctn_id,
        u.fk_com_id
      FROM usuario u
      WHERE u.usu_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (usuario) => {
    const query = `
      INSERT INTO usuario (
        usu_nombre_usuario,
        usu_contrasena,
        usu_email,
        fk_rol_id,
        fk_per_id,
        fk_cjd_id,
        fk_ctn_id,
        fk_com_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      usuario.usu_nombre_usuario,
      usuario.usu_contrasena,
      usuario.usu_email,
      usuario.fk_rol_id,
      usuario.fk_per_id || null,
      usuario.fk_cjd_id || null,
      usuario.fk_ctn_id || null,
      usuario.fk_com_id || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, usuario) => {
    const query = `
      UPDATE usuario 
      SET 
        usu_nombre_usuario = $1,
        usu_email = $2,
        fk_rol_id = $3,
        fk_per_id = $4,
        fk_cjd_id = $5,
        fk_ctn_id = $6,
        fk_com_id = $7
        ${usuario.usu_contrasena ? ", usu_contrasena = $8" : ""}
      WHERE usu_id = ${usuario.usu_contrasena ? "$9" : "$8"}
      RETURNING *
    `;

    const values = [
      usuario.usu_nombre_usuario,
      usuario.usu_email,
      usuario.fk_rol_id,
      usuario.fk_per_id || null,
      usuario.fk_cjd_id || null,
      usuario.fk_ctn_id || null,
      usuario.fk_com_id || null,
    ];

    if (usuario.usu_contrasena) {
      values.push(usuario.usu_contrasena);
    }
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM usuario WHERE usu_id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
