const Encargo = require('../models/encargo');

// Crear un nuevo encargo
exports.createEncargo = async (req, res) => {
  try {
    const encargo = await Encargo.create(req.body);
    res.status(201).json(encargo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el encargo', error });
  }
};

// Obtener todos los encargos
exports.getEncargos = async (req, res) => {
  try {
    const encargos = await Encargo.findAll();
    res.status(200).json(encargos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los encargos', error });
  }
};

// Obtener un encargo por ID
exports.getEncargoById = async (req, res) => {
  try {
    const encargo = await Encargo.findByPk(req.params.id);
    if (!encargo) {
      return res.status(404).json({ message: 'Encargo no encontrado' });
    }
    res.status(200).json(encargo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el encargo', error });
  }
};

// Actualizar un encargo
exports.updateEncargo = async (req, res) => {
  try {
    const encargo = await Encargo.findByPk(req.params.id);
    if (!encargo) {
      return res.status(404).json({ message: 'Encargo no encontrado' });
    }
    await encargo.update(req.body);
    res.status(200).json(encargo);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el encargo', error });
  }
};

// Eliminar un encargo
exports.deleteEncargo = async (req, res) => {
  try {
    const encargo = await Encargo.findByPk(req.params.id);
    if (!encargo) {
      return res.status(404).json({ message: 'Encargo no encontrado' });
    }
    await encargo.destroy();
    res.status(200).json({ message: 'Encargo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el encargo', error });
  }
};
