const Sequelize = require('sequelize');

const sequelize = new Sequelize ('NomeDatabase','NomeUsuario','Senha',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize: Sequelize, 
    sequelize: sequelize
}