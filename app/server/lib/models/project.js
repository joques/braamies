'use strict';

var async = require('async');
var DataManager = require('../util/data-manager').DataManager;

module.exports.Project = function(extraParam) {
	var dataManager = DataManager.getDataManagerInstance(extraParam);
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

	this.getProject = function(projectId, callback) {
		dataManager.find('projects', projectId, function(projectItemError, projectItem) {
			callback(projectItemError, projectItem);
		});
	}

	this.deleteProject = function(projectId, revisionValue, callback){
		dataManager.remove('projects', projectId, revisionValue, function(deleteProjectError, deleteProjectResult){
			callback(deleteProjectError, deleteProjectResult);
		})
	}

	this.updateProject = function(projectId, revisionValue, projectDetails, callback) {
		dataManager.update('projects', projectId, revisionValue, projectDetails, function(projectUpdateError, projectUpdateREsult){
			callback(projectUpdateError, projectUpdateREsult);
		});
	}
};