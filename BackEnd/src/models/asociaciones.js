// Importar los modelos
const Usuario = require('../models/usuario');
const UsuarioCliente = require('../models/usuario_cliente');
const UsuarioVendedor = require('../models/usuario_vendedor');
const Carrito = require('../models/carrito');
const Categoria = require('../models/categorias');
const Producto = require('../models/productos');
const Tamano = require('../models/tamano');
const Encargo = require('../models/encargo');
const Direcciones = require('../models/direcciones');
const DetalleUsuarioDirecciones = require('../models/detalle_usuarios_direcciones');
const PaginaVendedor = require('../models/pagina_vendedor');
const Review = require('../models/review');
const PaginaVendedores =require('../models/pagina_vendedor');
const comprasUsuarios = require('../models/comprasUsuarios');
const ventasVendedores = require('../models/ventasVendedores');

// Definir relaciones entre los modelos

Usuario.hasMany(UsuarioVendedor, { foreignKey: 'fk_id_usuario' });
PaginaVendedores.hasMany(UsuarioVendedor, { foreignKey: 'fk_pagina_vendedor' });

Usuario.hasOne(UsuarioCliente, { foreignKey: 'fk_id_usuario' });
UsuarioCliente.belongsTo(Usuario, { foreignKey: 'fk_id_usuario' });

Usuario.hasOne(UsuarioVendedor, { foreignKey: 'fk_id_usuario' });
UsuarioVendedor.belongsTo(Usuario, { foreignKey: 'fk_id_usuario' });

UsuarioVendedor.hasMany(Producto, { foreignKey: 'fk_id_vendedor' });
Producto.belongsTo(UsuarioVendedor, { foreignKey: 'fk_id_vendedor' });

Categoria.hasMany(Producto, { foreignKey: 'fk_id_categorias' });
Producto.belongsTo(Categoria, { foreignKey: 'fk_id_categorias' });

Producto.hasMany(Tamano, { foreignKey: 'fk_id_producto' });
Tamano.belongsTo(Producto, { foreignKey: 'fk_id_producto' });

UsuarioCliente.hasOne(Carrito, { foreignKey: 'fk_id_cliente' });
Carrito.belongsTo(UsuarioCliente, { foreignKey: 'fk_id_cliente' });

UsuarioVendedor.hasMany(Encargo, { foreignKey: 'fk_id_vendedor' });
Encargo.belongsTo(UsuarioVendedor, { foreignKey: 'fk_id_vendedor' });

Carrito.hasOne(Encargo, { foreignKey: 'fk_id_carrito' });
Encargo.belongsTo(Carrito, { foreignKey: 'fk_id_carrito' });

PaginaVendedor.hasMany(Review, { foreignKey: 'fk_id_pagina' });
Review.belongsTo(PaginaVendedor, { foreignKey: 'fk_id_pagina' });

UsuarioCliente.hasMany(Review, { foreignKey: 'fk_id_cliente' });
Review.belongsTo(UsuarioCliente, { foreignKey: 'fk_id_cliente' });

Usuario.hasMany(DetalleUsuarioDirecciones, { foreignKey: 'pk_fk_id_usuario' });
DetalleUsuarioDirecciones.belongsTo(Usuario, { foreignKey: 'pk_fk_id_usuario' });

Direcciones.hasMany(DetalleUsuarioDirecciones, { foreignKey: 'pk_fk_id_direcciones' });
DetalleUsuarioDirecciones.belongsTo(Direcciones, { foreignKey: 'pk_fk_id_direcciones' });

UsuarioCliente.hasMany(comprasUsuarios,{foreignKey:'pk_id_cliente'});
comprasUsuarios.belongsTo(UsuarioCliente,{foreignKey:'pk_id_cliente'});

Carrito.hasMany(comprasUsuarios,{foreignKey:'pk_id_carrito'});
comprasUsuarios.belongsTo(Carrito,{foreignKey:'pk_id_carrito'});

UsuarioVendedor.hasMany(ventasVendedores,{foreignKey:'pk_id_vendedor'});
ventasVendedores.belongsTo(UsuarioVendedor,{foreignKey: 'pk_id_vendedor'});

UsuarioCliente.hasMany(ventasVendedores,{foreignKey: 'pk_id_cliente'});
ventasVendedores.belongsTo(UsuarioCliente,{foreignKey:'pk_id_cliente'});

Tamano.hasMany(ventasVendedores,{foreignKey:'pk_id_tamano'});
ventasVendedores.belongsTo(Tamano,{foreignKey: 'pk_id_tamano'});



module.exports = {
    Usuario,
    UsuarioCliente,
    UsuarioVendedor,
    Carrito,
    Categoria,
    Producto,
    Tamano,
    Encargo,
    Direcciones,
    DetalleUsuarioDirecciones,
    PaginaVendedor,
    Review,
    ventasVendedores,
    comprasUsuarios
}