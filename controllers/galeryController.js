import Galery from '../models/galery.js';

//получить список всех постов и жанр
export const getAllPostsGalery = async(req, res) => {
    try {
        const posts = await Galery.findAll({
          include: ['geners', 'user'],
          where: {},
          order: [['createdAt', 'DESC']],       
        });
    
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
//получить одну запись по ид + gener.name
export const getPostById = async(req, res) => {
    try{
        const post = await Galery.findAll({
        include:['geners','user'],
        where:{id: req.params.id},
    });
    res.json(post[0]);    
    }catch(error){
        res.json({message: error.message});
    }
};
//получить list posts по generId + gener.name
export const getPostByIdGener = async(req, res) => {
    try{
        const posts = await Galery.findAll({
        include:['geners','user'],
        where:{generId: req.params.id},
        order: [['createdAt', 'DESC']],
    });
    res.json(posts);    
    }catch(error){
        res.json({message: error.message});
    }
};
//-----------------------------------------------
//create post
/*export const createPostGalery = async(req, res) => {
    try {
        const { title, description, genre, image } = req.body;

        // Проверка на обязательные поля
        if (!title || !description || !image) {
            return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
        }

        // Проверка длины описания
        if (description.length < 250) {
            return res.status(400).json({ message: 'Описание поста должно содержать не менее 250 символов' });
        }

        // Проверка формата изображения
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedFormats.includes(image.type)) {
            return res.status(400).json({ message: 'Фотография должна быть в форматах JPEG, JPG или PNG' });
        }

        // Проверка максимального размера изображения
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (image.size > maxSize) {
            return res.status(400).json({ message: 'Максимальный размер изображения - 10MB' });
        }

        // Проверка на содержание запрещенных элементов в заголовке и описании
        /*const forbiddenWords = ['ненормативная лексика', 'контент для взрослых', 'порнография'];
        const containsForbiddenWords = forbiddenWords.some(word => title.includes(word) || description.includes(word));
        if (containsForbiddenWords) {
            return res.status(400).json({ message: 'Заголовок или описание содержат запрещенные элементы' });
        }*/

        // Проверка на содержание запрещенных элементов на фотографии
       /* const forbiddenElements = ['насилие', 'жестокость', 'нелегальные вещества', 'сексуальные изображения', 'религиозная пропаганда', 'политическая пропаганда', 'алкоголь', 'наркотики'];
        const containsForbiddenElements = forbiddenElements.some(element => description.includes(element));
        if (containsForbiddenElements) {
            return res.status(400).json({ message: 'Фотография содержит запрещенные элементы' });
        }

        // Создание поста
        await Galery.create(req.body);
        res.json({ message: 'Пост в галерее успешно создан' });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};*/

export const createPostGalery = async(req, res) => {
    try{
        await Galery.create(req.body);
        res.json({message: 'Post In Galery Created'});
    }catch(error){
        res.json({message: error.message});
    }
};

//update
export const updatePostGalery = async(req, res) => {
    try{
        await Galery.update(req.body,{
            where: {id: req.params.id},
        });
        res.json({message: 'Post In Galery Updated'});
    }catch(error){
        res.json({message: error.message});
    }
};

//delete
export const deletePostGalery = async(req, res) => {
    try{
        await Galery.destroy({
            where: {id: req.params.id},
        });
        res.json({message: 'Post In Galery Deleted'});
    }catch(error){
        res.json({message: error.message});
    }
};