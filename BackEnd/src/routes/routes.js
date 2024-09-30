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

// Rutas para Carrito
router.route('/carrito')
  .get(CarritoController.getCarritos)
  .post(CarritoController.createCarrito);

router.route('/carrito/:id')
  .get(CarritoController.getCarritoById)
  .put(CarritoController.updateCarrito)
  .delete(CarritoController.deleteCarrito);

// Rutas para Categoria
router.route('/categorias')
  .get(CategoriaController.getAll)
  .post(CategoriaController.create);

router.route('/categorias/:id')
  .get(CategoriaController.getById)
  .put(CategoriaController.update)
  .delete(CategoriaController.delete);

// Rutas para DetalleCarritoProducto
router.route('/detalle-carrito-producto')
  .get(DetalleCarritoProductoController.getAll)
  .post(DetalleCarritoProductoController.create);

router.route('/detalle-carrito-producto/:id')
  .get(DetalleCarritoProductoController.getById)
  .put(DetalleCarritoProductoController.update)
  .delete(DetalleCarritoProductoController.delete);

// Rutas para DetalleUsuariosDirecciones
router.route('/detalle-usuarios-direcciones')
  .get(DetalleUsuariosDireccionesController.getAll)
  .post(DetalleUsuariosDireccionesController.create);

router.route('/detalle-usuarios-direcciones/:id')
  .get(DetalleUsuariosDireccionesController.getById)
  .put(DetalleUsuariosDireccionesController.update)
  .delete(DetalleUsuariosDireccionesController.delete);

// Rutas para Direcciones
router.route('/direcciones')
  .get(DireccionesController.getAll)
  .post(DireccionesController.create);

router.route('/direcciones/:id')
  .get(DireccionesController.getById)
  .put(DireccionesController.update)
  .delete(DireccionesController.delete);

// Rutas para Encargo
router.route('/encargo')
  .get(EncargoController.getAll)
  .post(EncargoController.create);

router.route('/encargo/:id')
  .get(EncargoController.getById)
  .put(EncargoController.update)
  .delete(EncargoController.delete);

// Rutas para PaginaVendedor
router.route('/pagina-vendedor')
  .get(PaginaVendedorController.getAll)
  .post(PaginaVendedorController.create);

router.route('/pagina-vendedor/:id')
  .get(PaginaVendedorController.getById)
  .put(PaginaVendedorController.update)
  .delete(PaginaVendedorController.delete);

// Rutas para Producto
router.route('/productos')
  .get(ProductoController.getAll)
  .post(ProductoController.create);

router.route('/productos/:id')
  .get(ProductoController.getById)
  .put(ProductoController.update)
  .delete(ProductoController.delete);

// Rutas para Review
router.route('/review')
  .get(ReviewController.getAll)
  .post(ReviewController.create);

router.route('/review/:id')
  .get(ReviewController.getById)
  .put(ReviewController.update)
  .delete(ReviewController.delete);

// Rutas para Tamano
router.route('/tamano')
  .get(TamanoController.getAll)
  .post(TamanoController.create);

router.route('/tamano/:id')
  .get(TamanoController.getById)
  .put(TamanoController.update)
  .delete(TamanoController.delete);

// Rutas para UsuarioCliente
router.route('/usuario-cliente')
  .get(UsuarioClienteController.getAll)
  .post(UsuarioClienteController.create);

router.route('/usuario-cliente/:id')
  .get(UsuarioClienteController.getById)
  .put(UsuarioClienteController.update)
  .delete(UsuarioClienteController.delete);

// Rutas para Usuario
router.route('/usuario')
  .get(UsuarioController.getAll)
  .post(UsuarioController.create);

router.route('/usuario/:id')
  .get(UsuarioController.getById)
  .put(UsuarioController.update)
  .delete(UsuarioController.delete);

// Rutas para UsuarioVendedor
router.route('/usuario-vendedor')
  .get(UsuarioVendedorController.getAll)
  .post(UsuarioVendedorController.create);

router.route('/usuario-vendedor/:id')
  .get(UsuarioVendedorController.getById)
  .put(UsuarioVendedorController.update)
  .delete(UsuarioVendedorController.delete);

module.exports = router;
