var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});

module.exports = router;
