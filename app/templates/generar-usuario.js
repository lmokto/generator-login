var mongoose = require('mongoose')
  , config = require('../config')
  , User = require('./user');
  
mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
var newUser = new User();
newUser.local.email = config.user.name;
newUser.local.password = newUser.generateHash(config.user.password);

newUser.save(function(err, result, otro) {
 	if (err){
 		return console.log(err);
 	} else {
 		console.log("usuario creado" + result)
 	}
 	mongoose.disconnect();
});