const express =  require('express');
const Sequelize = require('sequelize');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//settings
app.use(cors());// Permite las solicitudes
app.set('port', 3000);
const sequelize = new Sequelize('gremio','root','12345',{
    host:'localhost',
    dialect:'mysql',
    
})


sequelize.authenticate()
    .then(()=>{
        console.log('Conexión a la base de datos OK')
    })
    .catch( error => {
        console.log('Error en la conexión: '+ error)
    })

//middlewears
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
// //Postes Ocupados
// app.use(require('./routes/PostesOcupados'));
// //Cultivos
// app.use(require('./routes/Cultivos'));
// //RegistroGerminacion
// app.use(require('./routes/RegistroGerminacion'));
// //Actualización de area
// app.use(require('./routes/ActualizacionDeArea'));
// //Actualiza el estado de la mudanza
// app.use(require('./routes/Mudanzas'));
// //Variedades GET
// app.use(require('./routes/Variedad'));

//Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

