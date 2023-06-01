const {Data, Model, DataTypes} = require('sequelize');
const sequelize = require('@/core/dbConnection.js');

const Users = sequelize.define('Users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
    },
    {
        tableName: 'users'
    }
);

Users.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = Users;