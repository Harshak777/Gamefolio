'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      team.hasMany(models.participant, {
        foreignKey: 'tid',
        as: 'team_id'
      });

      team.hasOne(models.winner, {
        foreignKey: 'tid',
        as: 'teamW_id'
      });
    }
  };
  team.init({
    tid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     },
    referral: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
     },
     leader: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};