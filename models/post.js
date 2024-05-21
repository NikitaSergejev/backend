import db from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import User from './user.js';

class Post extends Model {}
Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        title:{type: DataTypes.STRING},
        description:{type: DataTypes.STRING},
        image: {type: DataTypes.STRING},
        userId:{type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'news',
        freezeTableName: true,
        modelName: 'Post',
        timestamps: true,
    },
);
//определим связи между таблицами
Post.belongsTo(User,{foreignKey: 'userId', as: 'user'});
User.hasMany(Post, {as: 'news', foreignKey: 'userId'});

export default Post;