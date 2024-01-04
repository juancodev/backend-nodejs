const express = require('express');
const config = require('../config.js');
const post = require('./components/post/router.js');

const app = express();

const errors = require('../network/errors.js');

//Router
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/post', post);

// Manage Error

app.use(errors);

app.listen(config.post.port, () => {
  console.log('micro-services port running in the port ', config.post.port);
})