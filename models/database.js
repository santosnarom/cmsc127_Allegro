//Create tables and populate database

var pg = require('pg');
var conString = "postgres://cmsc127:cmsc127@127.0.0.1/spotify";

pg.connect(conString, function(err,client,done){

  if(err)
    return console.error('could not connect to postgres', err);

  //edit: create tables
  //create table admin
  client.query('create table admin(admin_id varchar(10) primary key not null, password varchar(100) not null, username varchar(32) not null);');

  //create table reg_user
  client.query('create table reg_user(username varchar(32) primary key not null, password varchar(100) not null, date_approved date, admin_id varchar(10) references admin(admin_id));');

  //create table playlist
  client.query('create table playlist(playlist_number int primary key not null, playlist_name varchar(32) not null, username varchar(32) references reg_user(username) not null);');

  //create table artist
  client.query('create table artist(artist_number int primary key not null, artist_name varchar(32) not null, playlist_number int references playlist(playlist_number), username varchar(32) references reg_user(username) not null, admin_id varchar(10) references admin(admin_id) not null);');

  //create table song
  client.query('create table song(song_number int primary key not null, song_name varchar(32) not null, album varchar(32), track_length int not null, times_played int not null, admin_id varchar(10) references admin(admin_id) not null, username varchar(32) references reg_user(username) not null, playlist_number int references playlist(playlist_number) not null);');

  //create table is_composed_of (yung relationship)
  client.query('create table is_composed_of(playlist_number int references playlist(playlist_number) not null, artist_number int references artist(artist_number) not null, song_number int references song(song_number) not null, unique(playlist_number, artist_number, song_number));');

  //create table is_composed_by (yung relationship)
  client.query('create table is_composed_by(song_number int references song(song_number) not null, artist_number int references artist(artist_number) not null, unique(song_number, artist_number));');

  //edit: populate database
  //entry1 in table admin
  client.query("insert into admin values ('1111', 'password1', 'username1');");
  //entry2 in table admin
  client.query("insert into admin values ('1112', 'password2', 'username2');");

  //entry1 in table reg_user
  client.query("insert into reg_user values ('username1', 'password1', 'now()', (select admin_id from admin where admin_id='1111'));");

  //entry1 in table playlist
  client.query("insert into playlist values (1, 'playlist1', (select username from reg_user where username='username1'));");

  //entry1 in table artist
  client.query("insert into artist values (1, 'artist1', (select playlist_number from playlist where playlist_number=1), (select username from reg_user where username='username1'), (select admin_id from admin where admin_id='1111'));");

  //entry1 in table song
  client.query("insert into song values (1, 'song1', 'album1', 214, 73, (select admin_id from admin where admin_id='1111'), (select username from reg_user where username='username1'), (select playlist_number from playlist where playlist_number=1));");

  //entry1 in is_composed_of
  client.query("insert into is_composed_of values ((select playlist_number from playlist where playlist_number=1), (select artist_number from artist where artist_number=1), (select song_number from song where song_number=1));");

  //entry1 in is_composed_by
  client.query("insert into is_composed_by values ((select song_number from song where song_number=1), (select artist_number from artist where artist_number=1));");

  done();

});
