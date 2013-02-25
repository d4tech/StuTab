
var mongodb = require('mongodb');
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var server = new mongodb.Server('localhost','27017',{safe:false},{auto_reconnect: true},{j:true},{w:n, wtimeout:n}, {fsync:true});


exports.getAll = function(course,batch,callback){
	var getAllDb =new mongodb.Db(course,server);
	getAllDb.open(function(err, getAllDb) {
		if (!err) {
			this.getAllDb.collection(batch, function(err, collection) {
				collection.find().toArray(function(err, docs) {
					
					if (err) { callback(err);}
					else {callback(docs);}
				
				});
			});
		}
		else {callback(err);}
	});
	getAllDb.close();
};

exports.getOne = function(course,batch,query,projection,callback) {
	var getOneDb =new mongodb.Db(course,server);
	getOneDb.open(function(err, getOneDb) {
		if (!err) {
			getOneDb.collection(batch, function(err, collection) {
				collection.findOne(query,projection, function(err, doc) {
					if (err) {callback(err);}
					
					else{callback(doc);}
				});
			});

		}
		else{callback(err);}
	});
	getOneDb.close();
};




/*var info=require("./db2.js");

info.getAll('users','users',function(err,docs) {
	if(!err)
	{
		console.log(docs);
		
	}
	else
	{
		console.log(err);
		
	}
	
});*/




info.getOne('users','users',{"uid" : "rick"},{fields:{pass:1}},function(err,doc) {
	if(!err)
	{
		console.log(docs);
		
	}
	else
	{
		console.log(err);
		
	}
});


// exports.info();*/