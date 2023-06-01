const {DataTypes, Model} = require('sequelize');
const sequelize = require("@/core/dbConnection.js");

class Customer extends Model {}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Active', 'Blocked'],
            allowNull: false,
            defaultValue: 'Active',
            index: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nip: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        modelName: 'Customer',
        sequelize,
        tableName: 'customers'
    }
);

module.exports = Customer;