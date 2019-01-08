var express = require('express');
var router = express.Router();
var helpi = require('../helpi')
var db = require('../db');

/* GET home page. */
router.get('/', helpi.checkSignIn, function(req, res, next) {
  if(req.session.user.post == 'customer'){
    db.one('SELECT * FROM customer WHERE "id_customer"=' + req.session.user.id)
      .then(function (data) {
        db.func('customer_repair_sheet', [req.session.user.id])
          .then(table => {
            let new_table = table.map((val, index) => {
              return val
            })
            console.log(req.session.user)
            res.render('index_customer', { title: 'Просмотр - ' + data.surname + ' ' + data.name, data: data, table: new_table,  user: req.session.user});

          })
          .catch(error => {
            console.log('ERROR:', error); // print the error;
          });
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  }
  else {
    res.render('index', {title: 'Express', user: req.session.user});
  }
});

module.exports = router;
