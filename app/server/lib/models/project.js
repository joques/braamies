'use strict';

var async = require('async');
var dataManager = require('../util/data-manager').DataManager.getDataManagerInstance();

module.exports.Project = function() {
	this.createProject = function(projectId, projectData, callback) {
		dataManager.save('projects', projectId, projectData, function(saveProjectError, saveProjectResult) {
			callback(saveProjectError, saveProjectResult);
		});
	}

	this.listAllProjects = function(searchParam, callback) {
		dataManager.findAll('projects', searchParam, function(findAllError, findAllResult) {
			if ((typeof findAllError !== "undefined") && (findAllError !== null)) {
				callback(findAllError, null);
			} else {
				async.filter(findAllResult, function(resultItem, partialCallback){
					partialCallback(resultItem !== null);
				}, function(finalResults){
					callback(null, finalResults);
				});
			}
			// callback(findAllError, findAllResult);
		});
	}

	this.listProjects = function(callback) {}

	this.updateProject = function(updateData, projectId, callback) {}

	this.deleteProject = function(projectId, callback) {}

	this.fetchProject = function(projectId, callback) {}
};