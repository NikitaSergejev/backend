import db from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import Gener from "./gener.js";
import User from './user.js';

class Galery extends Model {}
Galery.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        title:{type: DataTypes.STRING},
        generId:{type: DataTypes.INTEGER},
        description:{type: DataTypes.STRING},
        image: {type: DataTypes.STRING},
        userId:{type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'galery',
        freezeTableName: true,
        modelName: 'Galery',
        timestamps: true,
    },
);
//определим связи между таблицами
Galery.belongsTo(Gener,{foreignKey: 'generId', as: 'geners'});
Gener.hasMany(Galery, {as: 'galery', foreignKey: 'generId'});
Galery.belongsTo(User,{foreignKey: 'userId', as: 'user'});
User.hasMany(Galery, {as: 'galery', foreignKey: 'userId'});

export default Galery;