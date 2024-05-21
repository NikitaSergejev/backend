import Gener from "../models/gener.js";

//получить список всех категорий
export const getAllGeners = async (req, res) => {
    try{
        const geners = await Gener.findAll();
        res.json(geners);
    }catch(error){
        res.json({message: error.message});
    }
};
//получить одну запись жанра по id 
export const getGenerById = async (req, res) => {
    try{
        const gener = await Gener.findAll({
            where:{id: req.params.id},
        });
        res.json(gener[0]);
    } catch(error) {
        res.json({message: error.message});
    }
};
//create gener 
export const createGener = async (req, res) => {
    try {
        await Gener.create(req.body);
        res.json({
            message: 'Gener created successfully',            
        });
    }catch(error) {
        res.json({message: error.message});
    }
};
//update Gener
export const updateGener = async (req, res) => {
    try {
        await Gener.update(req.body, {
            where: {id: req.params.id},
        });
        res.json({message: 'Category updated successfully'});
    } catch(error) {
        res.json({message: error.message});
    }
};
//delete category
export const deleteGener = async (req, res) => {
    try{
        await Gener.destroy({
            where: {id: req.params.id},
        });
        res.json({message: 'Gener deleted successfully'});
    }catch(error) {
        res.json({message: error.message});
    }
};