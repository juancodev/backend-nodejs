const express = require('express');
const config = require("../config");
const router = require("./router");

const app = express();

app.use(express.json());

// rutas
app.use('/', router)


app.listen(config.mysqlServices.port, () => {
  console.log(`servicio de mysql escuchando en el puerto`, config.mysqlServices.port);
})