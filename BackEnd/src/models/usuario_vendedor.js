// models/UsuarioVendedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Usuario = require('./usuario');
const PaginaVendedores = require('./pagina_vendedor');

const UsuarioVendedores = sequelize.define('usuario_vendedores', {
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
  fk_pagina_vendedor: {
    type: DataTypes.INTEGER,
    references: {
      model: PaginaVendedores,
      key: 'pk_id_pagina'
    },
    allowNull: false
  }
}, {
  tableName: 'usuario_vendedores',
  timestamps: false
});

module.exports = UsuarioVendedores;
