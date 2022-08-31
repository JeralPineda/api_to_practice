import { v2 as cloudinary } from 'cloudinary';

// Configuración
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Subir imagen a cloudinary
export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'banhcafe',
  });
};

// Eliminar imagen de cloudinary
export const deleteImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
};
