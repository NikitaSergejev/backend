import { Sequelize } from "sequelize";

const db = new Sequelize('photo_world_jktv22', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

export default db;