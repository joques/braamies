'use strict';

var dataManager = require('../util/data-manager').DataManager.getDataManagerInstance();

module.exports.Project = function() {
	this.createProject = function(projectId, projectData, callback) {
		dataManager.save('projects', projectId, projectData, function(saveProjectError, saveProjectResult) {
			callback(saveProjectError, saveProjectResult);
		});
	}

	this.listAllProjects = function(callback) {
		dataManager.findAll('projects', function(findAllError, findAllResult) {
			callback(findAllError, findAllResult);
		});
	}

	this.listProjects = function(callback) {}

	this.updateProject = function(updateData, projectId, callback) {}

	this.deleteProject = function(projectId, callback) {}

	this.fetchProject = function(projectId, callback) {}
};