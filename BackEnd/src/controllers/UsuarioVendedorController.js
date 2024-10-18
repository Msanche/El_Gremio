const  {sequelize} = require('../models/usuario_vendedor');
const  UsuarioVendedor = require('../models/usuario_vendedor');
const  Usuario = require('../models/usuario');
const PaginaVendedores = require('../models/pagina_vendedor')
const hash = require ('../utils/hash');


// Crear un nuevo usuario vendedor
exports.createUsuarioVendedor = async (req, res) => {
  
  const transaction = await sequelize.transaction();
  try {
    const imagen = req.file ? req.file.filename : null; // Obtiene el nombre del archivo de la imagen cargada
    const usuarioData = JSON.parse(req.body.usuario);

    console.log(req.body)

    // Paso 1: Crear el usuario
    const hashedPassword = await hash.hashPassword(usuarioData.contrasena);
    usuarioData.contrasena = hashedPassword;
    // Iniciar transaccion

    const usuario = await Usuario.create(usuarioData, { transaction });
    // Paso 2: Crear el usuario_cliente usando el id del usuario creado

    const pagina_vendedor = await PaginaVendedores.create({
      foto_perfil:imagen,
      color_primario:"#FFFFFF"
    })

    const usuarioVendedorData = {
      nombre_marca: req.body.nombre_marca,
      fk_id_usuario: usuario.dataValues.pk_id_usuario ,
      fk_pagina_vendedor: pagina_vendedor.dataValues.pk_id_pagina       // Asignar el id del usuario recién creado
    };
    
    const usuario_vendedor = await UsuarioVendedor.create(usuarioVendedorData, { transaction });

    console.log( usuario_vendedor)

  
    // Si ambas operaciones son exitosas, hacer commit a la transacción
    await transaction.commit();

    // Enviar la respuesta con los datos creados
    res.status(201).json({
      message: 'Usuario y usuario_vendedor creados correctamente',
      usuario,
      usuario_vendedor,
      pagina_vendedor
    });
    
  } catch (error) {
    await transaction.rollback();
    console.log(error)
    // Manejar errores de unicidad o validación
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'El correo o número de celular ya están en uso',
        error
      });
    }
  
    // Otros errores
    res.status(500).json({
      message: 'Error al crear el usuario o usuario vendedor',
      error
    });
  }
  
};

// Obtener todos los usuarios vendedores
exports.getUsuarioVendedores = async (req, res) => {
  try {
    const usuariosVendedores = await UsuarioVendedor.findAll({
      include:[{
        model:Usuario,
      }],
      
    });
    // Mapea los productos para incluir la URL de la imagen
    const UsuariosConImagenes = productos.map(producto => {
      const imagenUrl = producto.imagen 
        ? `http://${req.headers.host}/uploads/${producto.imagen}` // Construye la URL de la imagen
        : null; // Si no tiene imagen, deja el campo como null

      return {
        ...producto.toJSON(), // Convierte el producto a un objeto plano
        imagenUrl // Agrega la URL de la imagen
      };
    });

    res.status(200).json(UsuariosConImagenes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener los usuarios vendedores', error });

  }
};

// Obtener un usuario vendedor por ID
exports.getUsuarioVendedorById = async (req, res) => {
  try {
    const usuarioVendedor = await UsuarioVendedor.findByPk(req.params.id);
    if (!usuarioVendedor) {
      return res.status(404).json({ message: 'Usuario vendedor no encontrado' });
    }
    res.status(200).json(usuarioVendedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario vendedor', error });
  }
};

// Actualizar un usuario vendedor
exports.updateUsuarioVendedor = async (req, res) => {
  try {
    const usuarioVendedor = await UsuarioVendedor.findByPk(req.params.id);
    if (!usuarioVendedor) {
      return res.status(404).json({ message: 'Usuario vendedor no encontrado' });
    }
    await usuarioVendedor.update(req.body);
    res.status(200).json(usuarioVendedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario vendedor', error });
  }
};

// Eliminar un usuario vendedor
exports.deleteUsuarioVendedor = async (req, res) => {
  try {
    const usuarioVendedor = await UsuarioVendedor.findByPk(req.params.id);
    if (!usuarioVendedor) {
      return res.status(404).json({ message: 'Usuario vendedor no encontrado' });
    }
    await usuarioVendedor.destroy();
    res.status(200).json({ message: 'Usuario vendedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario vendedor', error });
  }
};
