var express = require('express');
var app = module.exports = express();

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require(__dirname+'/routes/router')(express.Router()));
app.use('/', express.static(__dirname+'/public'));

var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log('App running at port %s', port);
});
