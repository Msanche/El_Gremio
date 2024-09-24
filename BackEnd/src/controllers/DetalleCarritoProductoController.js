// controllers/detalleCarritoProductoController.js
const DetalleCarritoProducto = require('../models/detalle_carrito_producto');

// Obtener todos los detalles de carrito y producto
exports.getDetallesCarritoProducto = async (req, res) => {
  try {
    const detalles = await DetalleCarritoProducto.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles del carrito y producto', error });
  }
};

// Obtener un detalle por ID
exports.getDetalleCarritoProductoById = async (req, res) => {
  try {
    const detalle = await DetalleCarritoProducto.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el detalle', error });
  }
};

// Crear un nuevo detalle de carrito y producto
exports.createDetalleCarritoProducto = async (req, res) => {
  try {
    const { fk_id_carrito, fk_id_producto, cantidad } = req.body;
    const newDetalle = await DetalleCarritoProducto.create({ fk_id_carrito, fk_id_producto, cantidad });
    res.status(201).json(newDetalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el detalle de carrito y producto', error });
  }
};

// Actualizar un detalle de carrito y producto
exports.updateDetalleCarritoProducto = async (req, res) => {
  try {
    const detalle = await DetalleCarritoProducto.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    const { cantidad } = req.body;
    await detalle.update({ cantidad });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el detalle', error });
  }
};

// Eliminar un detalle de carrito y producto
exports.deleteDetalleCarritoProducto = async (req, res) => {
  try {
    const detalle = await DetalleCarritoProducto.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    await detalle.destroy();
    res.json({ message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el detalle', error });
  }
};
