const express = require('express');
const swaggerUI = require('swagger-ui-express');
const config = require('../config.js');
const user = require('./components/user/router.js');
const auth = require('./components/auth/router.js');
const app = express();

const swaggerDoc = require('./swagger.json');

const errors = require('../network/errors.js');

//Router
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Manage Error

app.use(errors);

app.listen(config.api.port, () => {
  console.log('API running in the port ', config.api.port);
})