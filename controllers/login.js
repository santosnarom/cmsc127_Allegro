var pg = require('pg');
var conString = "postgres://cmsc127:cmsc127@127.0.0.1/spotify";
var app = require('../index');
var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));

var sess;

exports.defaultLog = function(req, res, next){
	sess = req.session;

	if(sess.username) res.send('logged in as ' + sess.username);
	else res.redirect('/');

}

exports.adminLog = function(req, res, next){

	sess = req.session;

	if(sess.username) res.send('logged in as ' + sess.username);
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
					console.log(row.username);
					if(row.username === req.body.username && row.password === req.body.password){
						results.push(row);
						sess.username = row.username;
						sess.password = row.password;
					}
				});

				query.on('end', function() {
						done();
						if(sess.username) return res.send('Log-in Successful');
							return res.redirect('/');
				});

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


/*exports.regularLog = function(req, res, next){

	pg.connect(conString, function(err, client, rows){

		if(err){
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		var query = client.query("SELECT * FROM reg_user where username like '?'", [req.params.username]);

		query.on('row', function(row){
			if(rows.length === 0){
				res.statu(404).send('This username is not yet in the Spotify.');
			} else{
				done();
				res.send(rows[0]);
			}
		});

	});
};*/
