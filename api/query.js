var Gps = require('../models/gps');



  module.exports = {
  getDataAtTimeForOneGps: function (gpsId,time) {
    // whatever
  Gps.
    find({  
    gpsId: gpsId
  }).
  where('timeStamp').lt(time).
  limit(1).
  sort({ 'timeStamp': -1 }).
  select({ gpsId: 1, timeStamp: 1 ,location:1,speed:1,action:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
  return result;
});
  },
  getDataAtTimeForMultipleGps: function (gpsArray,time) {
    // whateve
Gps.
  find({  
    gpsId: { $in: gpsArray }
  }).
  where('timeStamp').lt(time).
  limit(1).
  sort({ 'timeStamp': -1 }).
  select({ gpsId: 1, timeStamp: 1 ,location:1,speed:1,action:1}).
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
  where('timeStamp').lt(endTime).gt(startTime).
  sort({ 'timeStamp': -1 }).
  select({ gpsId: 1, timeStamp: 1 ,location:1,speed:1,action:1}).
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
  where('timeStamp').lt(endTime).gt(startTime).
  sort({ 'timeStamp': -1 }).
  select({ gpsId: 1, timeStamp: 1 ,location:1,speed:1,action:1}).
  exec(function(err, result) {
  if (err) throw err;
  console.log(result);
});
  }
};
