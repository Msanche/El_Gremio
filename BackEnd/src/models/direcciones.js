const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Direcciones = sequelize.define('Direcciones', {
  id_direcciones: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  direccion: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'Direcciones',
  timestamps: false
});

module.exports = Direcciones;
