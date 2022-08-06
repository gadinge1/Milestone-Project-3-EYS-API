'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ SalesOrder }) {
      // sales order
      Product.hasMany(SalesOrder, {
        foreignKey: "user_id",
        as: "sales_orders"
      })
    }
  }
  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    category: {
      type: DataTypes.STRING,
      allowNull: false
  },
    description: {
      type: DataTypes.STRING,
      allowNull: false
  },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
  },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
  },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products',
  timestamps: false
})
return Product
}