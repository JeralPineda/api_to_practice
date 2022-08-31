import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import postRouter from './routes/post.routes.js';
import authRouter from './routes/user.routes.js';

const app = express();

// middlewares

// CORS (connectar con FrontEnd)
app.use(cors());

// Morgan
app.use(morgan('dev'));

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
app.use('/api/auth', authRouter);

export default app;
