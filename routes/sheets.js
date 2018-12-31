var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET customers listing. */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM product')
      .then(function (data) {
        console.log(data)
        res.render('Products', { title: 'Товары', data: data});
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

router.get('/:id/edit', function(req, res, next) {
    db.one('SELECT * FROM customer WHERE "id_customer"=' + req.params.id)
        .then(function (data) {
            console.log(data)
            res.render('customers_edit', { title: 'Редактирование - ' + data.surname + ' ' + data.name, data: data});
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
});

router.get('/:id', function(req, res, next) {
    db.one('SELECT * FROM customer WHERE "id_customer"=' + req.params.id)
        .then(function (data) {
            console.log(data)
            res.render('customers_view', { title: 'Просмотр - ' + data.surname + ' ' + data.name, data: data});
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
});

router.post('/:id', function(req, res, next) {
    db.one('UPDATE customer SET "surname"=\''+req.body.surname+ '\', "name"=\''+req.body.name+'\', "phone_number"=\''+req.body.phone_number+'\' WHERE "id_customer"=' + req.params.id)
    res.redirect('/customers');
});


module.exports = router;
