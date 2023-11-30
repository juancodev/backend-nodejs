const express = require('express');
const router = express.Router();
const secure = require('./secure');
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

router.get('/:id/following', (req, res, next) => {
  controller.following(req.params.id)
    .then((data) => response.success(req, res, data, 200))
    .catch(next);
})

router.post('/follow/:id', secure('follow'), (req, res, next) => {
  controller.follow(req.user.id, req.params.id)
    .then((data) => response.success(req, res, data, 201))
    .catch(next);
})

router.post('/', (req, res) => {
  controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
});

router.put('/', secure('update'), (req, res) => {
  controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((error) => response.error(req, res, 'Internal Error', 500, error));
})

module.exports = router;