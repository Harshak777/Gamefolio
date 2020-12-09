const { Sequelize } = require('sequelize');

const sqlConfig = {
    username: 'root',
    password: '',
    database: 'gamefolio',
    host: 'localhost',
    dialect: 'mysql',
  };

const sequelize = new Sequelize(sqlConfig);

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});

module.exports = sequelize;