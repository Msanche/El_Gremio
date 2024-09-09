// models/Tamano.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Productos = require('./productos');

const Tamano = sequelize.define('Tamano', {
  pk_id_tamano: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Productos,
      key: 'id_producto'
    },
    allowNull: false
  },
  nombre_size: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'tamano',
  timestamps: false
});

module.exports = Tamano;
