'use strict';
require("dotenv").config();


const usersModel = (sequelize, DataTypes) => sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user','admin'),
        defaultValue: 'user',
      },
      token: {
        type: DataTypes.VIRTUAL,
      //  get() {return jwt.sign({ username: this.username }, SECRET);
     // }
      },
      actions:{
        type: DataTypes.VIRTUAL,
        get() {
            const acl ={
                user: ['read','createPosts','updateHisPosts','deleteHisPosts'],
                admin: ['read','deleteAnyPosts','deleteUsers']
            }
            return acl[this.role];
        }
      }      
},{ 
    sequelize,
    tableName: 'users',
    timestamps: false,
    });
    
module.exports = usersModel;