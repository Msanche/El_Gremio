const Carrito = require('../models/carrito');
const DetalleCarrito = require ('../models/detalle_carrito_producto');
const Tamano = require ('../models/tamano');
const Producto = require ('../models/productos');
const UsuarioVendedor = require ('../models/usuario_vendedor');
const Encargo = require ('../models/encargo');

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


//Obtener todos los carritos por el idUsuarioCliente
exports.carritoUsuarioCliente = async (req, res) =>{
  const idUsuarioCliente = req.body;
  try {
    const carrito = await Carrito.findOne({
      where: {
        idUsuarioCliente,
        estado:true
      }
    });

    //Se obtienen los productos en Stock que formen parte del carrito del cliente
    const detalle = await DetalleCarrito.findAll({
      attributes:['cantidad_productos'],
      include:[
        {
          model:Tamano,
          attributes: ['nombre_size','precio'],
          include: [{
            model:Producto,
            attributes: ['nombre','nombre_imagen'],
            include:[{
              model:UsuarioVendedor,
              attributes: ['nombre_marca']
            }]
          }]
        }
      ],
      where:{
        pk_fk_id_carrito:carrito.pk_id_carrito
      }
    });

  res.status(201).json({
    message:'Se han obtenido exitosamente los datos del carrito',
    data: detalle
  })
  
  } catch (error) {
    console.error("Error al realizar la consulta del carrito: ", error);
    res.status(500).json({ message: "Error al realizar la consulta del carrito", error });
  }
}

// Traer los carritos ya pagados (en false) de los clientes
exports.historicoCarritoCliente = async (req, res) =>{
  const idUsuarioCliente = req.body;
  try {
    const carrito = await Carrito.findOne({
      where: {
        idUsuarioCliente,
        estado:false
      }
    });

    //Se obtienen los productos que formaron parte de los carritos del cliente
    const detalle = await DetalleCarrito.findAll({
      attributes:['cantidad_productos'],
      include:[
        {
          model:Tamano,
          attributes: ['nombre_size','precio'],
          include: [{
            model:Producto,
            attributes: ['nombre','nombre_imagen'],
            include:[{
              model:UsuarioVendedor,
              attributes: ['nombre_marca']
            }]
          }]
        }
      ],
      where:{
        pk_fk_id_carrito:carrito.pk_id_carrito
      }
    });

  res.status(201).json({
    message:'Se han obtenido exitosamente los datos de los carritos en histotial',
    data: detalle
  })
  
  } catch (error) {
    console.error("Error al realizar la consulta del carrito: ", error);
    res.status(500).json({ message: "Error al realizar la consulta del carrito", error });
  }
}