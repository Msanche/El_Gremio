const Carrito = require('../models/carrito');
const DetalleCarrito = require ('../models/detalle_carrito_producto');
const Tamano = require ('../models/tamano');
const Producto = require ('../models/productos');
const UsuarioVendedor = require ('../models/usuario_vendedor');
const  sequelize = require('../database/database');
const UsuarioCliente = require('../models/usuario_cliente');
const Usuario = require('../models/usuario');
const { Op } = require('sequelize');
const DetalleCarritoProducto = require('../models/detalle_carrito_producto');

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
  console.log(req.body)
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
     //Se evalua si tenemos un carrito activo actualmente
     const existenciaDetalle = await DetalleCarrito.findOne({
      where:{
        pk_fk_id_carrito:idCarrito,
        pk_fk_id_tamano: idTamaño
      }, transaction
    });
    if (existenciaDetalle) {
      const resultado = await DetalleCarrito.update(
        { 
          cantidad_productos: cantidad // Valor actualizado
        },
        { 
          where: { 
            pk_fk_id_carrito: idCarrito, 
            pk_fk_id_tamano: idTamaño 
          },
          transaction // Incluye la transacción si estás usando una
        }
      );
      
    }else{
  // Se almacena dentro del detalle el producto agregado
  const productoAgregado = await DetalleCarrito.create({
    pk_fk_id_carrito: idCarrito,
    pk_fk_id_tamano: idTamaño,
    cantidad_productos: cantidad
  }, transaction);

    }
  
    //Se busca el precio del tamaño que se seleccionó
    const precio = await Tamano.findOne({
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
    await transaction.rollback();
  }
}

exports.eliminarProductoDeCarrito = async (req, res) => {
  const { idCliente, idTamaño } = req.body;
  console.log(idCliente, idTamaño)
  console.log(req.body)
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
        pk_fk_id_tamano: idTamaño, // Tamaño específico
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
    const disminucion = precio.dataValues.precio * detalle.dataValues.cantidad_productos;
    console.log(precio,detalle)
    // Actualizamos el total del carrito
    await Carrito.update(
      { total: sequelize.literal(`total - ${disminucion}`) },
      { where: { pk_id_carrito: detalle.pk_fk_id_carrito } }
    );

    // Eliminamos el detalle del carrito
    await DetalleCarrito.destroy({
      where: {
        pk_fk_id_carrito: detalle.pk_fk_id_carrito,
        pk_fk_id_tamano: idTamaño,
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






//Obtener todos los carritos por el idUsuarioCliente
exports.carritoUsuarioCliente = async (req, res) =>{
  const {idUsuarioCliente} = req.body;
  console.log
  if (idUsuarioCliente) {
    try {
      const carrito = await Carrito.findOne({
        where: {
          fk_id_cliente:idUsuarioCliente,
          estado:true
        }
      });
  
      //Se obtienen los productos en Stock que formen parte del carrito del cliente
      const detalle = await DetalleCarrito.findAll({
        attributes:['cantidad_productos'],
        include:[
          {
            model:Tamano,
            include: [{
              model:Producto,
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
  
}

// Traer los carritos ya pagados (en false) de los clientes
exports.historicoCarritoCliente = async (req, res) =>{
  const idUsuarioCliente = req.body;

  console.log('Lo que nos llega del req.body ', req.body); 
  console.log('Lo que nos llega en idUsuario, ',idUsuarioCliente.pk_id_cliente); 
  try {

    // Obtener todos los carritos del cliente
    const carritos = await Carrito.findAll({
      where: {
        fk_id_cliente: idUsuarioCliente.pk_id_cliente,
        estado: false
      }
    });
    
    // Extraer los IDs de los carritos
    const carritoIds = carritos.map(carrito => carrito.pk_id_carrito);
    let detalles
    // Verificar que hay carritos antes de ejecutar la consulta de detalles
    if (carritoIds.length > 0) {
      // Obtener los productos de los carritos
      detalles = await DetalleCarrito.findAll({
        attributes: ['cantidad_productos'],
        include: [
          {
            model: Tamano,
            attributes: ['nombre_size', 'precio'],
            include: [
              {
                model: Producto,
                attributes: ['nombre', 'nombre_imagen'],
                include: [
                  {
                    model: UsuarioVendedor,
                    attributes: ['nombre_marca']
                  }
                ]
              }
            ]
          }
        ],
        where: {
          pk_fk_id_carrito: {
            [Op.in]: carritoIds // Filtrar por todos los IDs de los carritos
          }
        }
      });
    
      console.log(detalles);
    } else {
      console.log('No hay carritos activos para este cliente.');
    }
    
    console.log('Los datos del historico son los siguientes: ', );
  res.status(201).json({
    message:'Se han obtenido exitosamente los datos de los carritos en histotial',
    data: detalles
  })
  
  } catch (error) {
    console.error("Error al realizar la consulta del carrito: ", error);
    res.status(500).json({ message: "Error al realizar la consulta del carrito", error });
  }
}

exports.historicoCarritoVendedor = async (req, res) => {
  const { idVendedor } = req.body;

  if (!idVendedor) {
    return res.status(400).json({ message: "El ID del vendedor es requerido." });
  }

  try {
    const historico = await DetalleCarrito.findAll({
      include: [
        {
          model: Carrito,
          where: {
            estado: false, // Solo carritos ya procesados
          },
          include: [
            {
              model: UsuarioCliente,
              include: [
                {
                  model: Usuario, // Información del cliente asociado
                },
              ],
            }
          ],
        },
        {
          model: Tamano,
          include: [
            {
              model: Producto,
              where: {
                fk_id_vendedor: idVendedor, // Filtramos productos del vendedor
              },
            },
          ],
        },
      ],
    });

    if (historico.length === 0) {
      return res.status(404).json({ message: "No se encontraron registros para este vendedor." });
    }

    res.status(200).json({
      message: "Datos obtenidos exitosamente.",
      data: historico,
    });
  } catch (error) {
    console.error("Error al realizar la consulta del carrito:", error);
    res.status(500).json({
      message: "Error al realizar la consulta del carrito.",
      error: error.message,
    });
  }
};

exports.pagarCarrito = async (req, res) => {
  console.log('lo que viene del idUsuarioCliente ');

  const transaction = await sequelize.transaction(); // Iniciar una transacción

  try {
    const { idUsuarioCliente } = req.body;

    // Verificar si se envió el idUsuarioCliente
    if (!idUsuarioCliente) {
      return res.status(400).json({ message: "El ID del usuario cliente es requerido." });
    }

    // Obtener el carrito activo del cliente
    const carritos = await Carrito.findAll({
      where: {
        fk_id_cliente: idUsuarioCliente,
        estado: true, // Solo carritos activos
      },
      transaction
    });

    if (carritos.length === 0) {
      return res.status(404).json({ message: "No se encontró un carrito activo para este usuario." });
    }

    // Extraer los IDs de los carritos
    const carritoIds = carritos.map(carrito => carrito.pk_id_carrito);

    // Obtener los productos y las cantidades del carrito
    const detalles = await DetalleCarritoProducto.findAll({
      attributes: ['cantidad_productos'],
      include: [
        {
          model: Tamano,
          attributes: ['fk_id_producto'],
          include: [
            {
              model: Producto,
              attributes: ['id_producto', 'stock'],
            }
          ]
        }
      ],
      where: { pk_fk_id_carrito: carritoIds }, // Filtrar por todos los IDs de los carritos
      transaction
    });

    // Actualizar el stock de los productos
    for (const detalle of detalles) {
      console.log(detalle.tamano)
      const cantidad = detalle.cantidad_productos; // Cantidad a descontar
      const producto = detalle.tamano.Producto; // Información del producto

      if (!producto) {
        throw new Error('Producto no encontrado para el detalle del carrito.');
      }

      const nuevoStock = producto.stock - cantidad; // Calcular el nuevo stock

      if (nuevoStock < 0) {
        throw new Error(`Stock insuficiente para el producto con ID ${producto.id_producto}.`);
      }

      // Actualizar el stock en la base de datos
      await Producto.update(
        { stock: nuevoStock },
        {
          where: { id_producto: producto.id_producto },
          transaction
        }
      );
    }

    // Actualizar el estado del carrito
    const [filasActualizadas] = await Carrito.update(
      { estado: false }, // Cambiar el estado del carrito
      {
        where: {
          fk_id_cliente: idUsuarioCliente,
        },
        transaction
      }
    );

    if (filasActualizadas === 0) {
      throw new Error("No se encontró un carrito para actualizar.");
    }

    // Confirmar la transacción
    await transaction.commit();

    res.status(200).json({ message: "El pago se procesó correctamente y el stock se actualizó." });

  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error("Error al procesar el pago del carrito:", error);
    res.status(500).json({
      message: "Error al procesar el pago del carrito.",
      error: error.message,
    });
  }
};
