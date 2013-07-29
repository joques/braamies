'use strict';

// List project controller

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