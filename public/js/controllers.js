'use strict';

// Controllers

// IndexController

function IndexController($scope, $cookies) {
	$scope.username = $cookies.username;
	$scope.fullName = $cookies.fullName;
	$scope.isDeveloper = $cookies.isDeveloper;
	$scope.loggedIn = ($cookies.username != undefined);
}

function LoginController($scope, $location, $routeParams, $cookies) {
	$scope.login = function(){
		// should connect to the server and log the user in
		// if login successful add username, fullname and isDeveloper to cookies object
		// redirect to '/'
		$location.path('/')
	};
}

function SignUpController($scope, $location, $routeParams, $cookies) {}