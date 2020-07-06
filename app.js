const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require("express-session")
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engine = require("ejs-locals")
const mongoose = require("mongoose")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('req-flash');

mongoose.connect("mongodb://egitim:q1w2e3@ds157833.mlab.com:57833/egitim")

/*mongoose.connect("mongodb://localhost:27017/diniakademi",(err,data)=>{
  if (!err){
    console.log("Başarılı")
  }
})*/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine("ejs",engine)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
