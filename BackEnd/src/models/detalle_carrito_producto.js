// models/DetalleCarritoProducto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Carrito = require('./carrito');
const Tamano = require('./tamano');

const DetalleCarritoProducto = sequelize.define('DetalleCarritoProductos', {
  pk_fk_id_carrito: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrito,
      key: 'pk_id_carrito'
    },
    allowNull: false
  },
  pk_fk_id_tamano: {
    type: DataTypes.INTEGER,
    references: {
      model: Tamano,
      key: 'pk_id_tamano'
    },
    allowNull: false
  },
  cantidad_productos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'DetalleCarritoProductos',
  timestamps: false,
  primaryKey: {
    name: 'composite_primary_key',
    fields: ['pk_fk_id_carrito', 'pk_fk_id_tamano']
  }
});

module.exports = DetalleCarritoProducto;
