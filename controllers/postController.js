import Post from '../models/post.js';

//получить список всех постов 
export const getAllPosts = async(req, res) => {
    try{
        const posts = await Post.findAll({
            include:['user'],
            where:{},
            order:[['createdAt', 'DESC']],
        });
        res.json(posts);
    }catch(error){
        res.json({message: error.message});
    }
};

export const getPostById = async(req, res) => {
    try{
        const post = await Post.findAll({
        include:['user'],
        where:{id: req.params.id},
    });
    res.json(post[0]);    
    }catch(error){
        res.json({message: error.message});
    }
};
//получить list posts по categoryId + category.name
{/*export const getPostByIdCategory = async(req, res) => {
    try{
        const posts = await Post.findAll({
        include:['user'],
        where:{categoryId: req.params.id},
        order: [['createdAt', 'DESC']],
    });
    res.json(posts);    
    }catch(error){
        res.json({message: error.message});
    }
};*/}
//-----------------------------------------------
//create post
export const createPost = async(req, res) => {
    try{
        await Post.create(req.body);
        res.json({message: 'Post Created'});
    }catch(error){
        res.json({message: error.message});
    }
};

//update
export const updatePost = async(req, res) => {
    try{
        await Post.update(req.body,{
            where: {id: req.params.id},
        });
        res.json({message: 'Post Updated'});
    }catch(error){
        res.json({message: error.message});
    }
};

//delete
export const deletePost = async(req, res) => {
    try{
        await Post.destroy({
            where: {id: req.params.id},
        });
        res.json({message: 'Post Deleted'});
    }catch(error){
        res.json({message: error.message});
    }
};