var express = require('express');
var router = express.Router();
var db = require('../db');
var helpi = require('../helpi')

router.get('/',  helpi.checkSignIn, function(req, res, next) {
  db.func('all_customer')
    .then(data => {
      res.render('customers', { title: 'Клиенты', data: data, user: req.session.user});
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  db.none('INSERT INTO customer (id_customer, surname, name, phone_number) VALUES(DEFAULT, ${surname}, ${name}, ${phone_number})', req.body)
  console.log(req.query)
  res.json({
    msg: 'true'
  });
});


router.get('/:id/edit',  helpi.checkSignIn, function(req, res, next) {
    db.one('SELECT * FROM customer WHERE "id_customer"=' + req.params.id)
        .then(function (data) {
            console.log(data)
            res.render('customers_edit', { title: 'Редактирование - ' + data.surname + ' ' + data.name, data: data,  user: req.session.user});
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
});

router.get('/:id', function(req, res, next) {
    db.one('SELECT * FROM customer WHERE "id_customer"=' + req.params.id)
        .then(function (data) {
          db.func('customer_repair_sheet', [req.params.id])
            .then(table => {
              let new_table = table.map((val, index) => {
                return val
              })
              console.log(req.session.user)
              res.render('customers_view', { title: 'Просмотр - ' + data.surname + ' ' + data.name, data: data, table: new_table,  user: req.session.user});

            })
            .catch(error => {
              console.log('ERROR:', error); // print the error;
            });
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
});

router.post('/:id', function(req, res, next) {
  db.one('UPDATE customer SET "surname"=\''+req.body.surname+ '\', "name"=\''+req.body.name+'\', "phone_number"=\''+req.body.phone_number+'\' WHERE "id_customer"=' + req.params.id)
  res.redirect('/customers');
});

router.delete('/:id', function(req, res, next) {
  db.one('DELETE FROM customer WHERE "id_customer"=' + req.params.id)
  res.redirect('/customers');
});


module.exports = router;
