var express = require('express');
var app = express();

app.use(require('body-parser')());
app.use(require('method-override')());
app.use('/', express.static(__dirname+'/public'));
app.use(require(__dirname+'/config/router')(express.Router()));

var server = app.listen(8000, function(){
	var port = server.address().port;
	console.log('App running at port %s', port);
});
