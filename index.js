import express from 'express';
//import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import generRouter from './routes/generRoute.js';
import galeryRouter from './routes/galeryRoute.js';
import commentrouter from './routes/commentRoute.js';
//-------------------
import imageRouter from './routes/imageRoute.js';
//--------------
const app = express();
//-------------- соединение с БД
try{
    await db.authenticate();
    console.log('Database connected...');
    } catch (error) {
      console.error('Connection error:', error);
    }
//----------------
//передавать данные в FRONTEND
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Welcome');
});
//-------------------routes
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/geners', generRouter);
app.use('/galery', galeryRouter);
app.use('/image', imageRouter);
app.use('/comments', commentrouter);
//-------------------


//---------------------
app.listen(5000, () => console.log('Server OK, running at port 5000'));