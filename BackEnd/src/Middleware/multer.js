const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Asegúrate de que la carpeta 'uploads' exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nombra el archivo de manera única
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
