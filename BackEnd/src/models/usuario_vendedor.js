// models/UsuarioVendedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Usuario = require('./usuario');

const UsuarioVendedor = sequelize.define('UsuarioVendedores', {
  pk_id_vendedor: {
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
    allowNull: false
  },
  nombre_marca: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'UsuarioVendedores',
  timestamps: false
});

module.exports = UsuarioVendedor;
