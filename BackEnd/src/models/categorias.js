// models/Categorias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Categorias = sequelize.define('Categorias', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoria: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  tableName: 'Categorias',
  timestamps: false
});

module.exports = Categorias;
