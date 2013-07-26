'use-strict';

var localNano = require('nano')('http://localhost:5984');
var remoteProjectsDB = require('nano')('http://nodejitsudb19993362.iriscouch.com:5984');
var remoteUsersDB = require('nano')('http://nodejitsudb4713561108.iriscouch.com:5984');
var async = require('async');

exports.DataManager = (function(){
	var _dataManagerInstance;

	function _LocalDataManager(dbLocation) {
		// private methods and variables should go here
		var dbMode = dbLocation;

		function projectListIterator(curProject, projectIteratorCallback) {
			getProjectsDB().get(curProject.project.key, function(curProjectError, curProjectResult) {
				if ((typeof curProjectError !== "undefined") && (curProjectError !== null)) {
					projectIteratorCallback(curProjectError, null);
				} else{ 
					if ((typeof curProject.searchKey !== "undefined") && (curProject.searchKey !== null) && (curProject.searchKey !== 'undefined')) {
						if (curProjectResult.title.toLowerCase().indexOf(curProject.searchKey.toLowerCase()) !== -1) {
							projectIteratorCallback(null, curProjectResult);
						} else {
							projectIteratorCallback(null, null);
						}
					} else{
						projectIteratorCallback(null, curProjectResult);
					};
				};
			});
		}

		function getUsersDB() {
			if ((typeof dbMode !== "undefined") && (dbMode !== null)) {
				var localUsersdb = localNano.use('users');
				return localUsersdb;
			} else{
				var remUsersDB = remoteUsersDB.use('users');
				return remUsersDB;
			};
		}

		function getProjectsDB() {
			if ((typeof dbMode !== "undefined") && (dbMode !== null)) {
				var localUsersdb = localNano.use('projects');
				return localUsersdb;
			} else{
				var remProjectsDB = remoteProjectsDB.use('projects');
				return remProjectsDB;
			};
		}

		function findUser(userDocName, callback) {
			getUsersDB().get(userDocName, function(userDocError, userDocBody) {
				callback(userDocError, userDocBody);
			});
		}

		function findProject(projectDocName, callback) {
			getProjectsDB().get(projectDocName, function(projectDocError, projectDocBody){
				callback(projectDocError, projectDocBody);
			});
		}

		function findAllProjects(searchParam, callback) {
			getProjectsDB().list(function(projectListError, projectList) {
				if ((typeof projectListError!== "undefined") && (projectListError !== null)) {
					callback(projectListError, null);
				} else{
					var augmentedProjectList = projectList.rows.map(function(projectItem) {
						return {
							project: projectItem,
							searchKey: searchParam
						};
					});
					async.map(augmentedProjectList , projectListIterator, function(allProjectsError, allProjects){
						callback(allProjectsError, allProjects);
					});
				};
			});
		}

		function saveUser(userDocName, userData, callback) {
			getUsersDB().insert(userData, userDocName, function(userDocError, userDocBody) {
				callback(userDocError, userDocBody);
			});
		}

		function saveProject(projectDocName, projectData, callback) {
			getProjectsDB().insert(projectData, projectDocName, function(projectDocError, projectDocBody){
				callback(projectDocError, projectDocBody);
			});
		}

		function removeProject(projectDocName, revisionValue, callback) {
			getProjectsDB().destroy(projectDocName, revisionValue, function(projectDeletionError, projectDeletionResult){
				callback(projectDeletionError, projectDeletionResult);
			});
		}

		function updateProject(projectDocName, revisionValue, projectData, callback) {
			getProjectsDB().insert(projectData, projectDocName, function(projectUpdateError, projectUpdateResult) {
				callback(projectUpdateError, projectUpdateResult);
			});
		}

		return {
			find: function(dbId, docName, callback) {
				switch(dbId) {
					case "users":
						findUser(docName, callback);
						break;
					case "projects":
						findProject(docName, callback);
						break;
				}
			},

			save: function(dbId, docName, docData, callback) {
				switch(dbId) {
					case "users":
						saveUser(docName, docData, callback);
						break;
					case "projects":
						saveProject(docName, docData, callback);
						break;
				}
			},

			findAll: function(dbId, searchParam, callback) {
				switch(dbId) {
					case "projects":
						findAllProjects(searchParam, callback);
						break;
				}
			},

			remove: function(dbId, docName, revisionValue, callback) {
				switch(dbId) {
					case "projects":
						removeProject(docName, revisionValue, callback);
						break;
				}
			}, 

			update: function(dbId, docName, revisionValue, docData, callback) {
				switch(dbId) {
					case "projects":
						updateProject(docName, revisionValue, docData, callback);
						break;
				}
			},
			
			createDataBases: function(callback) {
				if ((typeof dbMode !== "undefined") && (dbMode !== null)) {
					var localDBCreate = {
						usersDbCreate: function(usersPartialCallback) {
							localNano.db.create('users', function(usersDbError, usersDbBody){
								usersPartialCallback(usersDbError, usersDbBody);
							});
						},
						projectsDbCreate: function(projectsPartialCallback) {
							localNano.db.create('projects', function(projectsDbError, projectsDbBody){
								projectsPartialCallback(projectsDbError, projectsDbBody);
							});
						}
					};
					async.series(localDBCreate, function(dbCreateError, dbCreateResult){
						callback(dbCreateError);
					});
				} else{
					var remoteDBCreate = {
						usersDbCreate: function(usersPartialCallback) {
							remoteUsersDB.db.create('users', function(usersDbError, usersDbBody){
								usersPartialCallback(usersDbError, usersDbBody);
							});
						},
						projectsDbCreate: function(projectsPartialCallback) {
							remoteProjectsDB.db.create('projects', function(projectsDbError, projectsDbBody){
								projectsPartialCallback(projectsDbError, projectsDbBody);
							});
						}
					};
					async.series(remoteDBCreate, function(dbCreateError, dbCreateResult){
						callback(dbCreateError);
					});
				};
			},
		};
	};

	return {
		// get the singleton instance if one exists or create it
		getDataManagerInstance: function(dbLocation) {
			if ( !_dataManagerInstance ) {
				_dataManagerInstance = _LocalDataManager(dbLocation);
				_dataManagerInstance.createDataBases(function(createDBError, createDBResult) {
					if ((typeof createDBError !== "undefined") && (createDBError !== null)) {
						console.log("The databases already exist. New creation failed!");
					} else{
						console.log("Databases created");
					};
				});
			}
			return _dataManagerInstance;
		}
	};
})();