'use-strict';

var nano = require('nano')('http://localhost:5984');
var async = require('async');

exports.DataManager = (function(){
	var _dataManagerInstance;

	function _LocalDataManager() {
		// private methods and variables should go here

		function projectListIterator(curProject, projectIteratorCallback) {
			var projectsDb1 = nano.use('projects');
			projectsDb1.get(curProject.project.key, function(curProjectError, curProjectResult) {
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

		function findUser(userDocName, callback) {
			var usersDb = nano.use('users');
			usersDb.get(userDocName, function(userDocError, userDocBody) {
				callback(userDocError, userDocBody);
			});
		}

		function findProject(projectDocName, callback) {
			var projectsDb = nano.use('projects');
			projectsDb.get(projectDocName, function(projectDocError, projectDocBody){
				callback(projectDocError, projectDocBody);
			});
		}

		function findAllProjects(searchParam, callback) {
			var projectsDb = nano.use('projects');
			projectsDb.list(function(projectListError, projectList) {
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
			var usersDb = nano.use('users');
			usersDb.insert(userData, userDocName, function(userDocError, userDocBody) {
				callback(userDocError, userDocBody);
			});
		}

		function saveProject(projectDocName, projectData, callback) {
			var projectsDb = nano.use('projects');
			projectsDb.insert(projectData, projectDocName, function(projectDocError, projectDocBody){
				callback(projectDocError, projectDocBody);
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
			
			createDataBases: function(callback) {
				var dbCreate = {
					usersDbCreate: function(usersPartialCallback) {
						nano.db.create('users', function(usersDbError, usersDbBody){
							usersPartialCallback(usersDbError, usersDbBody);
						});
					},
					projectsDbCreate: function(projectsPartialCallback) {
						nano.db.create('projects', function(projectsDbError, projectsDbBody){
							projectsPartialCallback(projectsDbError, projectsDbBody);
						});
					}
				};
				async.series(dbCreate, function(dbCreateError, dbCreateResult){
					callback(dbCreateError);
				});
			},

			updateData: function(data, itemId){},
			deleteData: function(){},
		};
	};

	return {
		// get the singleton instance if one exists or create it
		getDataManagerInstance: function() {
			if ( !_dataManagerInstance ) {
				_dataManagerInstance = _LocalDataManager();
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