const express = require('express');
const swaggerUI = require('swagger-ui-express');
const config = require('../config.js');
const user = require('./components/user/router.js');
const app = express();

const swaggerDoc = require('./swagger.json');

//Router
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/user', user);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log('API running in the port ', config.api.port);
})