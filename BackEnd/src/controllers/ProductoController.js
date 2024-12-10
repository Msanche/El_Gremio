const Producto = require('../models/productos');
const tamano = require('../models/tamano')
const usuario_vendedor = require('../models/usuario_vendedor')
const usuario = require('../models/usuario')
const sequelize  = require('../database/database.js'); // Asegúrate de importar la instancia de Sequelize


// Crear un nuevo producto
// Crear transacción al incio
// crear primero el producto y extraer el id para crear tamaños 
exports.createProducto = async (req, res) => {
  const transaction = await sequelize.transaction(); // Inicia una transacción
  try {
    // Parsear datos del body
    const productoInfo = JSON.parse(req.body.producto); // Parsear JSON del producto
    const tamanos = JSON.parse(req.body.tamanos);       // Parsear JSON de tamaños

    // Procesar archivo subido
    const imagen = req.file;
    if (!imagen) {
      throw new Error('No se proporcionó una imagen.');
    }

    // Agregar el nombre del archivo al producto
    productoInfo.nombre_imagen = imagen.filename;
    console.log(productoInfo.fk_id_vendedor)
    // Buscar el pk_id_usuario a partir del nombre
    const Usuario = await usuario.findOne({
      where: { nombre: productoInfo.fk_id_vendedor }, // Aquí buscamos por el nombre
    });

    if (!Usuario) {
      throw new Error('Usuario no encontrado.');
    }

    // Reemplazar fk_id_usuario con pk_id_usuario
    productoInfo.fk_id_vendedor = Usuario.pk_id_usuario;
    console.log(tamanos)

    // Crear el producto en la base de datos
    const producto = await Producto.create(productoInfo, { transaction });
    console.log("crea producto")
    // Crear tamaños relacionados con el producto
    if (tamanos && tamanos.length > 0) {
      const tamanosData = tamanos.map((tamano) => ({
        ...tamano,
        fk_id_producto: producto.id_producto, // Relacionar con el ID del producto recién creado
      }));

      await tamano.bulkCreate(tamanosData, { transaction });
    }

    // Confirmar la transacción
    await transaction.commit();
    res.status(201).json({ message: 'Producto y tamaños creados exitosamente', producto });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error('Error al crear el producto y tamaños:', error);
    res.status(500).json({ message: 'Error al crear el producto y tamaños', error: error.message });
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
    const {id} = req.params;
    console.log(req.params)
    // const producto = await Producto.findByPk(req.params.id); deprecated
    const producto = await Producto.findOne({
      where: {
        id_producto: id
      },
    })
    const tamanos = await tamano.findAll({
      where:{
        fk_id_producto:id
      }
    })
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({producto,tamanos});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Obtener un producto por categoria
exports.getProductoByCategory = async (req, res) => {
      const fk_id_categorias = req.params.idCategory
  try {
    const producto = await Producto.findAll({
      where:{
        fk_id_categorias:fk_id_categorias
      }
     
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
    console.log("aqui")
    const {idVendedor} = req.params;
    const productos = await tamano.findAll({
     
      include:[{
        model:Producto,
        where:{
          fk_id_vendedor:idVendedor
        },
      }]
    });
    res.status(201).json({
      message: 'Se obtuvieron exitosamente los productos del vendedor',
      data:{
        productos
      }
    })
  } catch (error) {
    console.log(`Error al recuperar los prodcutos del vendedor ${idVendedor} `,error)
    res.status(500).json({ error: `Error al recuperar los prodcutos del vendedor ${idVendedor} ` }, error);
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
