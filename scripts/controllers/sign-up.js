'use strict';

// Signup controller
function SignUpController($scope, $location, $http, $cookieStore) {
	$scope.signup = {};
	$scope.signup.isDeveloper = true;
	$scope.register = function() {
		$http.post('/api/user', $scope.signup).
			success(function(signupData, status, headers, config){
				$cookieStore.put('username', signupData.username);
				$cookieStore.put('fullName', signupData.fullName);
				$cookieStore.put('isDeveloper',signupData.isDeveloper);
				$cookieStore.put('loginOrSignupFailureMessage', undefined);
				$location.path('/');
			}).
			error(function(errorData, status, headers, config) {
				$cookieStore.put('username', undefined);
				$cookieStore.put('fullName', undefined);
				$cookieStore.put('isDeveloper', undefined);
				$cookieStore.put('loginOrSignupFailureMessage', errorData.error);
				$location.path('/');
			});
	};
}
