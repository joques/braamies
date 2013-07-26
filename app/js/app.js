'use strict';

angular.module('braam', ['ngCookies', 'ngResource']).
	factory('BraamRes', function($resource) {
	return $resource('/api/projects/:project_id', {project_id: '@project_id'}, {update: {method: 'PUT'}});
	}).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {templateUrl: 'partials/general.html', controller: IndexController}).
		when('/signup', {templateUrl: 'partials/signup.html', controller: SignUpController}).
		when('/login', {templateUrl: 'partials/login.html', controller: LoginController}).
		when('/logout', {template: " ", controller: LogoutController}).
		when('/new', {templateUrl: "partials/createProject.html", controller: CreateProjectController}).
		when('/list', {templateUrl: "partials/listProject.html", controller: ListProjectController}).
		when('/edit/:project_id', {templateUrl: "partials/editProject.html", controller: EditProjectController});
	$locationProvider.html5Mode(true);
}]);