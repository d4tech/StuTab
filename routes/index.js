
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'CUCEK' })
};*/

exports.home = function(req, res) {
	if(!req.cookies)
		res.render('login');
	else
	{
		res.render('index',{ title : req.session.uid});
	}
};

exports.login =function (req, res) {
	var userId = req.body.uid;
	var mongoose = require('mongoose');
	var user = require('../model/user');
	console.log(userId);
	consle.log(req.body.pass);

	mongoose.connect('mongodb://localhost/users');

	user
		.findOne({uid : userId})
		.select('pass')
		.exec(function(req,res,user) {
			if (user.pass===req.body.pass) {
				res.cookie(userId,{maxage : 60000});
				res.render('index',{title : 'Thank u Lord'});
			} else{

			}
		});
};
