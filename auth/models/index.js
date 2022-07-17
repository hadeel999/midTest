'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const realestate=require("./houses");
const usersModel=require("./userModel");
const Collection=require("./data-collection");

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const houses = realestate(sequelize, DataTypes);
const users = usersModel(sequelize,DataTypes);


users.hasMany(houses, {
    foreignKey: "user_name",
    sourceKey: "username"
});

houses.belongsTo(users, {
    foreignKey: "user_name",
    targetKey: "username",
});


module.exports = {
    sequelize:sequelize,
    DataTypes:DataTypes,
    realestate: new Collection(houses),
    users: users,
}; 