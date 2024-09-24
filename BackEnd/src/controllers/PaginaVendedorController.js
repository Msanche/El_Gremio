const PaginaVendedor = require('../models/pagina_vendedor');

// Crear una nueva página de vendedor
exports.createPaginaVendedor = async (req, res) => {
  try {
    const pagina = await PaginaVendedor.create(req.body);
    res.status(201).json(pagina);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la página de vendedor', error });
  }
};

// Obtener todas las páginas de vendedores
exports.getPaginaVendedores = async (req, res) => {
  try {
    const paginas = await PaginaVendedor.findAll();
    res.status(200).json(paginas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las páginas de vendedores', error });
  }
};

// Obtener una página de vendedor por ID
exports.getPaginaVendedorById = async (req, res) => {
  try {
    const pagina = await PaginaVendedor.findByPk(req.params.id);
    if (!pagina) {
      return res.status(404).json({ message: 'Página no encontrada' });
    }
    res.status(200).json(pagina);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la página de vendedor', error });
  }
};

// Actualizar una página de vendedor
exports.updatePaginaVendedor = async (req, res) => {
  try {
    const pagina = await PaginaVendedor.findByPk(req.params.id);
    if (!pagina) {
      return res.status(404).json({ message: 'Página no encontrada' });
    }
    await pagina.update(req.body);
    res.status(200).json(pagina);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la página de vendedor', error });
  }
};

// Eliminar una página de vendedor
exports.deletePaginaVendedor = async (req, res) => {
  try {
    const pagina = await PaginaVendedor.findByPk(req.params.id);
    if (!pagina) {
      return res.status(404).json({ message: 'Pagina de vendedor no encontrada' });
    }
    await pagina.destroy();
    res.status(200).json({ message: 'Pagina de vendedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la pagina del vendedor', error });
  }
};
