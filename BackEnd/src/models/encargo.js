const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UsuarioVendedor = require('./usuario_vendedor');
const Carrito = require('./carrito');

const Encargo = sequelize.define('Encargos', {
  pk_id_encargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fk_id_vendedor: {
    type: DataTypes.INTEGER,
    references: {
      model: UsuarioVendedor,
      key: 'pk_id_vendedor'
    }
  },
  fk_id_carrito: {
    type: DataTypes.INTEGER,
    references: {
      model: Carrito,
      key: 'pk_id_carrito'
    }
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  nombre_imagen:{
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'Encargos',
  timestamps: false
});

module.exports = Encargo;
