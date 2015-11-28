var pg = require('pg');
var conString = "postgres://cmsc127:cmsc127@127.0.0.1/spotify";
var app = require('../index');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var path = require('path');
app.use(session({secret: 'ssshhhhh'}));

var sess;

exports.defaultLog = function(req, res, next){
	sess = req.session;

	if(sess.username) res.sendFile(path.join(__dirname + '/../public/home/home.html'));
	else res.redirect('/');

}

exports.adminLog = function(req, res, next){

	sess = req.session;

	if(sess.username) res.sendFile(path.join(__dirname + '/../public/home/home.html'));
	else{
			var results = [];

			pg.connect(conString, function(err, client, done){

				if(err){
					done();
					console.log(err);
					return res.status(500).json({success: false, data: err});
				}

				var query = client.query("SELECT * FROM admin where admin_id like $1;", [req.body.id]);

				query.on('row', function(row){
					var hash = row.password;
					bcrypt.compare(req.body.password, hash, function(err, res) {
							if(res == true && row.username === req.body.username){
								results.push(row);
								sess.username = row.username;
								sess.password = row.password;
								console.log('dasdasdasdasd');
								redirect();

								function redirect(){
									if(sess.username) return res.sendFile(path.join(__dirname + '/../public/home/home.html'));
										return res.redirect('/');
								}

							}
					});
				});

				query.on('end', function() {
						done();
				});

				 return res.sendFile(path.join(__dirname + '/../public/home/home.html'));

			});
		}
};

exports.logout = function(req, res, next){

	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
		});
}


exports.regularLog = function(req, res, next){

sess = req.session;

if(sess.username) res.sendFile(path.join(__dirname + '/../public/home/home.html'));
else{
		var results = [];

		pg.connect(conString, function(err, client, done){

			if(err){
				done();
				console.log(err);
				return res.status(500).json({success: false, data: err});
			}

			var query = client.query("SELECT * FROM reg_user where username like $1;", [req.body.username]);

			query.on('row', function(row){

					var hash = row.password;

					if(row.date_approved){
						bcrypt.compare(req.body.password, hash, function(err, res) {
								if(res == true && row.username === req.body.username){
									results.push(row);
									sess.username = row.username;
									sess.password = row.password;
									if(sess.username) return res.sendFile(path.join(__dirname + '/../public/home/home.html'));
								}
						});
					}
					else return res.redirect('/');

			});

			query.on('end', function() {
					done();
			});

			 return res.sendFile(path.join(__dirname + '/../public/home/home.html'));

		});
	}
};
