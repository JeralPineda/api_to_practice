import jwt from 'jsonwebtoken';

/**
 * Función para validar el token que viene en la peticiones, desde el header, valida que venga el token y si es valido
 * @param {*} req son los valores que vienen desde el body
 * @param {*} res respuesta si hay un error, objeto de arreglos
 * @param {*} next si no hay error deja continuar
 */
export const validarJWT = (req, res = response, next) => {
  // obtener el token desde el header
  const xtoken = req.header('x-token');
  let token;

  // Pasar el Bearer a mayúsculas por si se recibe en minúsculas
  if (xtoken && xtoken.toLowerCase().startsWith('bearer')) {
    // extraemos la palabra Bearer del token
    token = xtoken.split(' ')[1];
  }

  //    verificar que exista el token
  if (!token || !xtoken) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.user = payload;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Acceso no valido, la sesión caduco',
    });
  }

  next();
};
