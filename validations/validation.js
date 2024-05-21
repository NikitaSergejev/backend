import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Error email format').isEmail(),
    body('password', 'Error password length (min 6 symbols)').isLength({min: 6}),
    body('name', 'Name min 3 symbols').isLength({min: 3}),
    body('avatarUrl', 'Error image link').optional().isURL(),
];
//login user
export const loginValidation = [
    body('email', 'Error email format').isEmail(),
    body('password', 'Password min 6 symbols').isLength({min: 6}),
];