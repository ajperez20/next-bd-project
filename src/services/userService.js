import db from '@/db';

export async function getAllUsers() {
    const result = await db.query('SELECT * FROM USUARIO ORDER BY usu_id');
    return result.rows;
}