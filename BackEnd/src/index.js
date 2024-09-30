// index.js
const express =  require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Importa la instancia de Sequelize desde database.js
const  sequelize  = require('./database/database');
console.log("en index",sequelize)

// settings
app.use(cors());
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(require('./routes/routes'));

// Conexión a la base de datos y autenticación
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos OK'))
    .catch(error => console.log('Error en la conexión: ', error));

// Sincronización de modelos
sequelize.sync()
    .then(() => console.log('Sincronización de la base de datos completa'))
    .catch(error => console.error('Error al sincronizar la base de datos:', error));

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
