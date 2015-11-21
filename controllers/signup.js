var pg = require('pg');
var conString = "postgres://postgres:cmsc127@localhost/spotify";

exports.create = function(req,res,next){

	console.log(req.body);

  var results = [];

  pg.connect(conString, function(err, client, done) {
          // Handle connection errors
          if(err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err});
          }

          // SQL Query > Insert Data
          client.query("INSERT INTO admin values($1, $2, $3)", [req.body.id, req.body.password, req.body.username], function(err){

              if(err) res.send("error");

          });

          // SQL Query > Select Data
          var query = client.query("SELECT * FROM admin");

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

};
