import { Pool } from "pg";

const pool = new Pool({
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  user: process.env.DB_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
});

export default pool;
