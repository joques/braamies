'use strict';

var Project = require('../models/project').Project;

module.exports.ProjectsController = function() {
	this.project = new Project();

	this.createProject = function(projectData, callback) {
		this.project.createProject(projectData.codename, projectData, function(projectCreationError, projectCreationResult) {
			callback(projectCreationError, projectCreationResult);
		});
	}

	this.listAllProjects = function(listData, searchParam, callback) {
		this.project.listAllProjects(searchParam, callback, function(projectListError, projectList) {
			callback(projectListError, projectList);
		});
	}
};