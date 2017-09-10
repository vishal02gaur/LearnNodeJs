var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var models = require('./models');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());


app.use('/', index);
app.use('/users', users);


/*

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

*/

module.exports = app;

