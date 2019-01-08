var express = require('express');
var router = express.Router();
var db = require('../db');
var helpi = require('../helpi')

/* GET customers listing. */
router.get('/',  helpi.checkSignIn, function(req, res, next) {
  db.func('all_product')
    .then(data => {
      console.log(data)
      db.any('SELECT * FROM manufacturer')
        .then(function (data1) {
          db.any('SELECT * FROM customer')
            .then(function (data2) {
              db.any('SELECT * FROM status')
                .then(function (data3) {
                  db.any('SELECT * FROM location')
                    .then(function (data4) {
                      let select = {
                        manufacturer: data1,
                        customer: data2,
                        status: data3,
                        location: data4
                      }
                      res.render('products', { title: 'Товары', data: data, user: req.session.user, select: select});
                    })
                })
            })
        })
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  db.none('INSERT INTO product (id_location, id_product, name, factory_namber, date_begin_garant, date_end_garant, id_manufacturer, id_customer, id_status) VALUES(1, DEFAULT, ${name}, ${factory_namber}, ${date_begin_garant}, ${date_end_garant}, ${id_manufacturer}, ${id_customer}, 1)', req.body)
  console.log(req.query)
  res.json({
    msg: 'true'
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
            val.date_create = val.date_create
            val.date_begin_repair = val.date_begin_repair
            val.date_end_repair = val.date_end_repair
            val.date_expertise = val.date_expertise
            return val
          })
          console.log(new_table)
          res.render('products_view', { title: 'Просмотр - ' + data[0].name_product, data: data[0], table: new_table, user: req.session.user});
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
  console.log(req.body)
    db.one('UPDATE product SET "name"=${name} WHERE "id_product"=' + req.params.id, req.body)
});

router.delete('/:id', function(req, res, next) {
  db.one('DELETE FROM product WHERE "id_product"=' + req.params.id)
});

module.exports = router;
