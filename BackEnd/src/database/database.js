const { Sequelize } = require('sequelize');
require('dotenv').config();

// Llamado a datos en archivo .env
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
const dbPswd = process.env.DATABASE_PSWD;
// Configuración de la base de datos con Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPswd, {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos OK');
  })
  .catch(error => {
    console.error('Error en la conexión: ', error);
  });


// Sincronizar los modelos con la base de datos
/*
sequelize.sync({ force: false })
   .then(() => {
     console.log('Sincronización de la base de datos completa');
   })
   .catch(error => {
     console.error('Error al sincronizar la base de datos:', error);
   });

*/
// Exportar conexión y modelos para usarlos en otras partes de la aplicación
module.exports = 
  sequelize// Asegúrate de exportar `sequelize` aquí
;
