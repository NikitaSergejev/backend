import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token){
        try{
            //расшифровываем token
            const decoded = jwt.verify(token, 'secretword2023');
            //передаём id user-> userId 
            req.userId = decoded.userId;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'No access user',
            });
        }
    }else {
        //No access 
        return res.status(403).json({
            message: 'No access ',
        });
    }
};