'use strict';
module.exports = (sequelize, DataTypes) => {
    var users = sequelize.define('users', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        fname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lname: DataTypes.STRING,
        dob: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return users;
};