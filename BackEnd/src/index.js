// index.js
const express =  require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// Importa la instancia de Sequelize desde database.js
const  sequelize  = require('./database/database');

// settings
app.use(cors());
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(require('./routes/routes'));

// Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
