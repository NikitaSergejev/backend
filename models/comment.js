import db from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import Galery from "./galery.js";
import User from './user.js';

class Comment extends Model {}
Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        body_text:{type: DataTypes.STRING},
        postId:{type: DataTypes.INTEGER},
        userId:{type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'comment',
        freezeTableName: true,
        modelName: 'Comment',
        timestamps: true,
    },
);
//определим связи между таблицами
Comment.belongsTo(User,{foreignKey: 'userId', as: 'user'});
User.hasMany(Comment, {as: 'comment', foreignKey: 'userId'});
Comment.belongsTo(Galery,{foreignKey: 'postId', as: 'galery'});
Galery.hasMany(Comment, {as: 'galery', foreignKey: 'postId'});

export default Comment;