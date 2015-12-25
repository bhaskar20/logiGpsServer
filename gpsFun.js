var gps = require("gps-tracking");

var options = {
    'debug'                 : true,
    'port'                  : 8090,
    'device_adapter'        : "TK103"
}

var server = gps.server(options,function(device,connection){
	connection.on("data",function(res){
        console.log(res);
    });
    console.log(device.uid);
    console.log(device.name);
    console.log(device.ip);
    console.log(device.port);

	device.on("ping",function(data){

        //After the ping is received, but before the data is saved
        //console.log(data);
        return data;

    });
});