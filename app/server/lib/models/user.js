'use strict';

var PasswordHandler = require('../util/password-handler').PasswordHandler;
var DataManager = require('../util/data-manager').DataManager;

module.exports.User = function(extraParam) {
	this.passwordHandler = new PasswordHandler();
	var dataManager = DataManager.getDataManagerInstance(extraParam);

	var prepareSessionData = function(userData, callback){
		var firstName;
		if (userData.hasOwnProperty("firstname")) {
			firstName = userData.firstname.charAt(0).toUpperCase() + userData.firstname.slice(1);
		}
		var lastName;

		if (userData.hasOwnProperty("lastname")) {
			lastName = userData.lastname.toUpperCase();
		}

		var fullName;
		if (((typeof firstName !== "undefined") && (firstName !== null)) && ((typeof lastName !== "undefined") && (lastName !== null))) {
			fullName = firstName + " " + lastName;
		}

		var sessionData = {
			username: userData.username,
			isDeveloper: userData.isDeveloper,
			fullName: fullName
		};
		callback(null, sessionData);
	}

	this.authenticate = function(username, password, callback) {
		var that = this;
		dataManager.find('users', username, function(userDataError, userData) {
			if ((typeof userDataError !== "undefined") && (userDataError !== null)) {
				var unknownUsernameError = new Error("Username " + username + " not in Db");
				callback(unknownUsernameError, null);
			} else{
				var userPassword = userData.password;
				that.passwordHandler.verifyPassword(password, userPassword, function(passwordError, compareResult) {
					if ((typeof passwordError !== "undefined") && (passwordError !== null)) {
						callback(passwordError, null);
					} else{
						if (compareResult === true) {
							userData.username = username;
							prepareSessionData(userData, function(sessionDataError, sessionData){
								callback(sessionDataError, sessionData);
							});
						} else {
							var authenticationFailedError = new Error("Authentication failed for user " + username);
							callback(authenticationFailedError, null);
						}
					};
				});
			};
		});
	}

	this.createUser = function(userData, callback) {
		this.passwordHandler.confirmAndEncryptPassword(userData.password, userData.confirmPassword, function(passwordError, encryptedPassword){
			if ((typeof passwordError !== "undefined") && (passwordError !== null)) {
				callback(passwordError, null);
			} else{
				var newUserData = {
					firstname: userData.firstname,
					lastname: userData.lastname,
					isDeveloper: userData.isDeveloper,
					emailAddress: userData.emailAddress,
					password: encryptedPassword
				};
				dataManager.save('users', userData.username, newUserData, function(saveUserError, saveUserResult){
					if ((typeof saveUserError !== "undefined") && (saveUserError !== null)) {
						callback(saveUserError, null);
					} else{
						prepareSessionData(userData, function(sessionDataError, sessionData){
							callback(sessionDataError, sessionData);
						});
					};
				});
			};
		});
	}
};