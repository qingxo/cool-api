var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
const { expressjwt } = require('express-jwt');
const jwtMiddleware = require('./src/middleware/jwtCenter');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
const MAGIIC_WORDS = 'ABCDEF_KAKA_BBss——0098*&##@';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//[/^\/api.*/]
// app.use(jwtMiddleware.authJwt());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressjwt({ secret: MAGIIC_WORDS, algorithms: ["HS256"] }).unless({ path: [/^\/api\//, /^\/test\//] }))
app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
