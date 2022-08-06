'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ SalesOrder }) {
       // customer
      OrderHistory.hasMany( SalesOrder, { 
        as: 'sales_orders', 
        foreignKey: 'user_id' 
      })
     }
  };
  OrderHistory.init({
    orderHistory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false
  },
    status: {
      type: DataTypes.STRING,
      allowNull: false
  },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false
  },
    sub_total: {
      type: DataTypes.INTEGER,
      allowNull: false
},
    
}, {
  sequelize,
  modelName: 'OrderHistory',
  tableName: 'ordersistories',
  timestamps: false
})
return OrderHistory
}