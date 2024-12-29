import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

const database_url = "postgres://postgres:mysecretpassword@localhost:5432/next-bd";

const pool = new Pool({
    connectionString: database_url
});

const db = {
    query: (text, params) => pool.query(text, params),
};

export default db;