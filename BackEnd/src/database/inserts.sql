use gremio;
-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios (correo, nombre, apellido, numeroCelular, contrasena) VALUES
('usuario1@example.com', 'Juan', 'Pérez', '1234567890', 'contraseña1'),
('usuario2@example.com', 'María', 'Gómez', '0987654321', 'contraseña2'),
('usuario3@example.com', 'Carlos', 'Martínez', '1231231234', 'contraseña3'),
('usuario4@example.com', 'Ana', 'Hernández', '9876543210', 'contraseña4'),
('usuario5@example.com', 'Luis', 'López', '5555555555', 'contraseña5');

-- Insertar datos en la tabla Categorias
INSERT INTO Categorias (categoria) VALUES
('Electrónica'),
('Ropa'),
('Alimentos'),
('Muebles'),
('Juguetes');

-- Insertar datos en la tabla Usuario_clientes
INSERT INTO Usuario_clientes (fk_id_usuario) VALUES
(1),
(2),
(3),
(4),
(5);

-- Insertar datos en la tabla Usuario_vendedores
INSERT INTO Usuario_vendedores (fk_id_usuario, nombre_marca) VALUES
(1, 'Marca A'),
(2, 'Marca B'),
(3, 'Marca C'),
(4, 'Marca D'),
(5, 'Marca E');

-- Insertar datos en la tabla Productos
INSERT INTO Productos (nombre, stock, nombre_imagen, fk_id_vendedor, fk_id_categorias) VALUES
('Producto 1', 50, 'producto1.jpg', 1, 1),
('Producto 2', 30, 'producto2.jpg', 2, 2),
('Producto 3', 20, 'producto3.jpg', 3, 3),
('Producto 4', 15, 'producto4.jpg', 4, 4),
('Producto 5', 10, 'producto5.jpg', 5, 5);

-- Insertar datos en la tabla tamanos
INSERT INTO tamanos (fk_id_producto, nombre_size, precio) VALUES
(1, 'Pequeño', 10.00),
(1, 'Mediano', 15.00),
(2, 'Grande', 20.00),
(3, 'Pequeño', 5.00),
(4, 'Grande', 25.00);

-- Insertar datos en la tabla Carritos
INSERT INTO Carritos (fk_id_cliente, total) VALUES
(1, 100.00),
(2, 150.50),
(3, 75.25),
(4, 200.00),
(5, 50.00);

-- Insertar datos en la tabla Detalle_carrito_productos
INSERT INTO Detalle_carrito_productos (pk_fk_id_carrito, pk_fk_id_tamaño, cantidad_productos) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 1, 3),
(3, 2, 4),
(4, 1, 1);

-- Insertar datos en la tabla Direcciones
INSERT INTO Direcciones (direccion) VALUES
('123 Calle Falsa, Ciudad A'),
('456 Avenida Siempre Viva, Ciudad B'),
('789 Boulevard del Río, Ciudad C'),
('321 Paseo de la Reforma, Ciudad D'),
('654 Calle de la Paz, Ciudad E');

-- Insertar datos en la tabla Detalle_usuario_direcciones
INSERT INTO Detalle_usuario_direcciones (pk_fk_id_usuario, pk_fk_id_direcciones) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

-- Insertar datos en la tabla Encargos
INSERT INTO Encargos (fk_id_vendedor, fk_id_carrito, descripcion) VALUES
(1, 1, 'Encargo de prueba 1'),
(2, 2, 'Encargo de prueba 2'),
(3, 3, 'Encargo de prueba 3'),
(4, 4, 'Encargo de prueba 4'),
(5, 5, 'Encargo de prueba 5');

-- Insertar datos en la tabla Pagina_vendedores
INSERT INTO Pagina_vendedores (foto_perfil, color_primario) VALUES
('foto1.jpg', '#FF5733'),
('foto2.jpg', '#33FF57'),
('foto3.jpg', '#3357FF'),
('foto4.jpg', '#F3FF33'),
('foto5.jpg', '#FF33F6');

-- Insertar datos en la tabla Reviews
INSERT INTO Reviews (review, calificacion, fk_id_pagina, fk_id_cliente) VALUES
('Excelente producto', 5, 1, 1),
('Muy buena atención', 4, 2, 2),
('Recomendado', 5, 3, 3),
('Satisfecho con la compra', 3, 4, 4),
('No volveré a comprar', 1, 5, 5);
