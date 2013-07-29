'use strict';

// index controller

function IndexController($scope, $cookieStore) {
	$scope.resetValues = function() {
		$scope.general = {
			username: $cookieStore.get('username'),
			fullName: $cookieStore.get('fullName'),
			isDeveloper: $cookieStore.get('isDeveloper'),
			loginOrSignupFailureMessage: $cookieStore.get('loginOrSignupFailureMessage')
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

	$scope.hasLoginFailed = function() {
		return ((typeof $scope.general.loginOrSignupFailureMessage !== "undefined") && ($scope.general.loginOrSignupFailureMessage !== null));	
	};
}