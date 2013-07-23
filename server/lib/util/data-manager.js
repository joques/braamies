'use-strict';
var nano = require('nano')('http://localhost:5984');

exports.DataManager = (function(){
	var _dataManagerInstance;

	function _LocalDataManager() {
		// private methods and variables should go here

		return {
			find: function(dbName, docName, callback) {
				var myDb = nano.use(dbName);
				myDb.get(docName, function(docError, docBody) {
					callback(docError, docBody);
				});
			},
			save: function(dbName, docName, docData, callback) {
				var myDb = nano.use(dbName);
				myDb.insert(docData, docName, function(docError, docBody){
					callback(docError, docBody);
				});
			},
			updateData: function(data, itemId){},
			deleteData: function(){},
			fetchAllData: function(){}
		};
	};

	return {
		// get the singleton instance if one exists or create it
		getDataManagerInstance: function() {
			if ( !_dataManagerInstance ) {
				_dataManagerInstance = _LocalDataManager();
			}
			return _dataManagerInstance;
		}
	};
})();