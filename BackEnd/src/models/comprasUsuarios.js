const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const UsuarioCliente = require ('./usuario_cliente');
const Carrito = require ('./carrito');

const comprasUsuarios = sequelize.define('comprasUsuarios',{
    pk_id_compra:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fk_id_cliente:{
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioCliente,
            key: 'pk_id_cliente'
        },
        allowNull: false
    },

    fk_id_carrito:{
        type: DataTypes.INTEGER,
        references: {
            model: Carrito,
            key: 'pk_id_carrito'
        },
        allowNull: false
    },
},{
    tableName: 'comprasUsuarios',
    timestamps: false
  }
);

module.exports = comprasUsuarios;