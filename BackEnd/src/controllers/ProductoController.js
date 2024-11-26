const Producto = require('../models/productos');
const tamano = require('../models/tamano')
const usuario_vendedor = require('../models/usuario_vendedor')
const usuario = require('../models/usuario')

// Crear un nuevo producto
// Crear transacción al incio
// crear primero el producto y extraer el id para crear tamaños 
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

exports.getLastProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: [['id_producto', 'DESC']],
      limit: 5, // Cambia el límite según la cantidad de productos que desees obtener
      include:[{
        model:usuario_vendedor,
        include:[{
          model:usuario,
          attributes:['nombre']
        }]
      }]
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};


// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const idProducto = req.query;
    // const producto = await Producto.findByPk(req.params.id); deprecated
    const producto = await Producto.findOne({
      where: {
        id_prodcuto: idProducto
      },
      include:[{
        model:tamano,
        attributes: ['nombre_size','precio']
      }]
    })
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Obtener un producto por categoria
exports.getProductoByCategory = async (req, res) => {
      const fk_id_categorias = req.params.idCategory
  try {
    const producto = await tamano.findAll({
      include:[{
        model:Producto,
        where:{
          fk_id_categorias:fk_id_categorias
        }
      }],
     
    });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

//Obtener un producto por el id del vendedor
exports.getProductosPorIdVendedor = async (req, res) =>{
  try {
    const vendedorId = req.query;
    const productos = await Producto.findAll({
      where:{
        fk_id_vendedor:vendedorId
      },
      include:[{
        model:tamano,
        attributes:['nombre_size','precio']
      }]
    });
    res.status(201).json({
      message: 'Se obtuvieron exitosamente los productos del vendedor',
      data:{
        productos
      }
    })
  } catch (error) {
    console.log(`Error al recuperar los prodcutos del vendedor ${vendedorId} `,error)
    res.status(500).json({ error: `Error al recuperar los prodcutos del vendedor ${vendedorId} ` }, error);
  }
}

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
