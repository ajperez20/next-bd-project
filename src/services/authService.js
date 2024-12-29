import pool from "../config/database";

export const authService = {
  login: async (email, password) => {
    const query = `
                SELECT usu_id, usu_email
                FROM USUARIO
                WHERE usu_email = $1
                  AND usu_contrasena = $2
            `;
    const result = await pool.query(query, [email, password]);
    return result.rows[0];
  },

  getUserById: async (id) => {
    const query = "SELECT usu_id, usu_email FROM USUARIO WHERE usu_id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
