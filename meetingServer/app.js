var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var adminsRouter = require('./routes/admins');
var usersRouter = require('./routes/users');
var meetingRouter = require('./routes/meeting');
var reserveRouter = require('./routes/reserve');
var roomsRouter = require('./routes/rooms');
var timerRouter = require('./routes/timer');
var toExcelRouter = require('./routes/exportExcel');

var app = express();
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081"); //允许源访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admins', adminsRouter);
app.use('/users', usersRouter);
app.use('/meetings', meetingRouter);
app.use('/reserve', reserveRouter);
app.use('/rooms', roomsRouter);
app.use('/timer', timerRouter);
app.use('/exportExcel', toExcelRouter);
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