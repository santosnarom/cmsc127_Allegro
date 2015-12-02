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

exports.upload = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

      if(err){
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }

      var query = client.query("insert into artist(artist_name,username) values($1, $2)", [req.body.artist, req.session.username]);

      // SQL Query > Select Data
      var query = client.query("insert into song(song_name,username,path,filename) values($1,(select username from reg_user where username=$2),$3,$4)", [req.file.originalname, req.file.username,req.file.path, req.file.filename]);

      var query = client.query("insert into is_composed_by values((select song_number from song where filename = $1), (select artist_number from artist where artist_name = $2))", [req.file.filename, req.body.artist]);

      // Stream results back one row at a time

      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          done();
          return res.send('uploaded');
      });

    });
}

exports.removeFromPlaylist = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }


      // SQL Query > Select Data
      var query = client.query("update song set playlist_number = null where song_number = $1", [req.body.number]);

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          done();
          return res.json({"success":true});
      });
    });
}

exports.viewPlaylistContent = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }


      // SQL Query > Select Data
      var query = client.query("select * from song join playlist on song.playlist_number = playlist.playlist_number where song.playlist_number = $1 ", [req.body.number]);

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
    console.log(req.params.id);
      // SQL Query > Select Data
      var query = client.query("select * from song join is_composed_by on song.song_number = is_composed_by.song_number join artist on is_composed_by.artist_number = artist.artist_number where song_name like $1 ", [req.params.id]);

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

exports.addToPlaylist = function(req, res, next){

  var results = [];

  pg.connect(conString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

          // SQL Query > Select Data
          var query = client.query("update song set playlist_number = $1 where song_number = $2", [req.body.playlist, req.body.song_number]);

          var query = client.query("select * from song where playlist_number = $1", [req.body.playlist]);

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
          var query = client.query("insert into playlist(playlist_name, username) values($1, $2); ", [req.body.playlist, req.body.username]);

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
          var query = client.query("SELECT song_name, artist_name, album, track_length, times_played FROM song join is_composed_by on song.song_number = is_composed_by.song_number join artist on is_composed_by.artist_number = artist.artist_number order by times_played desc");

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
          var query = client.query("SELECT song_name, song.song_number, artist_name, album, track_length, times_played FROM song join is_composed_by on song.song_number = is_composed_by.song_number join artist on is_composed_by.artist_number = artist.artist_number");

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
