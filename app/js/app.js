'use strict';

angular.module('braam', ['ngCookies']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/general.html',
		controller: IndexController
	}).
	when('/signup', {
		templateUrl: 'partials/signup.html',
		controller: SignUpController
	}).
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: LoginController
	}).
	when('/logout', {
		template: " ",
		controller: LogoutController
	});
	$locationProvider.html5Mode(true);
}]);