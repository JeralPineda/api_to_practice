import { validationResult } from 'express-validator';

/**
 * Función para validar los campos que vienen desde el FrontEnd (Body)
 * @param {*} req son los valores que vienen desde el body
 * @param {*} res respuesta si hay un error, objeto de arreglos
 * @param {*} next si no hay error deja continuar
 */
export const validarCampos = (req, res, next) => {
  //validación de los campos
  const errors = validationResult(req);

  //Si no viene el valor o no es correcto dispara el mensaje de error
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // Si es correcto pasa al siguiente middleware
  next();
};
