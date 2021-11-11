var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehicleRouter = require('./routes/vehicle');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var Vehicle = require("./models/vehicle"); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicle', vehicleRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);


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
const connectionString = process.env.MONGO_CON

mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

async function recreateDB(){
  // Delete everything
  await Vehicle.deleteMany(); 
 
  var results = [{"Brand":"lincoln","price":'10',"size":'large'},
                 {"Brand":"tesla","price":'7',"size":'small'},
                 {"Brand":"audi", "price":'15',"size":'large'}]
 
 for(i in results){
  let instance = new Vehicle({Brand: results[i]["Brand"], price: results[i]["price"], size:results[i]["size"]});
   instance.save( function(err,doc) {
     if(err) return console.error(err);
     console.log("object added.")
     });
 } 
 } 
 let reseed = true;
 if (reseed) { recreateDB();} 
module.exports = app;
