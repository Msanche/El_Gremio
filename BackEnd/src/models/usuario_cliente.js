// models/UsuarioCliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Usuario = require('./usuario');

const UsuarioCliente = sequelize.define('UsuarioCliente', {
  pk_id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'pk_id_usuario'
    },
    allowNull: true
  }
}, {
  tableName: 'usuario_cliente',
  timestamps: false
});

module.exports = UsuarioCliente;
