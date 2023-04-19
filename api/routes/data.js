var express = require('express');
var router = express.Router();
var mock = require('../data/mock.json');

router.get('/', function (req, res, next) {
  res.status(200).json(mock);
});

module.exports = router;
