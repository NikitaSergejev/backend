import Comment from "../models/comment.js";

//Получить все комментарии
export const getAllComments = async(req, res) => {
    try {
        const comment = await Comment.findAll({
          include: ['galery', 'user'],
          where: {},
          order: [['createdAt', 'DESC']],         
        });
    
        res.json(comment);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
//получить comment по postId + user.name
export const getCommentByIdPost = async(req, res) => {
    try{
        const comments = await Comment.findAll({
            include:['galery','user'],
            where:{postId: req.params.id},
            order: [['createdAt', 'DESC']],            
    });
    res.json(comments);    
    }catch(error){
        res.json({message: error.message});
    }
};  
//-----------------------------------------------
//create Comment
export const createComment = async(req, res) => {
    try{
        await Comment.create(req.body);
        res.json({message: 'Comment Created'});
    }catch(error){
        res.json({message: error.message});
    }
};

//update
/*export const updateComment = async(req, res) => {
    try{
        await Comment.update(req.body,{
            where: {id: req.params.id},
        });
        res.json({message: 'Comment Updated'});
    }catch(error){
        res.json({message: error.message});
    }
};*/

//delete
export const deleteComment = async(req, res) => {
    try{
        await Comment.destroy({
            where: {id: req.params.id},
        });
        res.json({message: 'Comment Deleted'});
    }catch(error){
        res.json({message: error.message});
    }
};