//addded etra omment to push
var express = require('express');
var app = express();
//middleware
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//db
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');


var query = require('./api/query');
//for testing
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
    console.log('Connected to mongo server.');
    var time = Date.now();
    var startTime = Date.now();
    var endTime = Date.now();
    var gps = "123";
    var gpsArray = ["123", "124"];
/*

    //testing type -1
    var data1={ start: '7878',
  packetLength: '0a',
  protocolNumber: '13',
  finish: '0d0a',
  action: 'status',
  infoContent: '0406040002',
  infoSrNum: '0001',
  errorCheck: '7ad2' };

   var gpsinfo = new gpsModel({
            "action":"login",
            "gpsId": data1.infoContent
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('login saved successfully!');
        });
*/
//type-2

var uid2 ="1234";
var ping1 = { start: '7878',
  packetLength: '1f',
  protocolNumber: '12',
  finish: '0d0a',
  action: 'ping',
  infoContent: '10011811032ec8020d8a9407d2b3e004546b0194146d650026b7',
  infoSrNum: '0008',
  errorCheck: '48e6' };
  var ping2 = {"date":{"year":"2016","month":1,"day":24,"hour":17,"minute":3,"second":46},
  "GpsSatNum":8,
  "latitude":"19.1344",
  "longitude":"0.0011",
  "speed":4,
  "course":{"gpsInfo":"differentialGps","gpsPos":false,"gpsLong":"west","gpsLat":"south","gpsCourse":"619"},
  "Mcc":404,"Mnc":20,"Lac":28005,"CellTowerId":9911,"inserted":"2016-01-25T05:44:08.460Z"};

  var gpsinfo = new gpsModel({
            "action":"ping",
            "gpsId": uid2,
            "timeStamp":new Date(ping2.date.year, ping2.date.month, ping2.date.day, ping2.date.hour, ping2.date.minute,ping2.date.second),
            "location":[ping2.latitude,ping2.longitude],
            "speed":ping2.speed,
            "course":ping2.course,
            "Others":{"GpsSatNum":ping2.GpsSatNum,"Mcc":ping2.Mcc,"Mnc":ping2.Mnc,"Lac":ping2.Lac,"CellTowerId":ping2.CellTowerId,"inserted":ping2.inserted}

        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('ping saved successfully!');
        });



//type-3
//type status
var uid3 ="1234";
var statusdata = {"termInfoContent":{},"voltLevel":"veryHigh","gsmSignal":"strong","alarmLang":{"alarmType":"normal","language":"english"}};

var gpsinfo = new gpsModel({
            "action":"status",
            "gpsId": uid3,
            "termInfo":statusdata
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('status saved successfully!');
        });

//type-4
//type alarm
var uid4 ="123";

var alarm2={"date":{"year":"2013","month":1,"day":7,"hour":15,"minute":32,"second":41},"GpsSatNum":6,"latitude":"39.9071","longitude":"0.0018","speed":0,"course":{"gpsInfo":"differentialGps","gpsPos":false,"gpsLong":"east","gpsLat":"south","gpsCourse":"534"},"LbsDataLength":"09","Mcc":404,"Mnc":20,"Lac":28005,"CellTowerId":6532,"alarmData":{"termInfoContent":{},"voltLevel":"veryHigh","gsmSignal":"strong","alarmLang":{"alarmType":"powerCut","language":"english"}}};
var alarm1= {"termInfoContent":{},"voltLevel":"veryHigh","gsmSignal":"strong","alarmLang":{"alarmType":"powerCut","language":"english"}};



var gpsinfo = new gpsModel({
            "action":"alarm",
            "gpsId": uid4,
            "timeStamp":new Date(alarm2.date.year, alarm2.date.month, alarm2.date.day, alarm2.date.hour, alarm2.date.minute,alarm2.date.second),
            "location":[alarm2.latitude,alarm2.longitude],
            "speed":alarm2.speed,
            "Others":{"GpsSatNum":alarm2.GpsSatNum,"Mcc":alarm2.Mcc,"Mnc":alarm2.Mnc,"Lac":alarm2.Lac,"CellTowerId":alarm2.CellTowerId},
            "course":alarm2.course,
            "termInfo":alarm1,
            "alarmData":alarm2.alarmData
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('alarm saved successfully!');
        });

    // query.getDataAtTimeForOneGps(gps,time);
    // query.getDataAtTimeForMultipleGps(gpsArray,time);
    // query.getDataBWTimeForOneGps(gps,startTime,endTime);
    // query.getDataBWTimeForMultipleGps(gpsArray,startTime,endTime);


    //var time = Date.now();
    //var array = ["123","124"];
    //query.api2(time,array);

});
conn.on('error', function(err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});

conn.once('open', function() {
    require('./gpsFun.js');
    //require('./routes/api.js')(app);
    // var methods = require('../api/query.js')
    // app.get("/api/getDataAtTimeForOneGps/:gpsId/:time", function(req, res) {
    //     var result = methods.getDataAtTimeForOneGps(req.params.gpsId, req.params.time);
    //     send.json(result);
    // })
});

//used middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//routing
//var routes = require('./routes/index');
//app.use('/', routes);

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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

//module.exports = app;
