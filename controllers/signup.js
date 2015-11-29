var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var pg = require('pg');
var app = require('../index');
var session = require('express-session');
var conString = process.env.DATABASE_URL || "postgres://cmsc127:cmsc127@127.0.0.1/spotify";
var path = require('path');
app.use(session({secret: 'ssshhhhh'}));

var sess;

exports.defaultSign = function(req, res, next){
	sess = req.session;

	if(sess.username) res.json(sess);
	else res.redirect('/');

}

exports.createAdmin = function(req,res,next){

	sess = req.session;

	if(sess.username) res.json(sess);
	else{

	  var results = [];

	  pg.connect(conString, function(err, client, done) {
	          // Handle connection errors
	          if(err) {
	            done();
	            console.log(err);
	            return res.status(500).json({ success: false, data: err});
	          }

						bcrypt.genSalt(10, function(err, salt) {
						    bcrypt.hash(req.body.password, salt, function(err, hash) {
									// SQL Query > Insert Data
									client.query("INSERT INTO admin values($1, $2, $3)", [req.body.id, hash, req.body.username], function(err){

											if(err) res.send("error");
											else{

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

											}

									});

						    });
						});

	      });

		}

};


exports.createRegular = function(req,res,next){

	if(sess && sess.username) res.json(sess);
	else{

		  var results = [];

		  pg.connect(conString, function(err, client, done) {
		          // Handle connection errors
		          if(err) {
		            done();
		            console.log(err);
		            return res.status(500).json({ success: false, data: err});
		          }

							bcrypt.genSalt(10, function(err, salt) {
									bcrypt.hash(req.body.password, salt, function(err, hash) {
										// SQL Query > Insert Data
					          client.query("INSERT INTO reg_user(username, password) values($1, $2)", [req.body.username, hash], function(err){

					              if(err) res.send("error");
												else{

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

												}

					          });

									});
							});

		      });
		}
};
