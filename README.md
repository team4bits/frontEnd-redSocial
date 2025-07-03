# Frontend - Red Social

Una aplicación web de red social desarrollada con React y Vite.

## Características

- Registro e inicio de sesión de usuarios
- Crear, editar y eliminar posts
- Sistema de comentarios
- Perfiles de usuario
- Interfaz responsiva con Bootstrap

## Tecnologías

- React 19.1.0
- Vite 6.3.5
- React Router DOM
- Bootstrap 5.3.7

## Instalación

1. Clonar el repositorio del front y del back.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Correr el docker:
   ```bash
   docker compose up
   ```
4. Ejecutar las semillas en el back:
   ```bash
   npm run db
   ```
5. Ejecutar en desarrollo el back:
   ```bash
   npm run dev
   ```
6. Ejecutar en desarrollo el front:
   ```bash
   npm run dev
   ```

## Configuración

La aplicación estará disponible en `http://localhost:5173`

El frontend se conecta al backend en `http://localhost:3001` por defecto.

Para cambiar la configuración, crear un archivo `.env`:
```env
VITE_API_URL=http://localhost
VITE_API_PORT=3001
```

## Estructura del proyecto

- `src/components/` - Componentes reutilizables
- `src/pages/` - Páginas principales de la aplicación
- `src/context/` - Contextos de React para manejo de estado
- `src/config/` - Configuración de la API

## Nota

Asegúrate de tener el backend de la red social ejecutándose antes de iniciar el frontend.
