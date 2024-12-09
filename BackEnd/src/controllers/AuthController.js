// controllers/AuthController.js
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/usuario"); // Asume que tienes un modelo de Usuario
const hash = require("../utils/hash");

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { correo: email } });
    if (!user) {
      return res.status(404).json({ message: "El correo no está registrado" });
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // Token válido por 1 hora
    await user.save();

    // Configurar envío de correo
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465, // Utiliza 587 si no estás usando SSL (secure: false)
      secure: true, // true para SSL, false para TLS
      auth: {
        user: "tu_correo@gmail.com",
        pass: "contraseña_de_aplicación", // Si usas verificación en dos pasos
      },
    });
    

    console.log(transporter);

    const mailOptions = {
      from: "segundacuentademark@gmail.com",
      to: user.correo,
      subject: "Recuperación de contraseña",
      text: `Utiliza el siguiente enlace para recuperar tu contraseña: http://localhost:8080/ResetPassword/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Correo enviado para recuperación de contraseña" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error en la solicitud de recuperación", error });
  }
};

// controllers/AuthController.js
exports.resetPassword = async (req, res) => {
  const { token } = req.body;
  const usuarioData = JSON.parse(req.body);

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: Date.now() }, // Verifica si el token aún es válido
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }
    const hashedPassword = await hash.hashPassword(usuarioData.contrasena);
    usuarioData.contrasena = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar contraseña", error });
  }
};
