var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile("../public/index.html",options,function(err){
  	if(err){
  		console.log(err);
  	}
  	else{
  		console.log("file Sent");
  	}
  });
});

module.exports = router;