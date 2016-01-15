var gps = require("gpslibgt06n");
var gpsModel = require('./models/gps');
var options = {
    'debug': true,
    'port': 8080,
    'device_adapter': "GT06"
}

var server = gps.server(options, function(device, connection) {
    connection.on("data", function(res) {});
    connection.on("end", function(data) {
        console.log("device left" + connection.device.uid + "from server");
    })
    device.on("login_request", function(uid, data) {
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
        console.log(uid, data + "from server");
        device.login_authorized(true, data);
    });
    device.on("ping", function(data) {
        var gpsinfo = new gpsModel({
            "gpsId": connection.device.uid,
            "location": [1.4, 2.2],
            "speed": 10.4
        });

        // call the built-in save method to save to the database
        gpsinfo.save(function(err) {
            if (err) throw err; //

            console.log('User saved successfully!');
        });
        console.log("data from:" + connection.device.uid + "from server");
        console.log(data + "from server");
    });
    device.on("alarm", function(data, alarmData, fullData) {
        console.log(data + "from server");
        console.log(alarmData + "from server");
        console.log(fullData + "from server");
    });
    device.on("status", function(data, fullData) {
        console.log("data from:" + connection.device.uid + "from server");
        console.log(data.termInfoContent, voltSignal, gsmSignal + "from server");
        console.log(fullData + "from server");
    });


});
