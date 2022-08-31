import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import postRouter from './routes/post.routes.js';

const app = express();

// middlewares

// CORS (connectar con FrontEnd)
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// FileUpload - Carga de archivos
app.use(
  fileUpload({
    useTempFiles: true, // pase por carpeta
    tempFileDir: './upload', // carpeta a guardar
    createParentPath: true,
  })
);

// Rutas
app.use('/api/posts', postRouter);

export default app;
