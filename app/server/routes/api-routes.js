/**
*
* Api routes
*
**/

var UsersController = require('../lib/controllers/users').UsersController;
var ProjectsController = require('../lib/controllers/projects').ProjectsController;

module.exports = function(app, extraParam) {
	// get all projects: "get /api/projects"
	app.get('/api/projects', function(request, response) {
		console.log("getting all projects...");
		new ProjectsController(extraParam).listAllProjects(request.body, request.query.q, function(projectListError, projectListObj) {
			if ((typeof projectCreationError !== "undefined") && (projectListError !== null)) {
				response.json(500, {error: projectListError.message});
			} else{
				response.json(projectListObj);
			};
		});
	});

	// get a particular project: "get /api/project/:project_id"
	app.get('/api/projects/:project_id', function(request, response) {
		console.log("getting project...");
		new ProjectsController(extraParam).getProject(request.params.project_id, function(projectReadError, projectReadResult) {
			if ((typeof projectReadError !== "undefined") && (projectReadError !== null)) {
				response.json(500, {error: projectReadError.message});
			} else{
				response.json(projectReadResult);
			};
		});
	});

	// add a new project: "post /api/projects"
	app.post('/api/projects', function(request, response) {
		console.log("Creating a new project...");
		new ProjectsController(extraParam).createProject(request.body, function(projectCreationError, projectCreationResult) {
			if ((typeof projectCreationError !== "undefined") && (projectCreationError !== null)) {
				response.json(500, {error: projectCreationError.message});
			} else{
				response.json(projectCreationResult);
			};
		});
	});

	// edit an existing project: "put /api/project/:project_id"
	app.put('/api/projects/:project_id', function(request, response){
		console.log("Updating a project...");
		new ProjectsController(extraParam).updateProject(request.params.project_id, request.query._rev, request.body, function(projectUpdateError, projectUpdateResult){
			if ((typeof projectUpdateError !== "undefined") && (projectUpdateError !== null)) {
				response.json(500, {error: projectUpdateError.message});
			} else{
				response.json({update: "success"});
			};
		});
	});

	// delete an existing project: "delete /api/project/project_id"
	app.delete('/api/projects/:project_id', function(request, response) {
		console.log("Deleting a project...");
		new ProjectsController(extraParam).deleteProject(request.params.project_id, request.query._rev, function(projectDeletionError, projectDeletionResult){
			if ((typeof projectDeletionError !== "undefined") && (projectDeletionError !== null)) {
				response.json(500, {error: projectDeletionError.message});
			} else{
				response.json({deletion: "success"});
			};
		});
	});

	// user authentication
	app.post('/api/authenticate', function(request, response){
		console.log("Authenticating user...");
		new UsersController(extraParam).authenticate(request.body, function(authenticationError, sessionData){
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
		new UsersController(extraParam).createUser(request.body, function(createUserError, sessionData){
			if ((typeof createUserError !== "undefined") && (createUserError !== null)) {
				response.json(500, {error: createUserError.message});
			} else{
				response.json(sessionData);
			};
		});
	});
};