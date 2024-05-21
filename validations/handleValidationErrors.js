import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    //Если ошибка запрос НЕ выполняется
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    //Если всё ок ->далее
    next();
};