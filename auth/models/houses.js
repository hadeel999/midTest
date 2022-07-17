'use strict';
const realestate = (sequelize, DataTypes) => 
sequelize.define('realestate', {
    process: {
        type: DataTypes.ENUM('sell','rent'),
        required: true
    },
    category: {
        type: DataTypes.ENUM('houses','apartments','villas','farms','lands'),
        required: true
    }, describtion: {
        type: DataTypes.STRING,
        required: true
    },
    area: {
        type: DataTypes.STRING,
        required: true
    },
    location: {
        type: DataTypes.STRING,
        required: true
    },
    price: {
        type: DataTypes.STRING,
        required: true
    },
    owner: {
        type: DataTypes.STRING,
        required: false
    },
    phone: {
        type: DataTypes.STRING,
        required: true
    },
    details: {
        type: DataTypes.STRING,
        required: false
    },
    /*image: {
        type: DataTypes.STRING,
        required: true
    },*/
    usersID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = realestate;