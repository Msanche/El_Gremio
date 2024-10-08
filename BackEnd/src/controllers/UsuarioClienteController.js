const  {sequelize} = require('../models/usuario_vendedor');
const  UsuarioCliente = require('../models/usuario_cliente');
const  Usuario = require('../models/usuario');
const hash = require('../utils/hash');

// Crear un nuevo usuario cliente
exports.createUsuarioCliente = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Paso 1: Crear el usuario
    console.log("Contraseña",req.body.contrasena);

    // Redeclarar la contraseña (hasheo)
    const hashedPassword = await hash.hashPassword(req.body.contrasena);
    // Usar hashedPassword para guardar en la base de datos
    req.body.contrasena = hashedPassword;


    console.log(req.body)

    // Iniciar transaccion
    const usuario = await Usuario.create(req.body, { transaction });
  
    // Paso 2: Crear el usuario_cliente usando el id del usuario creado
    const usuarioClienteData = {
      fk_id_usuario: usuario.dataValues.pk_id_usuario        // Asignar el id del usuario recién creado
    };
    
    const usuarioCliente = await UsuarioCliente.create(usuarioClienteData, { transaction });

    // Si ambas operaciones son exitosas, hacer commit a la transacción
    await transaction.commit();

    // Enviar la respuesta con los datos creados
    res.status(201).json({
      message: 'Usuario y UsuarioCliente creados correctamente',
      usuario,
      usuarioCliente
    });
    
  } catch (error) {
    // En caso de error, hacer rollback para revertir los cambios
    await transaction.rollback();
    res.status(500).json({
      message: 'Error al crear el usuario o usuario cliente',
      error
    });
  }
};

// Obtener todos los usuarios clientes
exports.getUsuarioClientes = async (req, res) => {
  try {
    const usuariosClientes = await UsuarioCliente.findAll();
    res.status(200).json(usuariosClientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios clientes', error });
  }
};

// Obtener un usuario cliente por ID
exports.getUsuarioClienteById = async (req, res) => {
  try {
    const usuarioCliente = await UsuarioCliente.findByPk(req.params.id);
    if (!usuarioCliente) {
      return res.status(404).json({ message: 'Usuario cliente no encontrado' });
    }
    res.status(200).json(usuarioCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario cliente', error });
  }
};

// Actualizar un usuario cliente
exports.updateUsuarioCliente = async (req, res) => {
  try {
    const usuarioCliente = await UsuarioCliente.findByPk(req.params.id);
    if (!usuarioCliente) {
      return res.status(404).json({ message: 'Usuario cliente no encontrado' });
    }
    await usuarioCliente.update(req.body);
    res.status(200).json(usuarioCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario cliente', error });
  }
};

// Eliminar un usuario cliente
exports.deleteUsuarioCliente = async (req, res) => {
  try {
    const usuarioCliente = await UsuarioCliente.findByPk(req.params.id);
    if (!usuarioCliente) {
      return res.status(404).json({ message: 'Usuario cliente no encontrado' });
    }
    await usuarioCliente.destroy();
    res.status(200).json({ message: 'Usuario cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario cliente', error });
  }
};
