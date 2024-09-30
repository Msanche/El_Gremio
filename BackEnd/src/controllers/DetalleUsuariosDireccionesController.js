// controllers/detalleUsuarioDireccionesController.js
const DetalleUsuarioDirecciones = require('../models/detalle_usuarios_direcciones');

// Obtener todos los detalles de usuario y direcciones
exports.getDetallesUsuarioDirecciones = async (req, res) => {
  try {
    const detalles = await DetalleUsuarioDirecciones.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles de usuario y direcciones', error });
  }
};

// Obtener un detalle por ID
exports.getDetalleUsuarioDireccionById = async (req, res) => {
  try {
    const detalle = await DetalleUsuarioDirecciones.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el detalle', error });
  }
};

// Crear un nuevo detalle de usuario y dirección
exports.createDetalleUsuarioDireccion = async (req, res) => {
  try {
    const { pk_fk_id_usuario, pk_fk_id_direcciones } = req.body;
    const newDetalle = await DetalleUsuarioDirecciones.create({ pk_fk_id_usuario, pk_fk_id_direcciones });
    res.status(201).json(newDetalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el detalle de usuario y dirección', error });
  }
};

// Actualizar un detalle de usuario y dirección
exports.updateDetalleUsuarioDireccion = async (req, res) => {
  try {
    const detalle = await DetalleUsuarioDirecciones.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    const { pk_fk_id_usuario, pk_fk_id_direcciones } = req.body;
    await detalle.update({ pk_fk_id_usuario, pk_fk_id_direcciones });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el detalle', error });
  }
};

// Eliminar un detalle de usuario y dirección
exports.deleteDetalleUsuarioDireccion = async (req, res) => {
  try {
    const detalle = await DetalleUsuarioDirecciones.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    await detalle.destroy();
    res.json({ message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el detalle', error });
  }
};
