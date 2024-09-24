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
router.get('/carrito', CarritoController.getAll);
router.post('/carrito', CarritoController.create);
router.get('/carrito/:id', CarritoController.getById);
router.put('/carrito/:id', CarritoController.update);
router.delete('/carrito/:id', CarritoController.delete);

// Rutas para Categoria
router.get('/categorias', CategoriaController.getAll);
router.post('/categorias', CategoriaController.create);
router.get('/categorias/:id', CategoriaController.getById);
router.put('/categorias/:id', CategoriaController.update);
router.delete('/categorias/:id', CategoriaController.delete);

// Rutas para DetalleCarritoProducto
router.get('/detalle-carrito-producto', DetalleCarritoProductoController.getAll);
router.post('/detalle-carrito-producto', DetalleCarritoProductoController.create);
router.get('/detalle-carrito-producto/:id', DetalleCarritoProductoController.getById);
router.put('/detalle-carrito-producto/:id', DetalleCarritoProductoController.update);
router.delete('/detalle-carrito-producto/:id', DetalleCarritoProductoController.delete);

// Rutas para DetalleUsuariosDirecciones
router.get('/detalle-usuarios-direcciones', DetalleUsuariosDireccionesController.getAll);
router.post('/detalle-usuarios-direcciones', DetalleUsuariosDireccionesController.create);
router.get('/detalle-usuarios-direcciones/:id', DetalleUsuariosDireccionesController.getById);
router.put('/detalle-usuarios-direcciones/:id', DetalleUsuariosDireccionesController.update);
router.delete('/detalle-usuarios-direcciones/:id', DetalleUsuariosDireccionesController.delete);

// Rutas para Direcciones
router.get('/direcciones', DireccionesController.getAll);
router.post('/direcciones', DireccionesController.create);
router.get('/direcciones/:id', DireccionesController.getById);
router.put('/direcciones/:id', DireccionesController.update);
router.delete('/direcciones/:id', DireccionesController.delete);

// Rutas para Encargo
router.get('/encargo', EncargoController.getAll);
router.post('/encargo', EncargoController.create);
router.get('/encargo/:id', EncargoController.getById);
router.put('/encargo/:id', EncargoController.update);
router.delete('/encargo/:id', EncargoController.delete);

// Rutas para PaginaVendedor
router.get('/pagina-vendedor', PaginaVendedorController.getAll);
router.post('/pagina-vendedor', PaginaVendedorController.create);
router.get('/pagina-vendedor/:id', PaginaVendedorController.getById);
router.put('/pagina-vendedor/:id', PaginaVendedorController.update);
router.delete('/pagina-vendedor/:id', PaginaVendedorController.delete);

// Rutas para Producto
router.get('/productos', ProductoController.getAll);
router.post('/productos', ProductoController.create);
router.get('/productos/:id', ProductoController.getById);
router.put('/productos/:id', ProductoController.update);
router.delete('/productos/:id', ProductoController.delete);

// Rutas para Review
router.get('/review', ReviewController.getAll);
router.post('/review', ReviewController.create);
router.get('/review/:id', ReviewController.getById);
router.put('/review/:id', ReviewController.update);
router.delete('/review/:id', ReviewController.delete);

// Rutas para Tamano
router.get('/tamano', TamanoController.getAll);
router.post('/tamano', TamanoController.create);
router.get('/tamano/:id', TamanoController.getById);
router.put('/tamano/:id', TamanoController.update);
router.delete('/tamano/:id', TamanoController.delete);

// Rutas para UsuarioCliente
router.get('/usuario-cliente', UsuarioClienteController.getAll);
router.post('/usuario-cliente', UsuarioClienteController.create);
router.get('/usuario-cliente/:id', UsuarioClienteController.getById);
router.put('/usuario-cliente/:id', UsuarioClienteController.update);
router.delete('/usuario-cliente/:id', UsuarioClienteController.delete);

// Rutas para Usuario
router.get('/usuario', UsuarioController.getAll);
router.post('/usuario', UsuarioController.create);
router.get('/usuario/:id', UsuarioController.getById);
router.put('/usuario/:id', UsuarioController.update);
router.delete('/usuario/:id', UsuarioController.delete);

// Rutas para UsuarioVendedor
router.get('/usuario-vendedor', UsuarioVendedorController.getAll);
router.post('/usuario-vendedor', UsuarioVendedorController.create);
router.get('/usuario-vendedor/:id', UsuarioVendedorController.getById);
router.put('/usuario-vendedor/:id', UsuarioVendedorController.update);
router.delete('/usuario-vendedor/:id', UsuarioVendedorController.delete);

module.exports = router;
