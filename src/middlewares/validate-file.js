import { request } from 'express';
import fs from 'fs-extra';

export const validateImage = async (req = request, res, next) => {
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

  const extension = req.files?.image.name.split('.')[1];

  if (req.files?.image && !extensionesValidas.includes(extension)) {
    // Removemos el archivo de la carpeta uploads
    await fs.remove(req.files.image.tempFilePath);

    return res.status(400).json({
      ok: false,
      msg: `La extensión ${extension} no es permitida - ${extensionesValidas}`,
    });
  }

  next();
};
