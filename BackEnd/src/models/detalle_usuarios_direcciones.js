const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Usuario = require('./usuario');
const Direcciones = require('./direcciones');

const DetalleUsuarioDirecciones = sequelize.define('DetalleUsuarioDirecciones', {
  pk_fk_id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'pk_id_usuario'
    }
  },
  pk_fk_id_direcciones: {
    type: DataTypes.INTEGER,
    references: {
      model: Direcciones,
      key: 'id_direcciones'
    }
  }
}, {
  tableName: 'DetalleUsuarioDirecciones',
  timestamps: false,
  primaryKey: ['pk_fk_id_usuario', 'pk_fk_id_direcciones'] // Llave primaria compuesta
});

module.exports = DetalleUsuarioDirecciones;
