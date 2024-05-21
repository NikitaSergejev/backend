import express from 'express';
import {jwtDecode} from 'jwt-decode';
import { checkAuth } from '../validations/checkAuth.js';
import {
    getAllGeners,
    getGenerById,
    createGener,
    updateGener,
    deleteGener,
}from '../controllers/generController.js';

// Middleware для проверки роли
const checkAdminRole = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ error: 'Permission denied', reason: 'Token not provided' });
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ error: 'Permission denied', reason: 'Insufficient role privileges' });
      }
    } catch (error) {
        return res.status(403).json({ error: 'Permission denied', reason: 'Invalid token' });
    }
    };
 
const generrouter = express.Router(); // Создаем экземпляр маршрутизатора 
generrouter.get('/', getAllGeners);
generrouter.get('/:id', getGenerById);

//admin
generrouter.post('/', checkAuth, checkAdminRole, createGener); // create
generrouter.patch('/:id', checkAuth, checkAdminRole, updateGener); // put
generrouter.delete('/:id', checkAuth, checkAdminRole, deleteGener); // delete

export default generrouter;