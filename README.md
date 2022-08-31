# API de POSTS con Login para practicar

## Instalación

** Clonar Repositorio (SSH) **

```
git clone git@github.com:JeralPineda/api_to_practice.git

```

Navegar al directorio y reconstruir los módulos de node:

```
npm install

```

Renombrar archivo `.env.example` por `.env` y configurar las variables de entorno

```
# Puerto del servidor
PORT=4000

# Conexion MongoDB
MONGODB_URI=

# Credenciales Cloudinary
CLOUD_NAME=
API_KEY=
API_SECRET=

# Llave para generar los token de autenticacion
SECRETORPRIVATEKEY=

```

## Endopoints de la API

**Posts**

- GET: ` https://localhost:4000/api/posts`

- GET: ` https://localhost:4000/api/posts/id`

- POST ` https://localhost:4000/api/posts`

- PUT ` https://localhost:4000/api/posts/:id`

- DELETE ` https://localhost:4000/api/posts/:id`

**Login**

- POST: ` https://localhost:4000/api/auth/login`

- POST ` https://localhost:4000/api/auth/register`

- PUT ` https://localhost:4000/api/auth/:id`

- DELETE ` https://localhost:4000/api/auth/:id`
