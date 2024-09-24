const UsuarioVendedor = require('../models/usuario_vendedor');

// Crear un nuevo usuario vendedor
exports.createUsuarioVendedor = async (req, res) => {
  try {
    const usuarioVendedor = await UsuarioVendedor.create(req.body);
    res.status(201).json(usuarioVendedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario vendedor', error });
  }
};

// Obtener todos los usuarios vendedores
exports.getUsuarioVendedores = async (req, res) => {
  try {
    const usuariosVendedores = await UsuarioVendedor.findAll();
    res.status(200).json(usuariosVendedores);
  } catch (error) {
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
