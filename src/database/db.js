import mongoose from 'mongoose';

import { MONGODB_URI } from '../config.js';

export const dbConnection = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);

    console.log(`Conectado a la DB "${db.connection.name}" ✅`);
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos ❌');
  }
};
