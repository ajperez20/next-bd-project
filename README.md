
# UcabAir
Sistema de gestión para la producción de aviones de UcabAir.

## Requisitos Previos
- Node.js (ver versión en `.nvmrc`)
- PostgreSQL
- npm

## Configuración del Entorno

### Node.js
```bash
nvm use
```

### Instalación de dependencias
```bash
npm install
```

### Variables de entorno
Copia el archivo de ejemplo y configura tus variables:
```bash
cp .env.sample .env
```

Ajusta las siguientes variables en el archivo `.env`:
```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=ucabair_db
DB_PASSWORD=tu_password
DB_PORT=5432
```

## Base de Datos

### Crear la base de datos
```bash
createdb ucabair_db
```

### Ejecutar migraciones
```bash
npm run migrate
```

## Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm start`: Inicia la aplicación en modo producción
- `npm run migrate`: Ejecuta las migraciones de la base de datos

## Tecnologías Principales
- Next.js 14
- PostgreSQL
- Tailwind CSS
- React
- Node.js

## Autor
Arturo Jose Perez Diaz

## Licencia
Este proyecto es privado y de uso exclusivo para Ucab.
