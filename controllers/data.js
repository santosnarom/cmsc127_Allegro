var pg = require('pg');
var conString = "postgres://cmsc127:cmsc127@127.0.0.1/spotify";
var app = require('../index');
var path = require('path');

exports.all = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("SELECT * FROM reg_user");

          // Stream results back one row at a time
          query.on('row', function(row) {
              results.push(row);
          });

          // After all data is returned, close connection and return results
          query.on('end', function() {
              done();
              return res.json(results);
          });
    });
}

exports.unapproved = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("SELECT * FROM reg_user where date_approved is null");

          // Stream results back one row at a time
          query.on('row', function(row) {
              results.push(row);
          });

          // After all data is returned, close connection and return results
          query.on('end', function() {
              done();
              return res.json(results);
          });
    });
}

exports.approve = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("UPDATE reg_user set date_approved = now(), admin_id = (select admin_id from admin where username = $2) where username = $1;", [req.body.username, req.body.admin]);

          // Stream results back one row at a time
          query.on('row', function(row) {
              results.push(row);
          });

          // After all data is returned, close connection and return results
          query.on('end', function() {
              done();
              return res.json(results);
          });
    });
}
