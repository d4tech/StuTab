exports.user = function() {
	var mongoose = require('mongoose');
	var Schema = require('mongoose').Schema;
	var prividges = 'r w'.split('');

	var userSchema = new Schema({
		uid : {type : String, index:{unique : true, required : true} },
		pass : String,
		uN : {
			N : String,
			mN : String,
			lN : String
		}
	},{ autoIndex : false});
	
	mongoose.connect('mongodb://localhost/users');
	var _user = mongoose.model('_user', userSchema);
	
	var login = function(userId, password, callback) {
		/*var uid = {uid : userId};
		_user.findOne(uid,'pass privs', function(_user,callback) {
			if (_user.pass===password) {
				callback();
			} else{
				callback(invalid);
			}
		});*/
		_user
			.findOne({uid : userId})								//select the doc having uid : userId
			.select('uid pass privs')								//get the fields uid, pass, privilidges
			.exec(													//execute the logic
				function(err,user,callback) {
					
					if (user.pass===password) {
						callback(user);								//Relook to consider the arguments being passed around
					}
					
					else{
						callback(err);
					}
				}
			);
	};

	/*return{
		schema : userSchema,
		model: _user,
		login : login
	};*/
};





