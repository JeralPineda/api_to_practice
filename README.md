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

- GET: ` https://jeral-api-practice.herokuapp.com/api/posts`

- GET: ` https://jeral-api-practice.herokuapp.com/api/posts/id`

- POST ` https://jeral-api-practice.herokuapp.com/api/posts`

- PUT ` https://jeral-api-practice.herokuapp.com/api/posts/:id`

- DELETE ` https://jeral-api-practice.herokuapp.com/api/posts/:id`

**Login**

- POST: ` https://jeral-api-practice.herokuapp.com/api/auth/login`

- POST ` https://jeral-api-practice.herokuapp.com/api/auth/register`

- GET ` https://jeral-api-practice.herokuapp.com/api/renew`
