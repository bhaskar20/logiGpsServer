//comment to add to push a new branch only for gps Data Save purpose
var gps = require("gpslibgt06n");
var gpsModel = require('./models/gps');

var options = {
    'debug'                 : true,
    'port'                  : 8080,
    'device_adapter'        : "GT06"
}

var server = gps.server(options,function(device,connection){
    connection.on("data",function(res){
        console.log(JSON.stringify(res));
        console.log(res+ "printed res from server");
    });
    connection.on("end",function (data) {
        console.log("device left" + connection.device.uid+ "from server");
    })
    device.on("login_request",function (uid,data) {
        console.log(uid,data + " printing uid and then data from server");
console.log(JSON.stringify(uid));
console.log(JSON.stringify(data));
        var gpsinfo = new gpsModel({
            "gpsId": uid,
            "location": [1.4, 2.34243],
            "speed": 10.4
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('User saved successfully!');
        });
        console.log("testing login from server");

/*

    //testing type -1
    var data1=data;

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

        device.login_authorized(true,data);


    });
    device.on("ping",function (data) {
        var gpsinfo = new gpsModel({
            "gpsId": connection.device.uid,
            "location": [1.4, 2.243],
            "speed": 10.4
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('User saved successfully!');
        });





        /*
        var uid2 = connection.device.uid;
      var ping2 = data;

  var gpsinfo = new gpsModel({
            "action":"ping",
            "gpsId": uid2,
            "timeStamp":new Date(ping2.date.year, ping2.date.month, ping2.date.day, ping2.date.hour, ping2.date.minute,ping2.date.second),
            "location":[ping2.latitude,ping2.longitude],
            "speed":ping2.speed,
            "course":ping2.course,
            "Others":{"GpsSatNum":ping2.GpsSatNum,"Mcc":ping2.Mcc,"Mnc":ping2.Mnc,"Lac":ping2.Lac,"CellTowerId":ping2.CellTowerId,"inserted":ping2.inserted}

        });

        // call the built-
        */
        console.log( "from ping from server");

        console.log("data from:"+ connection.device.uid+ "from server");
        console.log(" printing data from server");
        console.log(JSON.stringify(data));
    });
    device.on("alarm",function (data,alarmData,fullData) {
        console.log(data + "printing from server");
        console.log(alarmData + "pringn from server");
        console.log(fullData + "prontong from server");
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(alarmData));
        console.log(JSON.stringify(fullData));

/*
       var uid4 =connection.device.uid;

var alarm2=data;
var alarm1= alarmData;

var gpsinfo = new gpsModel({
            "action":"alarm",
            "gpsId": uid4,
            "timeStamp":new Date(alarm2.date.year, alarm2.date.month, alarm2.date.day, alarm2.date.hour, alarm2.date.minute,alarm2.date.second),
            "location":[alarm2.latitude,alarm2.longitude],
            "speed":alarm2.speed,
            "Others":{"GpsSatNum":alarm2.GpsSatNum,"Mcc":alarm2.Mcc,"Mnc":alarm2.Mnc,"Lac":alarm2.Lac,"CellTowerId":alarm2.CellTowerId},
            "course":alarm2.course,
            "terminalInfo":alarm1,
            "alarmData":alarm2.alarmData
        });

*/
    });
    device.on("status",function (data,fullData) {
        console.log("data from:"+ connection.device.uid+ "from server");
        //console.log(data + "from server");
       // console.log(fullData+ "from server");


        console.log(data + "printing for status from server");
        console.log(fullData + "prontong for status from server");
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(fullData));

        /*
        var uid3 =connection.device.uid;
var statusdata = data;

var gpsinfo = new gpsModel({
            "action":"status",
            "gpsId": uid3,
            "terminalInfo":statusdata
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('status saved successfully!');
        });

*/

    });


});