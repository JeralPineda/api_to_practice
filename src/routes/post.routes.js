import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validateImage } from '../middlewares/validate-file.js';
import { deletePost, getPost, getPosts, newPost, updatePost } from '../controllers/posts.controller.js';

const router = Router();

router.get('/', validarJWT, getPosts);

router.get(
  '/:id',
  [
    //
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
  ],
  getPost
);

router.post(
  '/',

  [
    //
    validarJWT,
    validateImage,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  newPost
);

router.put(
  '/:id',
  [
    //
    validarJWT,
    validateImage,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  updatePost
);

router.delete(
  '/:id',
  [
    //
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
  ],
  deletePost
);

export default router;
