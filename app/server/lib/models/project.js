'use strict';

var dataManager = require('../util/data-manager').DataManager.getDataManagerInstance();

module.exports.Project = function() {
	this.createProject = function(projectId, projectData, callback) {
		dataManager.save('projects', projectId, projectData, function(saveProjectError, saveProjectResult) {
			callback(saveProjectError, saveProjectResult);
		});
	}

	this.listProjects = function(callback) {}

	this.updateProject = function(updateData, projectId, callback) {}

	this.deleteProject = function(projectId, callback) {}

	this.fetchProject = function(projectId, callback) {}
};