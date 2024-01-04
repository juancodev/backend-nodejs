const express = require('express');
const router = express.Router();
const controller = require('./index');
const response = require('../../../network/response');

router.get('/', (req, res) => {
  controller.list()
    .then((list) => response.success(req, res, list, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));

});

module.exports = router;