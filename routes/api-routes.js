/**
*
* Api routes
*
**/

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

	app.post('/api/authenticate', function(request, response){
		console.log("Authenticating user...");
		// authenticate user
		sessionData = {}
		sessionData.username = request.body.username;
		// lastname should be uppercased
		// sessionData.fullName = request.body.firstName + " " + request.body.lastName;
		// sessionData.isDeveloper = request.body.isDeveloper;
		response.json(sessionData);
	});
};