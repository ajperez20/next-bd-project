import pool from "../config/database";

export const lugarService = {
  getAll: async () => {
    const query = `
      WITH RECURSIVE lugar_jerarquia AS (
        -- Caso base: lugares sin padre (nivel superior)
        SELECT
          l.lug_id,
          l.lug_nombre,
          l.lug_tipo,
          l.fk_lug_id,
          CAST(l.lug_nombre AS VARCHAR) as lugar_completo,
          1 as nivel,
          ARRAY[l.lug_id] as path_ids
        FROM lugar l
        WHERE l.fk_lug_id IS NULL

        UNION ALL

        -- Caso recursivo: unir con lugares hijos
        SELECT
          l.lug_id,
          l.lug_nombre,
          l.lug_tipo,
          l.fk_lug_id,
          CAST(lj.lugar_completo || ' > ' || l.lug_nombre AS VARCHAR),
          lj.nivel + 1,
          lj.path_ids || l.lug_id
        FROM lugar l
               INNER JOIN lugar_jerarquia lj ON l.fk_lug_id = lj.lug_id
      )
      SELECT
        lug_id,
        lug_nombre,
        lug_tipo,
        fk_lug_id,
        lugar_completo,
        nivel
      FROM lugar_jerarquia
      ORDER BY path_ids
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT
        l.lug_id,
        l.lug_nombre,
        l.lug_tipo,
        l.fk_lug_id,
        p.lug_nombre as lugar_padre
      FROM lugar l
             LEFT JOIN lugar p ON l.fk_lug_id = p.lug_id
      WHERE l.lug_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (lugar) => {
    const query = `
      INSERT INTO lugar (lug_nombre, lug_tipo, fk_lug_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [lugar.nombre, lugar.tipo, lugar.lugar_padre_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, lugar) => {
    const query = `
            UPDATE lugar 
            SET lug_nombre = $1,
                lug_tipo = $2,
                fk_lug_id = $3
            WHERE lug_id = $4
            RETURNING *
        `;
    const values = [lugar.nombre, lugar.tipo, lugar.lugar_padre_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM lugar WHERE lug_id = $1";
    await pool.query(query, [id]);
    return true;
  },
};
