import pool from "../config/database";

export const cargoService = {
  getAll: async () => {
    const query = `
                SELECT 
                    car_id as id,
                    car_nombre as nombre,
                    car_descripcion as descripcion,
                    COUNT(ec.fk_per_id) as cantidad_empleados
                FROM cargo c
                LEFT JOIN empleado_cargo ec ON c.car_id = ec.fk_car_id
                GROUP BY car_id, car_nombre, car_descripcion
                ORDER BY car_id
            `;
    const result = await pool.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
                SELECT 
                    car_id as id,
                    car_nombre as nombre,
                    car_descripcion as descripcion
                FROM cargo
                WHERE car_id = $1
            `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  create: async (cargo) => {
    const query = `
                INSERT INTO cargo (car_nombre, car_descripcion)
                VALUES ($1, $2)
                RETURNING 
                    car_id as id,
                    car_nombre as nombre,
                    car_descripcion as descripcion
            `;
    const values = [cargo.nombre, cargo.descripcion];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, cargo) => {
    const query = `
                UPDATE cargo 
                SET car_nombre = $1, car_descripcion = $2
                WHERE car_id = $3
                RETURNING 
                    car_id as id,
                    car_nombre as nombre,
                    car_descripcion as descripcion
            `;
    const values = [cargo.nombre, cargo.descripcion, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = "DELETE FROM cargo WHERE car_id = $1";
    await pool.query(query, [id]);
    return true;
  },

  // Método adicional para obtener empleados por cargo
  getEmpleadosByCargo: async (cargoId) => {
    const query = `
                SELECT 
                    e.per_id as id,
                    e.per_nombre as nombre,
                    e.per_apellido as apellido,
                    e.per_profesion as profesion,
                    ec.emc_fecha_inicio as fecha_inicio,
                    ec.emc_fecha_fin as fecha_fin
                FROM empleado e
                JOIN empleado_cargo ec ON e.per_id = ec.fk_per_id
                WHERE ec.fk_car_id = $1
                ORDER BY ec.emc_fecha_inicio DESC
            `;
    const result = await pool.query(query, [cargoId]);
    return result.rows;
  },
};
