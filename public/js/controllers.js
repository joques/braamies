'use strict';

// Controllers

// IndexController

function IndexController($scope, $cookies) {
	$scope.getUsername = function() {
		return $cookies.username;
	}
	$scope.loggedIn = function() {
		return ($cookies.username != undefined);
	};
}

function LoginController($scope, $location, $http, $cookies) {
	$scope.login = {};
	$scope.signIn = function(){
		$http.post('/api/authenticate', $scope.login).success(function(loginData) {
			$cookies.username = loginData.username;
			// $cookies.fullName = loginData.fullName;
			// $cookies.isDeveloper = loginData.isDeveloper;
		});

		// redirect to '/'
		$location.path('/')
	};
}

function SignUpController($scope, $location, $routeParams, $cookies) {
	$scope.signup = {};
	$scope.register = function() {
		$http.post('/api/user', $scope.signup).success(function(signupData) {
			$cookies.username = signupData.username
		});
		// add the new user to the db
		// if successful add cookies info
		// and redirect to '/'
		$location.path('/');
	};
}

function LogoutController($scope, $location, $cookies) {
	$cookies.username = undefined;
	$cookies.fullName = undefined;
	$cookies.isDeveloper = undefined;
	$location.path('/');
}