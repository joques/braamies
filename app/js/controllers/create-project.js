'use strict';

// Create project controller

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