var Gps = require('../models/gps');

  module.exports = {
  getDataAtTimeForOneGps: function (gps,time) {
    // whatever
  Gps.
    find({  
    gpsId: gps
  }).
  where('createdAt').lt(time).
  limit(1).
  sort({ 'createdAt': -1 }).
  select({ gpsId: 1, createdAt: 1 ,location:1,speed:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
});
  },
  getDataAtTimeForMultipleGps: function (gpsArray,time) {
    // whateve
Gps.
  find({  
    gpsId: { $in: gpsArray }
  }).
  where('createdAt').lt(time).
  limit(1).
  sort({ 'createdAt': -1 }).
  select({ gpsId: 1, createdAt: 1 ,location:1,speed:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
});
  },
  getDataBWTimeForOneGps: function (gps,startTime,endTime) {
    // whateve
Gps.
  find({
    gpsId: gps
  }).
  where('createdAt').lt(endTime).gt(startTime).
  sort({ 'createdAt': -1 }).
  select({ gpsId: 1, createdAt: 1 ,gpsId:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
});
  },
  getDataBWTimeForMultipleGps: function (gpsArray,startTime,endTime) {
    // whateve
Gps.
  find({
    gpsId: { $in: gpsArray }
  }).
  where('createdAt').lt(endTime).gt(startTime).
  sort({ 'createdAt': -1 }).
  select({ gpsId: 1, createdAt: 1 ,gpsId:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
});
  }
};
