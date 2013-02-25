
/**
 * Module dependencies.
 */

var express = require('express');
//  , routes = require('./routes/index.js');

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.cookieParser('something'));
  app.use(express.cookieSession({cookie :{maxage : 60000}}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/',function(req, res) {
  if(!req.cookies)
    res.render('login');
  else
  {
    res.render('index',{ title : req.session.name});
  }
});


app.post('/',function (req, res) {
  // var userId = req.body.uid;
  var mongoose = require('mongoose');
  var user = require('./model/user.js');

  mongoose.connect('mongodb://localhost/users');

  user
    .findOne({uid : req.body.uid})
    .select('pass')
    .exec(function(err,user) {
      if (!err && user.pass===req.body.pass) {
        res.cookie(req.body.uid,{maxage : 60000});
        res.render('index',{title : 'Thank u Lord'});
      } else{
        res.redirect('/');

    }
  });

  mongoose.disconnect(); 
});

//app.get('/index',routes.index);

app.listen(3003);
console.log("Express server listening on port %d in %s mode", 3003, app.settings.env);
