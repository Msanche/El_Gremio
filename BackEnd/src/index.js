// index.js
const express =  require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
const path = require('path');


// Importa la instancia de Sequelize desde database.js
const  sequelize  = require('./database/database');
const router = require('./routes/routes');

// settings
app.use(cors());
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(router); // Asegúrate de que este "use" está correctamente configurado


module.exports = {
    sequelize,
};

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

// Carga los certificados con rutas absolutas
const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificates', 'clave-privada.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates', 'certificado-autofirmado.crt')),
};

// Crea el servidor HTTPS
https.createServer(options, app).listen(443, () => {
    console.log('Servidor HTTPS corriendo en el puerto 443');
});