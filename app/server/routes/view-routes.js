/**
*
* View routes
*
**/

module.exports = function(app) {
	// main view
	// get /
	app.get('/', function(request, response) {
		response.render('index.html');
	});

	// partials
	// get /partials/:name
	app.get('/partials/:name', function(request, response) {
		var name = request.params.name;
		response.render('partials/' + name );
	});

	app.get('/edit/partials/:name', function(request, response) {
		var name = request.params.name;
		response.render('partials/' + name);
	});
};