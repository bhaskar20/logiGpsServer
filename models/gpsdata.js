// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gpsDataSave = new Schema({
  action:{type:String,required:true},
  gpsId: { type: String, required: true },
  timeStamp:{"type":Date, default:Date.now,required:true},
  location :{ type: "<GeoJSON type>" , coordinates: <coordinates> },
  speed:{type:Number},
  courseData:{"type":Object},
  terminalInfo:{"type":Object},
  Others:{"type":Object}
});

// the schema is useless so far
// we need to create a model using it
var GpsData = mongoose.model('Gps', gpsDataSave);

// make this available to our users in our Node applications
module.exports = GpsData;