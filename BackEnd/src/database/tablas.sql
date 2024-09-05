create database gremio;
drop database gremio;
use  gremio;

create table usuario (
pk_id_usuario int primary key auto_increment,
correo varchar(100) not null,
nombre varchar(100) not null,
apellido varchar(100) not null,
numeroCelular varchar(10) not null,
contrasena varchar(255) not null
);

create table categorias(
id_categoria int primary key auto_increment,
categoria varchar(30) not null
);

create table usuario_cliente(
pk_id_cliente int primary key auto_increment,
fk_id_usuario int null,
foreign key (fk_id_usuario) references usuario (pk_id_usuario)
);

create table usuario_vendedor (
pk_id_vendedor int primary key auto_increment,
fk_id_usuario int not null,
nombre_marca varchar(100) not null,
foreign key (fk_id_usuario) references usuario (pk_id_usuario)
);

create table productos (
id_producto int primary key auto_increment,
nombre varchar(100) NOT NULL,
stock int not null,
nombre_imagen varchar(255) not null,
fk_id_vendedor int not null,
fk_id_categorias int not null,
foreign key (fk_id_categorias) references categorias (id_categoria),
foreign key (fk_id_vendedor) references usuario_vendedor(pk_id_vendedor));

create table tamaño (
pk_id_tamaño int primary key auto_increment,
fk_id_producto int not null,
nombre_size varchar(255) not null,
precio float not null,

foreign key (fk_id_producto) references productos(id_producto)
);

create table carrito (
pk_id_carrito int primary key auto_increment,
fk_id_cliente int not null,
total float not null
);

create table detalle_carrito_producto (
pk_fk_id_carrito int not null,
pk_fk_id_tamaño int not null,
cantidad_productos int not null,
primary key(pk_fk_id_carrito,pk_fk_id_tamaño)
);

create table direcciones (
id_direcciones int primary key auto_increment,
direccion varchar(150) not null
);

create table detalle_usuario_direcciones(
pk_fk_id_usuario int not null ,
pk_fk_id_direcciones int not null,
primary key(pk_fk_id_usuario,pk_fk_id_direcciones)
);

create table encargo(
pk_id_encargo int primary key auto_increment,
fk_id_vendedor int not null,
fk_id_carrito int not null,
descripcion varchar(255) ,

foreign key (fk_id_vendedor) references usuario_vendedor(pk_id_vendedor),
foreign key (fk_id_carrito) references carrito(pk_id_carrito)
);

create table pagina_vendedor (
pk_id_pagina int primary key auto_increment,
foto_perfil varchar(255) not null,
color_primario varchar(10) not null
);

create table review (
pk_id_review int primary key auto_increment,
review  varchar(255) not null ,
calificacion tinyint not null,
fk_id_pagina int not null,
fk_id_cliente int not null,

foreign key (fk_id_pagina) references pagina_vendedor (pk_id_pagina),
foreign key (fk_id_cliente) references usuario_cliente (pk_id_cliente)
);
