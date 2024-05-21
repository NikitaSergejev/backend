import db from "../config/database.js";
import { DataTypes, Model } from "sequelize";


class Gener extends Model {}
Gener.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING },
    },
    {
        sequelize: db,
        tableName: 'geners',
        freezeTableName: true,
        modelName: 'Gener',
        timestamp: true,
    },
);
export default Gener;