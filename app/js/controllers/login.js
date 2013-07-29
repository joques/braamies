'use strict';

// Login controller

function LoginController($scope, $location, $http, $cookieStore) {
	$scope.login = {};
	$scope.signIn = function(){
		$http.post('/api/authenticate', $scope.login).
			success(function(loginData, status, headers, config) {
				$cookieStore.put('username', loginData.username);
				$cookieStore.put('fullName', loginData.fullName);
				$cookieStore.put('isDeveloper', loginData.isDeveloper);
				$cookieStore.put('loginOrSignupFailureMessage', undefined);
				$location.path('/');
			}).
			error(function(errorData, status, headers, config) {
				console.log(errorData);
				$cookieStore.put('username', undefined);
				$cookieStore.put('fullName', undefined);
				$cookieStore.put('isDeveloper', undefined);
				$cookieStore.put('loginOrSignupFailureMessage', errorData.error);
				$location.path('/');
			});
	};
}
