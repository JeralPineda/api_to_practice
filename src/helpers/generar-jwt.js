import jwt from 'jsonwebtoken';

/**
 * Función para generar el Token de acceso, para iniciar sesión
 * @param {String} id uuid del usuario logeado
 * @param {String} name nombre del usuario logeado
 * @param {String} tiempo Tiempo (string, 20m, 1h) de expiración del token, es opcional por defecto tiene '40m'
 * @returns {String} Token
 */
export const generarJWT = (id, name, tiempo = '40m') => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };

    // Generar el token
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: tiempo,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el jsonwebtoken');
        } else {
          resolve(token);
        }
      }
    );
  });
};
