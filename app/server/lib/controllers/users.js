'use strict';

var User = require('../models/user').User;

module.exports.UsersController = function(extraParam) {
	this.user = new User(extraParam);

	this.authenticate = function(authenticationData, callback) {
		this.user.authenticate(authenticationData.username, authenticationData.password, function(authenticationError, authenticationResult) {
			callback(authenticationError, authenticationResult);
		});
	}

	this.createUser = function(userData, callback) {
		this.user.createUser(userData, function(createUserError, createUserResult) {
			callback(createUserError, createUserResult);
		});
	}
};