const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const PaginaVendedor = require('./PaginaVendedor');
const UsuarioCliente = require('./UsuarioCliente');

const Review = sequelize.define('Review', {
  pk_id_review: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  calificacion: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  fk_id_pagina: {
    type: DataTypes.INTEGER,
    references: {
      model: PaginaVendedor,
      key: 'pk_id_pagina'
    }
  },
  fk_id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: UsuarioCliente,
      key: 'pk_id_cliente'
    }
  }
}, {
  tableName: 'review',
  timestamps: false
});

module.exports = Review;
