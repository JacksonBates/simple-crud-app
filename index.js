var mongodb = require('mongodb');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongo = mongodb.MongoClient;
var app = express();
var mongoUserPsw = process.env.MONGO_USER_PSW;
var url = 'mongodb://' +
 mongoUserPsw +
 '@ds011735.mlab.com:11735/simple-crud-app';

mongo.connect(url, function(err, db) {
  if (err) {
    console.log('Error: unable to connect to database');
    throw err;
  }
  console.log('Connected to database');

  // pass db with each request
  app.use(function(req, res, next) {
    req.db = db;
    next();
  });

  app.use(express.static(path.join(__dirname, '/public')));

  app.use(bodyParser.urlencoded({extended: false}));

  // Use the routes specified in the routes file
  app.use(require('./routes'));

  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'ejs');
  // Start node server
  app.listen(3000, function() {
    console.log('Node server is running on port 3000');
  });
});
