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
    device.on("login_request",function (data) {
        device.login_authorized(true,data);
    });
});