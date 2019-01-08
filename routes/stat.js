var express = require('express');
var router = express.Router();
var db = require('../db');
var helpi = require('../helpi')

/* GET customers listing. */
router.get('/',  helpi.checkSignIn, function(req, res, next) {
  res.render('stat', { title: 'Статистика', data: 1, user: req.session.user});
});


module.exports = router;
