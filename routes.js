var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongodb = require('mongodb');
var userQueries = require('./controllers/userQueries');

// Homepage for the app, allows username-password submission
router.get( '/', function(req, res) {
  res.render('pages/home');
});

// Triggered by username-password form submit
router.post('/submit', userQueries.saveUser);

// Successfully save user to db
router.get('/success', function(req, res) {
    res.render('pages/success');
});

// Shows page with all users and the options to update and delete
router.get('/admin', userQueries.getUsers);

// Triggered by admin page update button
router.get('/:id/edit', function(req, res) {
  var id = req.params.id;
  var username = req.query.username;
  res.render('pages/update-password', { id: id, username: username});
});

// Triggered by admin page delete button
router.post('/:id/edit', userQueries.deleteUser);

// Triggered by :id/edit page update form submit
router.post('/update', userQueries.updateUser);

// Cathces invalid HTTP requests and returns 404
router.get('*', function(req, res) {
  res.status(404);
  res.render('pages/not-found');
  res.end();
});

module.exports = router;
