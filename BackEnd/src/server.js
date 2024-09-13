const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

// Carga los certificados
const options = {
    key: fs.readFileSync('/certificates/clave-privada.key'),
    cert: fs.readFileSync('/certificates/certificado-autofirmado.crt'),
};

// Crea el servidor HTTPS
https.createServer(options, app).listen(443, () => {
    console.log('Servidor HTTPS corriendo en el puerto 443');
});

// Configura tus rutas
app.get('/', (req, res) => {
    res.send('Servidor seguro con HTTPS');
});
