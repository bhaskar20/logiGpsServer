
var methods = require('../api/query.js');
var express = require('express');
var router = express.Router();

router.get("/api/getDataAtTimeForOneGps/:gpsId/:time",function (req,res) {
	var result = methods.getDataAtTimeForOneGps(req.params.gpsId,req.params.time);
	send.json(result);
})
module.exports = router;

