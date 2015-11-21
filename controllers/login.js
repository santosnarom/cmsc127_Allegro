var pg = require('pg');
var conString = "postgres://postgres:cmsc127@localhost/spotify"

exports.adminLog = function(req, res, next){
	console.log(req.query);

	var results = [];

	pg.connect(conString, function(err, client, done){

		if(err){
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		var query = client.query("SELECT * FROM admin where admin_id like $1;", [req.query.id]);

		query.on('row', function(row){
			results.push(row);
		});

		query.on('end', function() {
				done();
				if(results.length === 0) return res.send('Account not existing');;
					return res.json(results);
		});

	});

};


exports.regularLog = function(req, res, next){
	console.log(req.ip + "regularLog()");

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
};
