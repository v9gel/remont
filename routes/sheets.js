var express = require('express');
var router = express.Router();
var db = require('../db');
var helpi = require('../helpi')

/* GET customers listing. */
router.get('/',  helpi.checkSignIn, function(req, res, next) {
  db.func('all_repair_sheet')
    .then(data => {
      let new_data = data.map((val, index) => {
        val.date_create = val.date_create.toString().slice(0, 15)
        return val
      })
      console.log(new_data)
      res.render('sheets', { title: 'Ремонтные листы', data: new_data, user: req.session.user});
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
    });
});

router.get('/:id',  helpi.checkSignIn, function(req, res, next) {
    db.func('one_repair_sheet', [req.params.id])
      .then(table => {
        let new_data = table.map((val, index) => {
          val.date_create = val.date_create.toString().slice(0, 15)
          return val
        })
        console.log(new_data)
        res.render('sheets_view', { title: 'Просмотр - ' + new_data[0].name_product, data: new_data[0], user: req.session.user});
      })
      .catch(error => {
        console.log('ERROR:', error); // print the error;
      });
});

router.post('/:id', function(req, res, next) {
    db.one('UPDATE customer SET "surname"=\''+req.body.surname+ '\', "name"=\''+req.body.name+'\', "phone_number"=\''+req.body.phone_number+'\' WHERE "id_customer"=' + req.params.id)
    res.redirect('/customers');
});

router.delete('/:id', function(req, res, next) {
  db.one('DELETE FROM repair_sheet WHERE "id_repair_sheet"=' + req.params.id)
});


module.exports = router;
