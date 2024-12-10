const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Carrito = require('./carrito');
const Tamano = require('./tamano');

const DetalleCarritoProducto = sequelize.define('Detalle_carrito_productos', {
  pk_fk_id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carrito,
      key: 'pk_id_carrito',
    },
    primaryKey: true, // Parte de la clave primaria compuesta
  },
  pk_fk_id_tamano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tamano,
      key: 'pk_id_tamano',
    },
    primaryKey: true, // Parte de la clave primaria compuesta
  },
  cantidad_productos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Detalle_carrito_productos',
  timestamps: false,
});

module.exports = DetalleCarritoProducto;
