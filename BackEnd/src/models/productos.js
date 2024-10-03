// En models/Productos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UsuarioVendedor = require('./usuario_vendedor');
const Categorias = require('./categorias');

const Productos = sequelize.define('Productos', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre_imagen: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fk_id_vendedor: {
    type: DataTypes.INTEGER,
    references: {
      model: UsuarioVendedor,
      key: 'pk_id_vendedor'
    },
    allowNull: false
  },
  fk_id_categorias: {
    type: DataTypes.INTEGER,
    references: {
      model: Categorias,
      key: 'id_categoria'
    },
    allowNull: false
  }
}, {
  tableName: 'Productos',
  timestamps: false
});

module.exports = Productos;
