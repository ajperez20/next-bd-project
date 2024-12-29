import fs from 'fs';
import path from 'path';
import pool from './database.js';

async function runMigrations() {
    try {
        // Obtener archivos de migración
        const migrationsDir = path.join(process.cwd(), 'migrations');
        const files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort();

        console.log('Iniciando migraciones...\n');

        // Ejecutar cada migración
        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');

            console.log(`Ejecutando: ${file}`);
            await pool.query(sql);
        }

        console.log('\nMigraciones completadas con éxito');
        await pool.end();
        process.exit(0);

    } catch (error) {
        console.error('\nError en migraciones:', error.message);
        await pool.end();
        process.exit(1);
    }
}

// Ejecutar migraciones
runMigrations().then(r => r);