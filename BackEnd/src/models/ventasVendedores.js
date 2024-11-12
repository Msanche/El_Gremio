const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const vendedor = require ('./usuario_vendedor');
const UsuarioCliente = require ('./usuario_cliente');
const tamano = require ('./tamano');

const ventasVendedores = sequelize.define('ventasVendedores',{
    pk_id_venta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fk_id_vendedor:{
        type: DataTypes.INTEGER,
        references: {
            model: vendedor,
            key: 'pk_id_vendedor'
        },
        allowNull: false
    },

    fk_id_cliente:{
        type: DataTypes.INTEGER,
        references: {
            model: UsuarioCliente,
            key: 'pk_id_cliente'
        },
        allowNull: false
    },

    fk_id_tamano:{
        type: DataTypes.INTEGER,
        references: {
            model: tamano,
            key: 'pk_id_tamano'
        },
        allowNull: false
    },
},{
    tableName: 'ventasVendedores',
    timestamps: false
  }
);

module.exports = ventasVendedores;