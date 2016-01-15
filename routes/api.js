
var methods = require('../api/query.js')
app.get("/api/getDataAtTimeForOneGps/:gpsId/:time",function (req,res) {
	var result = methods.getDataAtTimeForOneGps(req.params.gpsId,req.params.time);
	send.json(result);
})

