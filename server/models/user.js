'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.participant, {
        foreignKey: 'uid',
        as: 'user_id'
      });
    }
  };
  user.init({
    uid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gtoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};