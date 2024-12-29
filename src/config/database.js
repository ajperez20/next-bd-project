import pkg from 'pg';
import dotenv from 'dotenv';

const {Pool} = pkg;
dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
})

pool.on('connect', () => {
    console.log('Base de datos conectada exitosamente')
})

pool.on('error', (err) => {
    console.error('Error en la conexión de la base de datos:', err)
})

export default pool