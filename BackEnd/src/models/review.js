const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const PaginaVendedor = require('./pagina_vendedor');
const UsuarioCliente = require('./usuario_cliente');

const Review = sequelize.define('Reviews', {
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
    allowNull: false,
    references: {
      model: PaginaVendedor,
      key: 'pk_id_pagina'
    }
  },
  fk_id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UsuarioCliente,
      key: 'pk_id_cliente'
    }
  },
  fecha:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'Reviews',
  timestamps: false
});

module.exports = Review;
