const Carrito = require('../models/carrito');

// Crear un nuevo carrito
exports.createCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.create(req.body);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error });
  }
};

// Obtener todos los carritos
exports.getCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.findAll();
    res.status(200).json(carritos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los carritos', error });
  }
};

// Obtener un carrito por ID
exports.getCarritoById = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};

// Actualizar un carrito
exports.updateCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    await carrito.update(req.body);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito', error });
  }
};

// Eliminar un carrito
exports.deleteCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    await carrito.destroy();
    res.status(200).json({ message: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el carrito', error });
  }
};
