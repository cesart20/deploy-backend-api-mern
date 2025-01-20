# API de Gestión de Publicaciones y Usuarios

Este proyecto proporciona una API para gestionar usuarios y publicaciones utilizando **Node.js**, **Express**, **MongoDB** y **JWT** para autenticación.

## Requisitos previos

- **Node.js** (preferentemente la versión 20 o superior)
- **MongoDB** (debe estar corriendo en tu máquina o puedes usar MongoDB Atlas)

## Instalación

1. **Clona este repositorio:**
```bash 
    https://github.com/cesart20/api-rest-mern
```

2. **Configuración del entorno:**
crear db en mongo y cambiar dbName: 'demo_db'
SECRET=tu_clave_secreta

   ```bash
    npm run dev
    ```

3. **Acceder a la Documentación Swagger:**
   ```bash
    http://localhost:4000/api-docs
    ```




## Rutas Disponibles

### Usuarios

- **POST** `/api/users/register`: Crear un nuevo usuario (requiere `email` y `password` en el cuerpo de la solicitud).
- **POST** `/api/users/login`: Iniciar sesión con un usuario existente (requiere `email` y `password` en el cuerpo de la solicitud y devuelve un token JWT).

### Publicaciones

- **GET** `/api/posts`: Obtener todas las publicaciones.
- **POST** `/api/posts`: Crear una nueva publicación (requiere autenticación con JWT).
- **GET** `/api/posts/user`: Obtener las publicaciones del usuario autenticado (requiere autenticación con JWT).
- **PUT** `/api/posts/{id}`: Actualizar una publicación existente (requiere autenticación con JWT).
- **DELETE** `/api/posts/{id}`: Eliminar una publicación (requiere autenticación con JWT).

