import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import { generarJWT } from '../helpers/generar-jwt.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario con ese email, no existe',
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      id: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({ email });

    // Validar si ya existe un usuario con ese email
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe',
      });
    }

    usuario = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      id: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const revalidarToken = async (req, res = response) => {
  // Obtener user desde el token
  const { id, name } = req.user;

  // Generar JWT
  const token = await generarJWT(id, name);

  res.json({
    ok: true,
    id,
    name,
    token,
  });
};
