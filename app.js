var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');
//middleware
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//db
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');


var query = require('./api/query');
//GpsmodelData
var gpsModel = require('./models/gpsdata');


//code starts
//database
var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};
var dbConfig = require('./config/database.js')
var mongodbUri = dbConfig.url;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options, function(argument) {
    console.log(mongoose.connection.readyState);
});
var conn = mongoose.connection;

conn.on('open', function(ref) {
    console.log('Connected to mongo server on '+moment().format('MMMM Do YYYY,hh:mm:ss a'));
});
conn.on('error', function(err) {
    console.log('Could not connect to mongo server on' + moment().format('MMMM Do YYYY,hh:mm:ss a'));
    console.log(err);
});

conn.once('open', function() {
    require('./gpsFun.js');
});

//used middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//routing
var routes = require('./routes/route.js');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });
}
