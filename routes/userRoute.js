import express from 'express';
import { Register, Login, getMe, getUsers, updateUser } from '../controllers/userController.js';
import { registerValidation, loginValidation } from '../validations/validation.js';
import { handleValidationErrors } from '../validations/handleValidationErrors.js';
import { checkAuth } from '../validations/checkAuth.js';

const userrouter = express.Router();

userrouter.post('/auth/register', registerValidation, handleValidationErrors, Register);//create - register
userrouter.post('/auth/login', loginValidation, handleValidationErrors, Login);//login
userrouter.patch('/auth/update', checkAuth,  updateUser);//Update
userrouter.get('/auth/me', checkAuth, getMe);//user - profile
userrouter.get('/auth/allusers', checkAuth, getUsers);//all users

export default userrouter;