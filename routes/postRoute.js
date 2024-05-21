import express from 'express';
import {jwtDecode} from 'jwt-decode';


import {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost,
} from '../controllers/postController.js';
// Middleware для проверки роли
const checkAdminRole = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).send('Permission denied');
    }  
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        next();
      } else {
        return res.status(403).send('Permission denied');
      }
    } catch (error) {
      return res.status(403).send('Invalid token');
    }
  };
const postrouter = express.Router();
//для всех пользователей
postrouter.get('/', getAllPosts);
postrouter.get('/:id', getPostById);//id-post

//для админа
postrouter.post('/', checkAdminRole, createPost); 
postrouter.patch('/:id',checkAdminRole, updatePost);//put
postrouter.delete('/:id',checkAdminRole, deletePost);

export default postrouter;
