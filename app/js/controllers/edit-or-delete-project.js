'use strict';

// Edit or delete project controller

function EditOrDeleteProjectController($scope, $routeParams, $location, BraamRes) {	
	$scope.statusValues = ['pending', 'in-progress', 'completed'];
	var curProject = BraamRes.get({project_id: $routeParams.projectid}, function() {
		$scope.updateProject = curProject;
	});

	$scope.deleteProject = function() {
		BraamRes.delete({project_id: $scope.updateProject.codename, _rev: $scope.updateProject._rev}, function(){
			console.log("Coming back from project deletion");
			$location.path('/list');
		});
	};

	$scope.changeProject = function() {
		console.log("updating project client side...")
		BraamRes.update({project_id: $scope.updateProject.codename, _rev: $scope.updateProject._rev}, $scope.updateProject, function() {
			$location.path('/list');
		});
	};
}