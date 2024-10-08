// index.js
const express =  require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

// Importa la instancia de Sequelize desde database.js
const  sequelize  = require('./database/database');

// settings
app.use(cors());
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// tablas


// const { initModels } = require('./routes/tablas');
// const models = initModels(sequelize);


module.exports = {
    sequelize,
    Sequelize,
    // models
};

// // routes
// app.use(require('./routes/PostesOcupados'));


// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

// Carga los certificados
const options = {
    key: fs.readFileSync('/certificates/clave-privada.key'),
    cert: fs.readFileSync('/certificates/certificado-autofirmado.crt'),
};

// Crea el servidor HTTPS
https.createServer(options, app).listen(443, () => {
    console.log('Servidor HTTPS corriendo en el puerto 443');
});