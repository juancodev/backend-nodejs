const express = require('express');
const config = require("../config");
const router = require("./router");

const app = express();

app.use(express.json());

// rutas
app.use('/', router)


app.listen(config.cacheServices.port, () => {
  console.log(`servicio de cache escuchando en el puerto`, config.cacheServices.port);
})