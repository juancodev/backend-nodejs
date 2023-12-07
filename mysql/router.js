const express = require('express');
const response = require('../network/response');
const Store = require('../store/mysql');
const router = express.Router();


router.get('/:table', async (req, res) => {
  const data = await Store.list(req.params.table);
  response.success(req, res, data, 200);
});
router.get('/:table/:id', async (req, res) => {
  const data = await Store.get(req.params.table, req.params.id);
  response.success(req, res, data, 200);
});
router.post('/:table', async (req, res) => {
  const data = await Store.insert(req.params.table, req.body);
  response.success(req, res, data, 201);
});
router.put('/:table', async (req, res) => {
  const data = await Store.upsert(req.params.table, req.body);
  response.success(req, res, data, 200);
});

module.exports = router;