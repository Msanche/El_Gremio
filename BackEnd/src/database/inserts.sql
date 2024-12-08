-- Poblar la tabla Categorias
INSERT INTO Categorias (categoria)
VALUES 
('Crochet');


-- -- Poblar la tabla Usuarios
-- INSERT INTO Usuarios (correo, nombre, apellido, numeroCelular, contrasena)
-- VALUES 
-- ('usuario1@example.com', 'Juan', 'Pérez', '1234567890', 'hashedpassword1'),
-- ('usuario2@example.com', 'Ana', 'López', '0987654321', 'hashedpassword2'),
-- ('usuario3@example.com', 'Carlos', 'Ramírez', '1122334455', 'hashedpassword3');

-- -- Poblar la tabla Usuario_clientes
-- INSERT INTO Usuario_clientes (fk_id_usuario)
-- VALUES 
-- (1),
-- (2);

-- -- Poblar la tabla Pagina_vendedores
-- INSERT INTO Pagina_vendedores (foto_perfil, color_primario)
-- VALUES 
-- ('perfil1.jpg', '#FF5733'),
-- ('perfil2.jpg', '#33FF57');

-- -- Poblar la tabla Usuario_vendedores
-- INSERT INTO Usuario_vendedores (fk_id_usuario, nombre_marca, fk_pagina_vendedor)
-- VALUES 
-- (3, 'TiendaTech', 1),
-- (2, 'RopaChic', 2);

-- -- Poblar la tabla Productos
-- INSERT INTO Productos (nombre, stock, nombre_imagen, fk_id_vendedor, fk_id_categorias)
-- VALUES 
-- ('Smartphone', 50, 'smartphone.jpg', 1, 1),
-- ('Playera', 100, 'playera.jpg', 2, 2);

-- -- Poblar la tabla tamanos
-- INSERT INTO tamanos (fk_id_producto, nombre_size, precio)
-- VALUES 
-- (1, 'Normal', 5000.00),
-- (2, 'L', 350.00),
-- (2, 'M', 300.00);

-- -- Poblar la tabla Carritos
-- INSERT INTO Carritos (fk_id_cliente, total)
-- VALUES 
-- (1, 1000.00),
-- (2, 1500.00);

-- -- Poblar la tabla Detalle_carrito_productos
-- INSERT INTO Detalle_carrito_productos (pk_fk_id_carrito, pk_fk_id_tamaño, cantidad_productos)
-- VALUES 
-- (1, 1, 1),
-- (2, 2, 2);

-- -- Poblar la tabla Direcciones
-- INSERT INTO Direcciones (direccion)
-- VALUES 
-- ('Calle 123, Ciudad A'),
-- ('Avenida 456, Ciudad B');

-- -- Poblar la tabla Detalle_usuario_direcciones
-- INSERT INTO Detalle_usuario_direcciones (pk_fk_id_usuario, pk_fk_id_direcciones)
-- VALUES 
-- (1, 1),
-- (2, 2);

-- -- Poblar la tabla Encargos
-- INSERT INTO Encargos (fk_id_vendedor, fk_id_carrito, descripcion, nombre_imagen)
-- VALUES 
-- (1, 1, 'Encargo de smartphone personalizado', 'encargo1.jpg');

-- -- Poblar la tabla Reviews
-- INSERT INTO Reviews (review, calificacion, fk_id_pagina, fk_id_cliente)
-- VALUES 
-- ('Excelente servicio', 5, 1, 1),
-- ('Buena calidad', 4, 2, 2);

-- -- Poblar la tabla comprasUsuarios
-- INSERT INTO comprasUsuarios (fk_id_cliente, fk_id_carrito)
-- VALUES 
-- (1, 1),
-- (2, 2);

-- -- Poblar la tabla ventaVendedores
-- INSERT INTO ventaVendedores (fk_id_vendedor, fk_id_cliente, fk_id_tamano, estado)
-- VALUES 
-- (1, 1, 1, false),
-- (2, 2, 2, false);
