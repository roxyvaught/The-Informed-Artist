const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class pic extends Model {}

pic.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      title: {
         type: DataTypes.TEXT,
         allowNull: true,
         validate: {
            len: [1]
         }
      },
      user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: 'user',
            key: 'id'
         }
      },
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'pic'
   }
);

module.exports = pic;