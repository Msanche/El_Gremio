// models/Carrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UsuarioCliente = require('./usuario_cliente');

const Carrito = sequelize.define('Carritos', {
  pk_id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: UsuarioCliente,
      key: 'pk_id_cliente'
    },
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Carritos',
  timestamps: false
});

module.exports = Carrito;
