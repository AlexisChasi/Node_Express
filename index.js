const express = require('express')
const app = express()

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido al servidor Express</h1>');
});

// Ruta de información del usuario
app.get('/usuario', (req, res) => {
    const usuario = {
        nombre: "Alexis Chasi",
        correo: "alexis.chasi@epn.edu.ec",
        edad: 28,
        pais: "Ecuador",
        isAdmin: true
    };
    res.json(usuario);
});

app.listen(3000)
console.log("Servidor corriendo, OK!!");
