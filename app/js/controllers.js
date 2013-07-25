'use strict';

// Controllers

// IndexController

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

function CreateProjectController($scope, $location, $cookieStore, BraamRes) {
	$scope.createProject = {
		status: "pending"
	};

	$scope.create = function() {
		console.log("inside create function of createProjectController");
		$scope.createProject.creator = $cookieStore.get('username');
		BraamRes.save($scope.createProject, function(){
			$location.path('/');
		});
	};
}

function ListProjectController($scope, $location, BraamRes) {
	$scope.resetAll = function() {
		var allProjects = BraamRes.query({q: $scope.query}, function() {
			$scope.projects = allProjects;
			$scope.query = "";
		});
	};

	$scope.resetAll();

	$scope.statusLabelClass = function(statusValue) {
		if ((typeof statusValue !== "undefined") && (statusValue !== "null")) {
			if (statusValue.toLowerCase() === "completed") {
				return "label-success";
			} else{
				if (statusValue.toLowerCase() === "in-progress") {
					return "label-warning";
				} else{
					return " ";
				};
			};
		} else{
			return " ";
		};
	};
}