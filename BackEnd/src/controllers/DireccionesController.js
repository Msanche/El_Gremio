const Direcciones = require('../models/direcciones');

// Crear una nueva dirección
exports.createDireccion = async (req, res) => {
  try {
    const direccion = await Direcciones.create(req.body);
    res.status(201).json(direccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la dirección', error });
  }
};

// Obtener todas las direcciones
exports.getDirecciones = async (req, res) => {
  try {
    const direcciones = await Direcciones.findAll();
    res.status(200).json(direcciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las direcciones', error });
  }
};

// Obtener una dirección por ID
exports.getDireccionById = async (req, res) => {
  try {
    const direccion = await Direcciones.findByPk(req.params.id);
    if (!direccion) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    res.status(200).json(direccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la dirección', error });
  }
};

// Actualizar una dirección
exports.updateDireccion = async (req, res) => {
  try {
    const direccion = await Direcciones.findByPk(req.params.id);
    if (!direccion) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    await direccion.update(req.body);
    res.status(200).json(direccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la dirección', error });
  }
};

// Eliminar una dirección
exports.deleteDireccion = async (req, res) => {
  try {
    const direccion = await Direcciones.findByPk(req.params.id);
    if (!direccion) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    await direccion.destroy();
    res.status(200).json({ message: 'Dirección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la dirección', error });
  }
};
