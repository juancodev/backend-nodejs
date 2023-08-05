const express = require('express');
const router = express.Router();
const controller = require('./index');
const response = require('../../../network/response');

router.get('/', (req, res) => {
  controller.list()
    .then((list) => response.success(req, res, list, 200))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));

});

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.post('/', (req, res) => {
  controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
})

module.exports = router;