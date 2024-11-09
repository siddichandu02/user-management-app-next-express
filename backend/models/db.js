const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('User_Management_Express', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync();  // Automatically creates tables based on models

module.exports = sequelize;
