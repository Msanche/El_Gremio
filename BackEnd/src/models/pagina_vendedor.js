const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const PaginaVendedor = sequelize.define('PaginaVendedores', {
  pk_id_pagina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foto_perfil: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  color_primario: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName: 'PaginaVendedores',
  timestamps: false
});

module.exports = PaginaVendedor;
