
var mongodb = require('mongodb');
var server = new mongodb.Server('192.168.2.6','27017',{auto_reconnect: true},{safe:false});

students = function() {};

students.prototype.getAll = function(course,batch,callback){
	var db =new mongodb.Db(course,server);
	db.open(function(err, db) {
		if (!err) {
			db.collection(batch, function(err, collection) {
				collection.find().toArray(function(err, docs) {
					
					if (err) { callback(err);}
					else {callback(docs);}
				
				});
			});
		}
		else {callback(err);}
	});
};

students.getAll('IT','batch06',function(err,docs) {
	if(!err)
		console.log(docs);
	else
		console.log(err);
});

exports.students();