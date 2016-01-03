var gps = require("gpslibgt06n");

var options = {
    'debug'                 : true,
    'port'                  : 8080,
    'device_adapter'        : "GT06"
}

var server = gps.server(options,function(device,connection){
	connection.on("data",function(res){
        console.log(res);
    });
    device.on("login_request",function (uid,data) {
    	console.log(uid,data);
        device.login_authorized(true,data);
    });
    device.on("ping",function (data) {
        console.log("data from:"+ connection.device.uid);
        console.log(data);
    });
    device.on("alarm",function (data,alarmData,fullData) {
        console.log(data);
        console.log(alarmData);
        console.log(fullData);
    });
    device.on("status",function (data,fullData) {
        console.log("data from:"+ connection.device.uid);
        console.log(data);
        console.log(fullData);
    });


});