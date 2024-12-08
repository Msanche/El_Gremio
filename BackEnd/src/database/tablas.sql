drop database gremio;
create database gremio;
use  gremio;

CREATE TABLE Usuarios (
  pk_id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(100) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  numeroCelular VARCHAR(10) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  resetToken VARCHAR(255) NULL,
  resetTokenExpires DATETIME NULL,
  CONSTRAINT UC_Usuario UNIQUE (correo, numeroCelular)
);

create table Categorias(
id_categoria int primary key auto_increment,
categoria varchar(30) not null,
UNIQUE(categoria)
);

create table Usuario_clientes(
pk_id_cliente int primary key auto_increment,
fk_id_usuario int not null,
foreign key (fk_id_usuario) references Usuarios (pk_id_usuario)
);

create table Pagina_vendedores (
pk_id_pagina int primary key auto_increment,
foto_perfil varchar(255) not null,
color_primario varchar(10) not null
);

create table Usuario_vendedores (
pk_id_vendedor int primary key auto_increment,
fk_id_usuario int not null,
nombre_marca varchar(100) not null,
fk_pagina_vendedor int not null,
foreign key(fk_pagina_vendedor) references Pagina_vendedores(pk_id_pagina),
foreign key (fk_id_usuario) references Usuarios (pk_id_usuario),
UNIQUE(nombre_marca)
);

create table Productos (
id_producto int primary key auto_increment,
nombre varchar(100) NOT NULL,
stock int not null,
nombre_imagen varchar(255) not null,
descripcion VARCHAR(255) not null,
fk_id_vendedor int not null,
fk_id_categorias int not null,
foreign key (fk_id_categorias) references Categorias (id_categoria),
foreign key (fk_id_vendedor) references Usuario_vendedores(pk_id_vendedor)

);

create table tamanos (
pk_id_tamano int primary key auto_increment,
fk_id_producto int not null,
nombre_size varchar(255) not null,
precio float not null,

foreign key (fk_id_producto) references Productos(id_producto)
);

create table Carritos (
pk_id_carrito int primary key auto_increment,
fk_id_cliente int not null,
total float not null
);
alter table Carritos add column estado boolean default true; -- True: carrito vigente. False: carrito ya pagado

create table Detalle_carrito_productos (
pk_fk_id_carrito int not null,
pk_fk_id_tamaño int not null,
cantidad_productos int not null,
primary key(pk_fk_id_carrito,pk_fk_id_tamaño)
);

create table Direcciones (
id_direcciones int primary key auto_increment,
direccion varchar(150) not null
);

create table Detalle_usuario_direcciones(
pk_fk_id_usuario int not null ,
pk_fk_id_direcciones int not null,
primary key(pk_fk_id_usuario,pk_fk_id_direcciones)
);

create table Encargos(
pk_id_encargo int primary key auto_increment,
fk_id_vendedor int not null,
fk_id_carrito int not null,
descripcion varchar(255) ,
nombre_imagen varchar(255), -- Para poder almacenar el nombre de referencia
-- precio float (se agregaría para que cuando se acepte el encargo el vendedor establezca el precio. Discutir como implementarlo para el carrito)

foreign key (fk_id_vendedor) references Usuario_vendedores(pk_id_vendedor),
foreign key (fk_id_carrito) references Carritos(pk_id_carrito)
);



create table Reviews (
pk_id_review int primary key auto_increment,
review  varchar(255) not null ,
calificacion tinyint not null,
fk_id_pagina int not null,
fk_id_cliente int not null,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null, -- Para poder conocer cuando es que se realizó la review

foreign key (fk_id_pagina) references Pagina_vendedores (pk_id_pagina),
foreign key (fk_id_cliente) references Usuario_clientes (pk_id_cliente)
);

-- Historial compras y ventas
create table comprasUsuarios(
	pk_id_compra int primary key auto_increment,
  fk_id_cliente int not null,
  fk_id_carrito int not null,
    
  foreign key (fk_id_cliente) references Usuario_clientes (pk_id_cliente),
	foreign key (fk_id_carrito) references Carritos (pk_id_carrito)
);

create table ventaVendedores(
	pk_id_venta int primary key auto_increment,
  fk_id_vendedor int not null,
  fk_id_cliente int not null,
  fk_id_tamano int not null,
  estado boolean default false, -- mientras de que el valor este como false, significa que la venta no se ha concretado o terminado
    
  foreign key (fk_id_vendedor) references Usuario_vendedores(pk_id_vendedor),
	foreign key (fk_id_cliente) references Usuario_clientes (pk_id_cliente),
  foreign key (fk_id_tamano) references tamanos (pk_id_tamano)
);
