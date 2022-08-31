import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { loginUser, registerUser, revalidarToken } from '../controllers/user.controller.js';

const router = Router();

router.post(
  '/login',
  [
    // middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.post(
  '/register',
  [
    // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  registerUser
);

router.get('/renew', validarJWT, revalidarToken);

export default router;
