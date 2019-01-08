var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  res.render('login')
});

router.post('/', function(req, res, next) {
  db.func('find_id_human', [req.body.surname, req.body.post])
    .then(data => {
      console.log('DATA:', data); // print data;
      if(data[0].id == 0){
        res.json({
          msg: 'false'
        });
      }else {
        let user = {
          id: data[0].id,
          surname: data[0].surname,
          name: data[0].name,
          post: req.body.post,
        }
        req.session.user = user;
        res.redirect('/')
      }
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
      res.json({
        msg: 'false'
      });
    });
});


module.exports = router;
