import { Router } from 'express';

import { deletePost, getPost, getPosts, newPost, updatePost } from '../controllers/posts.controller.js';
import { validateImage } from '../middlewares/validate-file.js';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', validateImage, newPost);

router.put('/:id', validateImage, updatePost);

router.delete('/:id', deletePost);

export default router;
