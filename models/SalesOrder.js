'use strict';
const {
  Model
} = require('sequelize');
const Account = require('./Account');
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Product, Account }) {
      // products
      SalesOrder.hasMany(Product, {
        foreignKey: "product_id",
        as: "products"
      })
      // customer
      SalesOrder.hasMany(Account, {
        foreignKey: "account_id",
        as: "accounts"
      })
    }
  }
  SalesOrder.init({
    salesOrder_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false
  },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: false
  },
    
}, {
  sequelize,
  modelName: 'SalesOrder',
  tableName: 'salesorders',
  timestamps: false
})
return SalesOrder
}