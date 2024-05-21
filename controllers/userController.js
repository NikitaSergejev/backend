import Users from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import { where } from "sequelize";

//create new user
export const Register = async (req, res) => {
    try{
        //читаем данные, переданные для регистрации (из формы)
        const {name, email, password, confPassword, avatarUrl} = req.body;

        // Проверка на количество символов для имени
        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({ msg: 'Имя должно содержать от 3 до 20 символов' });
        }

        // Проверка на количество символов для email
        if (email.length < 6 || email.length > 30) {
            return res.status(400).json({ msg: 'Email должен содержать от 6 до 30 символов' });
        }

        // Проверка на количество символов для пароля
        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({ msg: 'Пароль должен содержать от 6 до 20 символов' });
        }
        
        // Проверка, существует ли пользователь с таким email
        const existingEmailUser = await Users.findOne({ where: { email: email } });
        if (existingEmailUser) {
            return res.status(400).json({ msg: 'Пользователь с такой электронной почтой уже зарегистрирован' });
        }

        // Проверка, существует ли пользователь с таким именем
        const existingNameUser = await Users.findOne({ where: { name: name } });
        if (existingNameUser) {
            return res.status(400).json({ msg: 'Пользователь с таким именем уже зарегистрирован' });
        }
        //проверка и подтверждение пароля
        if(password !== confPassword){
            return res.status(400).json({msg: 'Password и Confirm Password не совпадают'});
        }
        //шифруем пароль
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        //проверка Inser Into
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            avatarUrl: avatarUrl,
        }).then((response) => {
            const userid = response.id;
            //------------jwt создаём токен
            const token = jwt.sign({ id: userid}, 'secretword2023',{
                //no valid 30d
                expiresIn: '30d',
            });
            //------------end jwt
            //Output result
            res.json({ userid, token});
        });
    }
    catch (error) {
        console.log(error);
    }
};
//Login
export const Login = async (req, res) => {
    try{
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });
        //controll password
        const isValidPass = await bcrypt.compare(req.body.password, user[0].password);
        if (!isValidPass) return res.status(400).json({ msg: 'Неправильный пароль'});
        
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const avatar = user[0].avatarUrl;

        //-----jwt.sign создание токена-исп для аутентификации/авторизации пользователей
        const token =jwt.sign({userId, name, email, role, avatar}, 'secretword2023',{
            expiresIn: '30d',//no valid 30d
        });
        // Приветственное сообщение в заголовках ответа
        res.setHeader('Welcome-Message', 'Hello, ' + name);
        //-----cokie -----
        res.cookie('token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        //output 
        res.json({userId, name, role, token, avatar});
    }catch(error) {
        res.status(404).json({ msg: 'Email не найден' });
    }
}; 
//Profile
export const getMe = async (req, res) => {
    try{
        //читаем переданные данные из checkAuth - req.userId 
        const user = await Users.findAll({
            where: {
                id:req.userId,
            },
        });
        /*console.log(req.userId);
        console.log("Hi");*/
       if(!user){
            return res.status(404).json({
                message: 'User not found',
            });
        } 
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const avatar = user[0].avatarUrl;
        res.json({userId, name, email, role, avatar});
        
    }catch(err) {
        return res.status(403).json({
            message: 'No access query',
        });
    }
};
//Update user
export const updateUser = async(req, res) =>{
    const useRID= req.userId;//Auth
    console.log(useRID);
    try{
        
        const { password, confPassword } = req.body;
       
        //проверка и подтверждение пароля
        if(password !== confPassword){
            return res.status(400).json({msg: 'Password and Confirm Password не совпадают'});
        }
        if(!password || !confPassword){
            return res.status(400).json({msg: 'input password'});
        }
        //шифруем пароль
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
         


    
        
        await Users.update(
            { ...req.body, password: hashPassword },
            {
                where: { id: useRID }, 
            }
        );
        //получаем обновлённого пользователя
        const updatedUserData = await Users.findAll({
            where:{
                id: req.userId,     // уникальный идентификатор пользователя
            }
        });
       // console.log('Updated user data:', updatedUserData); 
        const userId = updatedUserData[0].id;
        const name = updatedUserData[0].name;
        const email = updatedUserData[0].email;
        const role = updatedUserData[0].role;
        const avatar = updatedUserData[0].avatarUrl;
        if (!avatar){
            return res.status(400).json({msg: 'введите avatarUrl'});
        }
        if (!name){
            return res.status(400).json({msg: 'введите имя'});
        }
        
        //Создаём новый токен      
        const token =jwt.sign({userId, name, email, role, avatar}, 'secretword2023',{
            expiresIn: '30d',//no valid 30d
        });
        //Отправляем ответ с обновлёнными данными и новым токеном
        res.json({updatedUserData, token});        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Серверная ошибка' });
      }
};
    
//all users list
export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email','role'],
        });
        res.json(users);
    }catch(error){
        console.log(error);
    }
};