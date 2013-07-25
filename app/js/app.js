'use strict';

angular.module('braam', ['ngCookies', 'ngResource']).
	factory('BraamRes', function($resource) {
	return $resource('/api/projects/:project_id', {project_id: '@id'}, {update: {method: 'PUT'}});
	}).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {templateUrl: 'partials/general.html', controller: IndexController}).
		when('/signup', {templateUrl: 'partials/signup.html', controller: SignUpController}).
		when('/login', {templateUrl: 'partials/login.html', controller: LoginController}).
		when('/logout', {template: " ", controller: LogoutController}).
		when('/new', {templateUrl: "partials/createProject.html", controller: createProjectController});
	$locationProvider.html5Mode(true);
}]);