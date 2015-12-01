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

exports.deletePlaylist = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("delete from playlist where playlist_number = $1", [req.body.number]);
          return res.json({"status":"ok"});
    });
}

exports.search = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    req.params.id = "%" + req.params.id + "%";

      // SQL Query > Select Data
      var query = client.query("select * from song natural join is_composed_by natural join artist where song_name like $1 ", [req.params.id]);

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

exports.viewPlaylist = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
          // SQL Query > Select Data
          var query = client.query("select * from playlist");

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

exports.createPlaylist = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
          // SQL Query > Select Data
          var query = client.query("insert into playlist values((select max(playlist_number) + 1 from playlist), $1, $2 ); ", [req.body.playlist, req.body.username]);

          var query = client.query("select * from playlist");

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

exports.getTopSongs = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("SELECT song_name, artist_name, times_played FROM song natural join is_composed_by natural join artist order by times_played desc");

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

exports.getSongs = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("SELECT song_name, artist_name, album, track_length, times_played FROM song natural join is_composed_by natural join artist");

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
