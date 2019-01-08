var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Эта отвечает за авторизацию
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
//

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var statRouter = require('./routes/stat');
var logoutRouter = require('./routes/logout');
var customersRouter = require('./routes/customers');
var productsRouter = require('./routes/products');
var sheetsRouter = require('./routes/sheets');
var usersRouter = require('./routes/users');

var app = express();

//И это
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));
//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/stat', statRouter);
app.use('/logout', logoutRouter);
app.use('/customers', customersRouter);
app.use('/products', productsRouter);
app.use('/sheets', sheetsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
