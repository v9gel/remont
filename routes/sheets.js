var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET customers listing. */
router.get('/', function(req, res, next) {
  db.func('all_repair_sheet')
    .then(data => {
      let new_data = data.map((val, index) => {
        val.date_create = val.date_create.toString().slice(0, 15)
        return val
      })
      console.log(new_data)
      res.render('sheets', { title: 'Ремонтные листы', data: new_data});
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
    db.func('one_repair_sheet', [req.params.id])
      .then(table => {
        let new_data = table.map((val, index) => {
          val.date_create = val.date_create.toString().slice(0, 15)
          return val
        })
        console.log(new_data)
        res.render('sheets_view', { title: 'Просмотр - ' + new_data[0].name_product, data: new_data[0]});
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
