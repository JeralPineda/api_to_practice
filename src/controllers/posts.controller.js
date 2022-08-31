import fs from 'fs-extra';
import Post from '../models/Post.js';
import { deleteImage, uploadImage } from '../libs/cloudinary.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    // Verificar que el post con el id exista en la DB
    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: `No existe el post con el id: ${id}`,
      });
    }

    res.json({
      ok: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const newPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;

    // Si la imagen viene se guarda en cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);

      // Eliminar la imagen después de guardar en cloudinary
      await fs.remove(req.files.image.tempFilePath);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newPost = new Post({ title, description, image });

    // Guardar en la DB
    await newPost.save();

    res.status(201).json({
      ok: true,
      newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // get post
    const post = await Post.findById(id);

    // Verificar que el post con el id exista en la DB
    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: `No existe el post con el id: ${id}`,
      });
    }

    // Si viene una nueva imagen desde el body se elimina la antigua de cloudinary
    if (post && req.files?.image && post.image.public_id) {
      // Eliminar la imagen de cloudinary
      await deleteImage(post.image.public_id);
    }

    // Si la imagen viene se guarda en cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);

      // Eliminar la imagen después de guardar en cloudinary
      await fs.remove(req.files.image.tempFilePath);

      // Agregando nueva imagen
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Se actualiza el post
    const postUpdated = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    res.json({
      ok: true,
      postUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    //  Validar si el post tiene imagen
    if (post && post.image.public_id) {
      // Eliminar la imagen de cloudinary
      await deleteImage(post.image.public_id);
    }

    // Verificar que el post con el id exista en la DB
    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: `No existe el post con el id: ${id}`,
      });
    }

    res.json({
      ok: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      oK: false,
      msg: 'Ocurrió un error,hable con el administrador',
    });
  }
};
