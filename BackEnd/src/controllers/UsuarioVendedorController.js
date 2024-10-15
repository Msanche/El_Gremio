const  {sequelize} = require('../models/usuario_vendedor');
const  UsuarioVendedor = require('../models/usuario_vendedor');
const  Usuario = require('../models/usuario');
const hash = require ('../utils/hash');


// Crear un nuevo usuario vendedor
exports.createUsuarioVendedor = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {

    // Paso 1: Crear el usuario
    const hashedPassword = await hash.hashPassword(req.body.usuario.contrasena);
    req.body.usuario.contrasena = hashedPassword;
    // Iniciar transaccion

    const usuario = await Usuario.create(req.body.usuario, { transaction });
    // Paso 2: Crear el usuario_cliente usando el id del usuario creado

    const usuarioVendedorData = {
      nombre_marca: req.body.nombre_marca,
      fk_id_usuario: usuario.dataValues.pk_id_usuario        // Asignar el id del usuario recién creado
    };
    
    const usuario_vendedor = await UsuarioVendedor.create(usuarioVendedorData, { transaction });

    // Si ambas operaciones son exitosas, hacer commit a la transacción
    await transaction.commit();

    // Enviar la respuesta con los datos creados
    res.status(201).json({
      message: 'Usuario y usuario_vendedor creados correctamente',
      usuario,
      usuario_vendedor
    });
    
  } catch (error) {
    await transaction.rollback();
  
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
        res.status(200).json(usuariosVendedores);
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
