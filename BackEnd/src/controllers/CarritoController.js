const Carrito = require('../models/carrito');
const DetalleCarrito = require ('../models/detalle_carrito_producto');
const Tamano = require ('../models/tamano');
const Producto = require ('../models/productos');
const UsuarioVendedor = require ('../models/usuario_vendedor');
const Encargo = require ('../models/encargo');
const { toDefaultValue } = require('sequelize/lib/utils');

// Crear un nuevo carrito
exports.createCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.create(req.body);
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el carrito', error });
  }
};

exports.agregarAlCarrito = async (req, res) =>{
  const { idCliente, idTamaño, cantidad } = req.body;
  let idCarrito;
  const transaction = await sequelize.transaction();
  try {

    //Se evalua si tenemos un carrito activo actualmente
    const existencia = await Carrito.findOne({
      where:{
        fk_id_cliente:idCliente,
        estado: true
      }, transaction
    });

    //Si el carrito esta activo...
    if(existencia){
      idCarrito = existencia.pk_id_carrito //Se guarda el valor del id de la busqueda que se hizo
    }

    //Si no hay un carrito activo...
    else{
      //Se crea un nuevo carrito...
      const carrito = await Carrito.create({
        fk_id_cliente:idCliente,
        total: 0,
        estado: true,
      },transaction);
      idCarrito = carrito.dataValues.pk_id_carrito //Y se guarda el valor de su id
    }

    // Se almacena dentro del detalle el producto agregado
    const productoAgregado = await DetalleCarrito.create({
      pk_fk_id_carrito: idCarrito,
      pk_fk_id_tamaño: idTamaño,
      cantidad: cantidad
    }, transaction);

    //Se busca el precio del tamaño que se seleccionó
    const precio = await Tamano.findOne({
      include:['precio'],
      where:{
        pk_id_tamano:idTamaño
      }, transaction
    });

    //Calculamos el nuevo valor de aumento del valor del carrito
    const incremento = precio.dataValues.precio * cantidad;

    // Actualizamos el total del carrito
    await Carrito.increment('total',
      {
        by:incremento,
        where:{
          pk_id_carrito:idCarrito
        }
      },
      transaction
    );

    await transaction.commit();
    res.status(201).json({
      message:'Se ha agregado de manera correcta el producto al carrito'
    });
  } catch (error) {
    console.error('Se ha producido un problema al agregar el producto: ', error);
    res.status(500).json({
      message:'Se ha producido un problema al agregar el producto: ', error
    });
    await t.rollback();
  }
}

exports.eliminarProductoDeCarrito = async (req, res) => {
  const { idCliente, idTamaño } = req.body;

  try {
    // Verificamos que exista un detalle con los valores proporcionados
    const detalle = await DetalleCarrito.findOne({
      include: [
        {
          model: Carrito,
          where: {
            fk_id_cliente: idCliente,
            estado: true, // Solo consideramos carritos vigentes
          },
        },
      ],
      where: {
        pk_fk_id_tamaño: idTamaño, // Tamaño específico
      },
    });

    if (!detalle) {
      return res.status(404).json({ message: "Detalle no encontrado" });
    }

    // Buscamos el precio del tamaño
    const precio = await Tamano.findOne({
      attributes: ['precio'], // Solo necesitamos el precio
      where: {
        pk_id_tamano: idTamaño,
      },
    });

    if (!precio) {
      return res.status(404).json({ message: "Tamaño no encontrado" });
    }

    // Calculamos el valor a restar al total del carrito
    const disminucion = precio.dataValues.precio * detalle.dataValues.cantidad;

    // Actualizamos el total del carrito
    await Carrito.update(
      { total: sequelize.literal(`total - ${disminucion}`) },
      { where: { pk_id_carrito: detalle.pk_fk_id_carrito } }
    );

    // Eliminamos el detalle del carrito
    await DetalleCarrito.destroy({
      where: {
        pk_fk_id_carrito: detalle.pk_fk_id_carrito,
        pk_fk_id_tamaño: idTamaño,
      },
    });

    return res.status(200).json({ message: "Producto eliminado del carrito correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return res.status(500).json({ message: "Ocurrió un error al procesar la solicitud" });
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