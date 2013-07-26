'use strict';

var Project = require('../models/project').Project;

module.exports.ProjectsController = function(extraParam) {
	this.project = new Project(extraParam);

	this.createProject = function(projectData, callback) {
		this.project.createProject(projectData.codename, projectData, function(projectCreationError, projectCreationResult) {
			callback(projectCreationError, projectCreationResult);
		});
	}

	this.listAllProjects = function(listData, searchParam, callback) {
		this.project.listAllProjects(searchParam, function(projectListError, projectList) {
			callback(projectListError, projectList);
		});
	}

	this.getProject = function(projectId, callback) {
		this.project.getProject(projectId, function(projectItemError, projectItem) {
			callback(projectItemError, projectItem);
		});
	}

	this.deleteProject = function(projectId, revisionValue, callback) {
		this.project.deleteProject(projectId, revisionValue, function(projectDeletionError, projectDeletionResukt){
			callback(projectDeletionError, projectDeletionResukt);
		});
	}

	this.updateProject = function(projectId, revisionValue, projectDetails, callback) {
		this.project.updateProject(projectId, revisionValue, projectDetails, function(projectDeletionError, projectDeletionResult){
			callback(projectDeletionError, projectDeletionResult);
		});
	}
};