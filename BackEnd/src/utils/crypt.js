const crypto = require('crypto');

// Clave secreta (almacenada de forma segura)
const secretKey = process.env.SECRET_KEY; 

// Encriptar datos
const encryptData = (data) => {
  const iv = crypto.randomBytes(16); // vector de inicialización
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Desencriptar datos
const decryptData = (encryptedData) => {
  const textParts = encryptedData.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

module.exports = { encryptData, decryptData };