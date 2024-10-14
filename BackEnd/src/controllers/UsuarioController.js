const Usuario = require('../models/usuario');
const UsuarioVendedor = require('../models/usuario_vendedor')
const UsuarioCliente = require('../models/usuario_cliente')
const hash = require('../utils/hash');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

//Corroborar que se este obteniendo datos de .env
if (!process.env.SECRET_KEY) {
  console.error('SECRET_KEY no está definida en el archivo .env');
  process.exit(1); // Detener la aplicación si falta la clave secreta
}

const secretKey = process.env.SECRET_KEY;

// Controlador para manejar el login de usuarios
exports.login = async (req, res) => {
  const { correo, contrasena } = req.body.login;

  // Validar que el email y la contraseña sean proporcionados
  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
  }
  const normalizedEmail = correo;
  try {
    let role
    // Buscar el usuario por email normalizado
    const usuario = await Usuario.findOne({ where: { correo: normalizedEmail } });

    const usuarioV = await UsuarioVendedor.findOne({ where: { fk_id_usuario: usuario.dataValues.pk_id_usuario } });
    if (usuarioV) {
      console.log("user v",usuarioV)
      role = "Vendedor"
    }
    const usuarioC = await UsuarioCliente.findOne({ where: { fk_id_usuario: usuario.dataValues.pk_id_usuario } });
    if (usuarioC) {
      console.log("user c",usuarioC.dataValues.pk_id_usuario)
      role = "Cliente"

    }

    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña (pswd) con bcrypt

    const isMatch = await hash.verifyPassword(contrasena,usuario.dataValues.contrasena );
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT con una expiración de 2 horas
    const token = jwt.sign(
      { idUsuario: usuario.pk_id_usuario, nombre: usuario.nombre, apellido: usuario.apellido },
       secretKey,
        { expiresIn: '2h' });
    
    // Devolver el token en la respuesta
    res.status(200).json({ message: 'Autenticación exitosa', token,
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      role:role
     });
  } catch (err) {
    // Manejo de errores más específico
    console.error('Error en el proceso de login:', err);
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
};



// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.update(req.body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
