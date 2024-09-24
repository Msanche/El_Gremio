const Producto = require('../models/producto');

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.update(req.body);
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};
