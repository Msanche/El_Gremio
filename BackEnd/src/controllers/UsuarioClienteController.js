const UsuarioCliente = require('../models/usuario_cliente');

// Crear un nuevo usuario cliente
exports.createUsuarioCliente = async (req, res) => {
  try {
    const usuarioCliente = await UsuarioCliente.create(req.body);
    res.status(201).json(usuarioCliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario cliente', error });
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
