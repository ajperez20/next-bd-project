import pool from "../config/database";

export const materiaPrimaService = {
  getAll: async () => {
    const query = `
            SELECT
                mps.mtp_id as id,
                mp.rpm_nombre,
                mp.rpm_descripcion,
                mps.mtp_unidad_medida,
                mps.mtp_cantida_disponible as cantidad_disponible
            FROM proveedor_mp_stock mps
                     JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
            ORDER BY mp.rpm_nombre
        `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
            SELECT
                mps.mtp_id as id,
                mp.rpm_nombre,
                mp.rpm_descripcion,
                mps.mtp_unidad_medida,
                mps.mtp_cantida_disponible as cantidad_disponible
            FROM proveedor_mp_stock mps
                     JOIN materia_prima mp ON mps.fk_rpm_id = mp.rpm_id
            WHERE mps.mtp_id = $1
        `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (materiaPrima) => {
    const query = `
            INSERT INTO proveedor_mp_stock (
                fk_rpm_id,
                mtp_unidad_medida,
                mtp_cantida_disponible
            )
            VALUES ($1, $2, $3)
            RETURNING mtp_id as id
        `;
    const result = await pool.query(query, [
      materiaPrima.fk_rpm_id,
      materiaPrima.mtp_unidad_medida,
      materiaPrima.mtp_cantida_disponible,
    ]);
    return result.rows[0];
  },

  update: async (id, materiaPrima) => {
    const query = `
            UPDATE proveedor_mp_stock
            SET
                fk_rpm_id = $1,
                mtp_unidad_medida = $2,
                mtp_cantida_disponible = $3
            WHERE mtp_id = $4
            RETURNING mtp_id as id
        `;
    const result = await pool.query(query, [
      materiaPrima.fk_rpm_id,
      materiaPrima.mtp_unidad_medida,
      materiaPrima.mtp_cantida_disponible,
      id,
    ]);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM proveedor_mp_stock WHERE mtp_id = $1";
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  },
};
