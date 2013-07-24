/**
*
* Module dependencies
*
**/

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// app configuration
app.configure(function(){
	app.set('views', __dirname + '/../views');
	app.engine('html', require('ejs').renderFile);
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/../public'));
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// route inclusion
require('./routes/view-routes')(app);
require('./routes/api-routes')(app);

// start server
server.listen(7493, function(){
	console.log("Braamies server listening on port %d in %s mode", server.address().port, app.settings.env);
});