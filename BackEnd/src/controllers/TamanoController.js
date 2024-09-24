const Tamano = require('../models/tamano');

// Crear un nuevo tamaño
exports.createTamano = async (req, res) => {
  try {
    const tamano = await Tamano.create(req.body);
    res.status(201).json(tamano);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tamaño', error });
  }
};

// Obtener todos los tamaños
exports.getTamanos = async (req, res) => {
  try {
    const tamanos = await Tamano.findAll();
    res.status(200).json(tamanos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tamaños', error });
  }
};

// Obtener un tamaño por ID
exports.getTamanoById = async (req, res) => {
  try {
    const tamano = await Tamano.findByPk(req.params.id);
    if (!tamano) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    res.status(200).json(tamano);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tamaño', error });
  }
};

// Actualizar un tamaño
exports.updateTamano = async (req, res) => {
  try {
    const tamano = await Tamano.findByPk(req.params.id);
    if (!tamano) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    await tamano.update(req.body);
    res.status(200).json(tamano);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tamaño', error });
  }
};

// Eliminar un tamaño
exports.deleteTamano = async (req, res) => {
  try {
    const tamano = await Tamano.findByPk(req.params.id);
    if (!tamano) {
      return res.status(404).json({ message: 'Tamaño no encontrado' });
    }
    await tamano.destroy();
    res.status(200).json({ message: 'Tamaño eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tamaño', error });
  }
};
