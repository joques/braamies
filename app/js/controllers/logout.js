'use strict';

// Log out controller

function LogoutController($scope, $location, $cookieStore) {
	$scope.cleanUpValues = function() {
		$cookieStore.put('username', undefined);
		$cookieStore.put('fullName', undefined);
		$cookieStore.put('isDeveloper', undefined);
		$cookieStore.put('loginOrSignupFailureMessage', undefined);
	};

	$scope.cleanUpValues();
	$location.path('/');
}