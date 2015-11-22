var pg = require('pg');
var conString = "postgres://cmsc127:cmsc127@127.0.0.1/spotify";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  //edit: create tables
  client.query('SELECT * from admin;', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    client.end();
  });

  //edit: populate database
  client.query('SELECT * from admin;', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    client.end();
  });


});
