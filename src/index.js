import { dbConnection } from './database/db.js';
import { PORT } from './config.js';
import app from './app.js';

// Conexión a MongoDB
dbConnection();

app.listen(PORT);
console.log(`Servidor corriendo en el puerto`, PORT, `🚀`);
