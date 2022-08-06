'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Product, SalesOrder }) {
       // product
      Cart.hasMany( Product, { 
        as: 'products', 
        foreignKey: 'product_id' 
      })
      // sales order
      Cart.hasMany( SalesOrder, { 
        as: 'sales_orders', 
        foreignKey: 'user_id'
     })
    }
  };
  Cart.init({
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    
  }, {
  sequelize,
  modelName: 'Cart',
  tableName: 'carts',
  timestamps: false
  })
  return Cart
}
