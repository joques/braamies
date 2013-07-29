'use strict';


// create the application
var braamApp = angular.module('braam', ['ngCookies', 'ngResource', 'pascalprecht.translate']);

// add backend resource via a factory
braamApp.factory('BraamRes', function($resource) {
	return $resource('/api/projects/:project_id', {project_id: '@project_id'}, {update: {method: 'PUT'}});
});

// configure the application
braamApp.config(['$routeProvider', '$locationProvider', '$translateProvider', function($routeProvider, $locationProvider, $translateProvider){
	$routeProvider.
	when('/', {templateUrl: 'partials/general.html', controller: IndexController}).
	when('/signup', {templateUrl: 'partials/signup.html', controller: SignUpController}).
	when('/login', {templateUrl: 'partials/login.html', controller: LoginController}).
	when('/logout', {template: " ", controller: LogoutController}).
	when('/new', {templateUrl: "partials/createProject.html", controller: CreateProjectController}).
	when('/list', {templateUrl: "partials/listProject.html", controller: ListProjectController}).
	when('/edit/:projectid', {templateUrl: "partials/editProject.html", controller: EditOrDeleteProjectController}).
	otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
	$translateProvider.translations('en', {
		'GREETINGS': 'Welcome to',
	});
	$translateProvider.translations('fr', {
		'GREETINGS': 'Bienvenue à',
	});
	$translateProvider.preferredLanguage('en');
}]);