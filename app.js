var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const MAGIIC_WORDS = 'ABCDEF_KAKA_BBss——0098*&##@';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(expressjwt({ secret: MAGIIC_WORDS, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/login', (req, res) => {
  let token = jwt.sign({ username: 'admin' }, MAGIIC_WORDS, { expiresIn: 60 });
  res.send(`登录成功:${token}`);
});

app.post('/admin', (req, res) => {
  console.log(req.auth);
  res.send(`当前用户是:${req.auth.username}`);
})

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
