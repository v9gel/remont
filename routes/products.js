var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET customers listing. */
router.get('/', function(req, res, next) {
  db.func('all_product')
    .then(data => {
      /*
      let new_data = data.map((val, index) => {
        val.date_begin_repiar = val.date_begin_repiar.toString().slice(4,15)
        val.date_end_repair = val.date_end_repair.toString().slice(4, 15)
        val.date_expertise = val.date_expertise.toString().slice(4, 15)
        return val
      })
      console.log(new_data)
      */
      res.render('products', { title: 'Товары', data: data});
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
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
  db.func('one_product', [req.params.id])
    .then(data => {
      console.log(data)
      data[0].date_begin_garant = data[0].date_begin_garant.toString().slice(0, 15)
      data[0].date_end_garant = data[0].date_end_garant.toString().slice(0, 15)
      db.func('product_repair_sheet', [req.params.id])
        .then(table => {
          let new_table = table.map((val, index) => {
            val.date_create = val.date_create.toString().slice(0, 15)
            val.date_begin_repair = val.date_begin_repair.toString().slice(0, 15)
            val.date_end_repair = val.date_end_repair.toString().slice(0, 15)
            val.date_expertise = val.date_expertise.toString().slice(0, 15)
            return val
          })
          console.log(new_table)
          res.render('products_view', { title: 'Просмотр - ' + data[0].name_product, data: data[0], table: new_table});
        })
        .catch(error => {
          console.log('ERROR:', error); // print the error;
        });
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
    });
});

router.post('/:id', function(req, res, next) {
    db.one('UPDATE customer SET "surname"=\''+req.body.surname+ '\', "name"=\''+req.body.name+'\', "phone_number"=\''+req.body.phone_number+'\' WHERE "id_customer"=' + req.params.id)
    res.redirect('/customers');
});


module.exports = router;
