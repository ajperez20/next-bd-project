import fs from 'fs';
import path from 'path';
import db from './index.js';
(async function runMigrations() {
    try {
        const migrationsDir = path.join(process.cwd(), 'migrations');
        const files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            console.log(`Ejecutando migración: ${file}`);
            await db.query(sql);
        }

        console.log('Migraciones ejecutadas con éxito');
        process.exit(0);
    } catch (error) {
        console.error('Error en migraciones:', error);
        process.exit(1);
    }
})();