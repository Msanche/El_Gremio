// src/source/index.js
const express = require('express');
const router = express.Router();

// Importar controladores
const CarritoController = require('../controllers/CarritoController');
const CategoriaController = require('../controllers/CategoriaController');
const DetalleCarritoProductoController = require('../controllers/DetalleCarritoProductoController');
const DetalleUsuariosDireccionesController = require('../controllers/DetalleUsuariosDireccionesController');
const DireccionesController = require('../controllers/DireccionesController');
const EncargoController = require('../controllers/EncargoController');
const PaginaVendedorController = require('../controllers/PaginaVendedorController');
const ProductoController = require('../controllers/ProductoController');
const ReviewController = require('../controllers/ReviewController');
const TamanoController = require('../controllers/TamanoController');
const UsuarioClienteController = require('../controllers/UsuarioClienteController');
const UsuarioController = require('../controllers/UsuarioController');
const UsuarioVendedorController = require('../controllers/UsuarioVendedorController');
const upload = require('../Middleware/multer')
const AuthController = require('../controllers/AuthController');

router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);

// Rutas para Carrito
router.route('/carrito')
  .get(CarritoController.getCarritos)      // Obtener todos los carritos
  .post(CarritoController.createCarrito) // Crear un nuevo carrito
  ;  

// Agregar producto al carrito
router.post('/carrito/agregar', CarritoController.agregarAlCarrito);

// Eliminar producto del carrito
router.put('/carrito/eliminar', CarritoController.eliminarProductoDeCarrito);

router.route('/carrito/:id')
  .get(CarritoController.getCarritoById)   // Obtener un carrito por ID
  .put(CarritoController.updateCarrito)    // Actualizar un carrito por ID
  .delete(CarritoController.deleteCarrito); // Eliminar un carrito por ID

router.route('/carritoCliente')
  .put(CarritoController.carritoUsuarioCliente); // traer los productos del carrito por ID del cliente

router.route('/carritoCliente/historico')
  .get(CarritoController.historicoCarritoCliente); // traer los productos previamente comprados por el cliente
  
router.route('/carritoVendedor/historico')
.get(CarritoController.historicoCarritoVendedor); // traer los productos previamente comprados por el vendedor

// Rutas para las categorías
router.route('/categorias')
  .get(CategoriaController.getCategorias)      // Obtener todas las categorías
  .post(CategoriaController.createCategoria);  // Crear una nueva categoría

router.route('/categorias/:id')
  .get(CategoriaController.getCategoriaById)   // Obtener una categoría por ID
  .put(CategoriaController.updateCategoria)    // Actualizar una categoría por ID
  .delete(CategoriaController.deleteCategoria); // Eliminar una categoría por ID

// Rutas para los detalles del carrito y producto
router.route('/detalles-carrito-producto')
  .get(DetalleCarritoProductoController.getDetallesCarritoProducto)      // Obtener todos los detalles de carrito y producto
  .post(DetalleCarritoProductoController.createDetalleCarritoProducto);  // Crear un nuevo detalle de carrito y producto

router.route('/detalles-carrito-producto/:id')
  .get(DetalleCarritoProductoController.getDetalleCarritoProductoById)   // Obtener un detalle por ID
  .put(DetalleCarritoProductoController.updateDetalleCarritoProducto)    // Actualizar un detalle por ID
  .delete(DetalleCarritoProductoController.deleteDetalleCarritoProducto); // Eliminar un detalle por ID


// Rutas para los detalles de usuario y direcciones
router.route('/detalles-usuario-direcciones')
  .get(DetalleUsuariosDireccionesController.getDetallesUsuarioDirecciones)      // Obtener todos los detalles de usuario y direcciones
  .post(DetalleUsuariosDireccionesController.createDetalleUsuarioDireccion);    // Crear un nuevo detalle de usuario y dirección

router.route('/detalles-usuario-direcciones/:id')
  .get(DetalleUsuariosDireccionesController.getDetalleUsuarioDireccionById)     // Obtener un detalle por ID
  .put(DetalleUsuariosDireccionesController.updateDetalleUsuarioDireccion)      // Actualizar un detalle por ID
  .delete(DetalleUsuariosDireccionesController.deleteDetalleUsuarioDireccion);  // Eliminar un detalle por ID


// Rutas para las direcciones
router.route('/direcciones')
  .get(DireccionesController.getDirecciones)      // Obtener todas las direcciones
  .post(DireccionesController.createDireccion);   // Crear una nueva dirección

router.route('/direcciones/:id')
  .get(DireccionesController.getDireccionById)    // Obtener una dirección por ID
  .put(DireccionesController.updateDireccion)     // Actualizar una dirección por ID
  .delete(DireccionesController.deleteDireccion); // Eliminar una dirección por ID

// Rutas para los encargos
router.route('/encargos')
  .get(EncargoController.getEncargos)      // Obtener todos los encargos
  .post(EncargoController.createEncargo);  // Crear un nuevo encargo

router.route('/encargos/:id')
  .get(EncargoController.getEncargoById)   // Obtener un encargo por ID
  .put(EncargoController.updateEncargo)    // Actualizar un encargo por ID
  .delete(EncargoController.deleteEncargo); // Eliminar un encargo por ID

// Rutas para las páginas de vendedor
router.route('/paginaVendedores')
  .get(PaginaVendedorController.getPaginaVendedores)      // Obtener todas las páginas de vendedores
  .post(PaginaVendedorController.createPaginaVendedor);   // Crear una nueva página de vendedor

router.route('/paginaVendedores/:id')
  .get(PaginaVendedorController.getPaginaVendedorById)    // Obtener una página de vendedor por ID
  .put(PaginaVendedorController.updatePaginaVendedor)     // Actualizar una página de vendedor por ID
  .delete(PaginaVendedorController.deletePaginaVendedor); // Eliminar una página de vendedor por ID


  router.route('/productos')
  .get(ProductoController.getProductos) // Obtener todos los productos
  .post(upload.single('nombre_imagen'), ProductoController.createProducto); // Procesar archivo antes de crear producto


router.route('/LastProductos')
  .get(ProductoController.getLastProductos) ;

router.route('/productos/:id')
  .get(ProductoController.getProductoById)    // Obtener un producto por ID
  .put(ProductoController.updateProducto)     // Actualizar un producto por ID
  .delete(ProductoController.deleteProducto); // Eliminar un producto por ID

router.route('/productos/Category/:idCategory')
  .get(ProductoController.getProductoByCategory)    // Obtener un producto por ID de categoria

router.route('/productos/vendedor/:idVendedor')
  .get(ProductoController.getProductosPorIdVendedor); // Obtener un producto por el ID del vendedor

// Rutas para las reviews
router.route('/reviews')
  .get(ReviewController.getReviews)            // Obtener todas las reviews
  .post(ReviewController.createReview);           // Crear una nueva review

router.route('/reviews/:id')
  .get(ReviewController.getReviewById)         // Obtener una review por ID
  .put(ReviewController.updateReview)           // Actualizar una review por ID
  .delete(ReviewController.deleteReview);       // Eliminar una review por ID

router.route('/reviews/:idPage')
  .get(ReviewController.getReviewsByIdPage);  // Obtener reviews por id Pagina 

// Rutas para los tamaños
router.route('/tamanos')
  .get(TamanoController.getTamanos)            // Obtener todos los tamaños
  .post(TamanoController.createTamano);         // Crear un nuevo tamaño

router.route('/tamanos/:id')
  .get(TamanoController.getTamanoById)         // Obtener un tamaño por ID
  .put(TamanoController.updateTamano)           // Actualizar un tamaño por ID
  .delete(TamanoController.deleteTamano);       // Eliminar un tamaño por ID


// Rutas para los usuarios clientes
router.route('/usuarios-clientes')
  .get(UsuarioClienteController.getUsuarioClientes)       // Obtener todos los usuarios clientes
  .post(UsuarioClienteController.createUsuarioCliente);    // Crear un nuevo usuario cliente

router.route('/usuarios-clientes/:id')
  .get(UsuarioClienteController.getUsuarioClienteById)    // Obtener un usuario cliente por ID
  .put(UsuarioClienteController.updateUsuarioCliente)      // Actualizar un usuario cliente por ID
  .delete(UsuarioClienteController.deleteUsuarioCliente);  // Eliminar un usuario cliente por ID

// Rutas para los usuarios
router.route('/usuarios')
  .get(UsuarioController.getUsuarios)       // Obtener todos los usuarios
  .post(UsuarioController.login);    // Crear un nuevo usuario

router.route('/usuarios/:id')
  .get(UsuarioController.getUsuarioById)    // Obtener un usuario por ID
  .put(UsuarioController.updateUsuario)      // Actualizar un usuario por ID
  .delete(UsuarioController.deleteUsuario);  // Eliminar un usuario por ID

// Rutas para los usuarios vendedores
router.route('/usuarios-vendedores')
  .get(UsuarioVendedorController.getUsuarioVendedores)       // Obtener todos los usuarios vendedores
  .post(upload.single('imagen'),UsuarioVendedorController.createUsuarioVendedor);     // Crear un nuevo usuario vendedor

router.route('/usuarios-vendedores/:id')
  .get(UsuarioVendedorController.getUsuarioVendedorById)     // Obtener un usuario vendedor por ID
  .put(UsuarioVendedorController.updateUsuarioVendedor)       // Actualizar un usuario vendedor por ID
  .delete(UsuarioVendedorController.deleteUsuarioVendedor);    // Eliminar un usuario vendedor por ID

module.exports = router;
