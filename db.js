
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost','27017',{auto_reconnect: true},{safe:false});

function info() {

	function getAll(course,batch,callback){
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
	}


	function getOne(course,batch,query,projection,callback){
	var db =new mongodb.Db(course,server);
		db.open(function(err, db) {
			if (!err) {
				db.collection(batch, function(err, collection) {
					collection.findOne(query,projection, function(err, doc) {
						if (err) {callback(err);}
					
						else{callback(doc);}
					});
				});

			}
			else{callback(err);}
		});
	}


}

var details = new info();

details.getAll('users','users',function(err,docs) {
	if(!err)
		console.log(docs);
	else
		console.log(err);
});

/*info.getOne('users','users',{"uid" : "rick"},{fields:{pass:1}}, function(err,doc) {
	if(!err)
		console.log(doc);
	else
		console.log(err);
});*/


exports.info();