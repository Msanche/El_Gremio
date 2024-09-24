// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Ajusta la ruta según tu configuración

const Usuario = sequelize.define('Usuarios', {
  pk_id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numeroCelular: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
