const { Sequelize, DataTypes, Model  } = require('sequelize');

const sqlConfig = {
    username: 'root',
    password: '',
    database: 'gamefolio',
    host: 'localhost',
    dialect: 'mysql',
  };

const sequelize = new Sequelize(sqlConfig);

// const User = sequelize.define('User', {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING
//       // allowNull defaults to true
//     }
//   }, {
//     // Other model options go here
//   });
  
//   console.log(User === sequelize.models.User);

  class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

User.sync()