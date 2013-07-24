/**
*
* Api routes
*
**/

var UsersController = require('../lib/controllers/users').UsersController;

module.exports = function(app) {
	// get all projects
	// get /api/projects
	app.get('/api/projects', function(request, response) {
		// get all projects function here
	});

	// get a particular project
	// get /api/project/:project_id
	app.get('/api/project/:project_id', function(request, response) {
		// get a project code here
	});

	// add a new project
	// post /api/project
	app.post('/api/project', function(request, response) {
		// add new project code here
	});

	// edit an existing project
	// put /api/project/:project_id
	app.put('/api/project/:project_id', function(request, response){
		// edit a project code here
	});

	// delete an existing project
	// delete /api/project/project_id
	app.delete('/api/project/:project_id', function(request, response) {
		// delete a project code here
	});

	// user authentication
	app.post('/api/authenticate', function(request, response){
		console.log("Authenticating user...");
		new UsersController().authenticate(request.body, function(authenticationError, sessionData){
			if ((typeof authenticationError !== "undefined") && (authenticationError !== null)) {
				response.json(500, {error: authenticationError.message});
			} else{
				response.json(sessionData);
			};
		});
	});

	// user creation
	app.post('/api/user', function(request, response) {
		console.log("Creating a new user...");
		new UsersController().createUser(request.body, function(createUserError, sessionData){
			if ((typeof createUserError !== "undefined") && (createUserError !== null)) {
				response.json(500, {error: createUserError.message});
			} else{
				response.json(sessionData);
			};
		});
	});
};