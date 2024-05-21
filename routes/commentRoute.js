import express from 'express';
import { checkAuth } from '../validations/checkAuth.js';

import { 
    getAllComments,
    getCommentByIdPost,
    createComment,
    deleteComment } 
from '../controllers/commentController.js';

const commentrouter = express.Router(); // Создаем экземпляр маршрутизатора 
commentrouter.get('/:id', getCommentByIdPost);
commentrouter.get('/', getAllComments);

commentrouter.post('/', createComment); // create
//commentrouter.patch('/:id', checkAuth, updateComment); // put
commentrouter.delete('/:id', deleteComment); // delete

export default commentrouter;