# Frontend - Red Social

Una aplicación web de red social desarrollada con React y Vite como proyecto académico para las materias **Construcción de Interfaces** y **Estrategias De Persistencia** de la Universidad Nacional de Hurlingham (UNAHUR).

## Contexto Académico

- **Universidad**: Universidad Nacional de Hurlingham (UNAHUR)
- **Materia**: Estrategia de Persistencia
- **Año**: 2025
- **Proyecto**: Sistema completo de red social con frontend y backend

## Integrantes

- Gonzalvez Chala, Victor.
- Ledezma, Gabriel.
- Santana, Lucas.
- Viltez, Hernan.

## Características

- **Autenticación completa**: Registro e inicio de sesión de usuarios
- **Gestión de posts**: Crear, editar y eliminar publicaciones
- **Sistema de comentarios**: Interacción entre usuarios
- **Perfiles personalizados**: Visualización y edición de perfiles
- **Sistema de etiquetas**: Categorización de contenido
- **Interfaz responsiva**: Diseño adaptable con Bootstrap
- **SPA (Single Page Application)**: Navegación fluida sin recargas

## Tecnologías

- React 19.1.0
- Vite 6.3.5
- React Router DOM
- Bootstrap 5.3.7

## Arquitectura del Proyecto

Este frontend forma parte de una arquitectura completa que incluye:

- **Frontend**: React con Vite (este repositorio)
- **Backend**: API REST con Node.js y Express
- **Base de datos**: MongoDB con Mongoose
- **Contenedores**: Docker para el entorno de desarrollo

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

```
src/
├── components/           # Componentes reutilizables
│   ├── functions/       # Funciones de API (CRUD)
│   ├── home/           # Componentes de página inicio
│   ├── profile/        # Componentes de perfil
│   └── FormLogin-components/ # Componentes de formularios
├── pages/              # Páginas principales de la aplicación
├── context/            # Contextos de React para manejo de estado
├── config/             # Configuración de la API
└── assets/             # Recursos estáticos (imágenes, etc.)
```


## Nota

Asegúrate de tener el backend de la red social ejecutándose antes de iniciar el frontend.
