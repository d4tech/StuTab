var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var prividges = 'r w'.split('');

var user = new Schema({
	uid : {type : String, index:{unique : true, required : true} },
	pass : String,
	uN : {
		N : String,
		mN : String,
		lN : String
	}
},{ autoIndex : false});

module.exports = mongoose.model('user',user); 