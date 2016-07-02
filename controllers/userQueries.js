var mongodb = require('mongodb');

module.exports = {

  // POST /submit
  saveUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var db = req.db;
    var users = db.collection('users');
    users.find({
      username: username
    }).toArray(function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc.length > 0) {
        res.end('Username taken');
      } else if (username === '' || password === '') {
        res.end('Please enter a username AND password');
      } else {
        users.insert({
          username: username,
          password: password
        });
        res.redirect('/success');
      }
    });
  },

  // GET /admin
  getUsers: function(req, res) {
    var db = req.db;
    var users = db.collection('users');
    users.find().toArray(function(err, docs) {
      if (err) {
        console.log('Error: Find query failed');
      } else {
        res.render('pages/admin', { docs: docs });
      }
    });
  },

  // POST /:id/edit --> DELETEs users
  deleteUser: function(req, res) {
    var db = req.db;
    var id = req.params.id;
    var users = db.collection('users');
    users.deleteOne(
      { _id: new mongodb.ObjectId(id) }
    );
    res.redirect('../admin');
  },

  // POST /update
  updateUser: function(req, res) {
    var db = req.db;
    var id = req.body.id;
    var username = req.body.username;
    var update = req.body.update;
    // console.log(id, username, update);
    var users = db.collection('users');
    users.update({
      _id: new mongodb.ObjectId(id)
    }, {
      username: username,
      password: update
    });
    res.redirect('/admin');
  }
};
