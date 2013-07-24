'use strict';

// Controllers

// IndexController

function IndexController($scope, $cookies) {
	$scope.getUsername = function() {
		return $cookies.username;
	};

	$scope.loggedIn = function() {
		return ($cookies.username != undefined);
	};
}

function LoginController($scope, $location, $http, $cookies) {
	$scope.login = {};
	$scope.signIn = function(){
		$http.post('/api/authenticate', $scope.login).
			success(function(loginData, status, headers, config) {
				$cookies.username = loginData.username;
				$cookies.fullName = loginData.fullName;
				$cookies.isDeveloper = loginData.isDeveloper;
			}).
			error(function(errorData, status, headers, config) {
				$cookies.username = undefined;
				$cookies.fullName = undefined;
				$cookies.isDeveloper = undefined;
			});

		// redirect to '/'
		$location.path('/');
	};
}

function SignUpController($scope, $location, $http, $cookies) {
	$scope.signup = {};
	$scope.signup.isDeveloper = true;
	$scope.register = function() {
		$http.post('/api/user', $scope.signup).
			success(function(signupData, status, headers, config){
				$cookies.username = signupData.username;
				$cookies.fullName = signupData.fullName;
				$cookies.isDeveloper - signupData.isDeveloper;
			}).
			error(function(errorData, status, headers, config) {
				$cookies.username = undefined;
				$cookies.fullName = undefined;
				$cookies.isDeveloper = undefined;
			});

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