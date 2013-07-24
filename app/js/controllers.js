'use strict';

// Controllers

// IndexController

function IndexController($scope, $cookieStore) {
	$scope.resetValues = function() {
		$scope.general = {
			username: $cookieStore.get('username'),
			fullName: $cookieStore.get('fullName'),
			isDeveloper: $cookieStore.get('isDeveloper')
		};
	};

	$scope.resetValues();

	$scope.getUsername = function() {
		return $cookieStore.get('username') ;
	};

	$scope.loggedIn = function() {
		return ($cookieStore.get('username') !== undefined);
	};

	$scope.canDevelop = function() {
		return (($scope.general.isDeveloper !== undefined) && ($scope.general.isDeveloper));
	};
}

function LoginController($scope, $location, $http, $cookieStore) {
	$scope.login = {};
	$scope.signIn = function(){
		$http.post('/api/authenticate', $scope.login).
			success(function(loginData, status, headers, config) {
				$cookieStore.put('username', loginData.username);
				$cookieStore.put('fullName', loginData.fullName);
				$cookieStore.put('isDeveloper', loginData.isDeveloper);
				$location.path('/');
			}).
			error(function(errorData, status, headers, config) {
				console.log(errorData);
				$cookieStore.put('username', undefined);
				$cookieStore.put('fullName', undefined);
				$cookieStore.put('isDeveloper', undefined);
				$location.path('/');
			});
	};
}

function SignUpController($scope, $location, $http, $cookieStore) {
	$scope.signup = {};
	$scope.signup.isDeveloper = true;
	$scope.register = function() {
		$http.post('/api/user', $scope.signup).
			success(function(signupData, status, headers, config){
				$cookieStore.put('username', signupData.username);
				$cookieStore.put('fullName', signupData.fullName);
				$cookieStore.put('isDeveloper',signupData.isDeveloper);
				$location.path('/');
			}).
			error(function(errorData, status, headers, config) {
				$cookieStore.put('username', undefined);
				$cookieStore.put('fullName', undefined);
				$cookieStore.put('isDeveloper', undefined);
				$location.path('/');
			});
	};
}

function LogoutController($scope, $location, $cookieStore) {
	$scope.cleanUpValues = function() {
		$cookieStore.put('username', undefined);
		$cookieStore.put('fullName', undefined);
		$cookieStore.put('isDeveloper', undefined);
	};

	$scope.cleanUpValues();
	$location.path('/');
}