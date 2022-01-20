const express = require('express');
const PORT = 8080;

const Contenedor = require('./Contenedor');
const objContenedor = new Contenedor();

const app = express();

app.get('/productos', async (req, res) => {
    let list = await objContenedor.getAll();
    res.json(list);
});

app.get('/productosRandom', async(req, res) => {
    let list = await objContenedor.getRandom();
    res.json(list);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));
