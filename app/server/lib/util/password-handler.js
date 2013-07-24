'use strict';

var bcrypt = require('bcrypt');

module.exports.PasswordHandler = function(){
	this.encryptPassword = function(clearText, callback) {
		bcrypt.genSalt(9, function(saltError, salt){
			if ((typeof saltError !== "undefined") && (saltError !== null)) {
				var saltGenerationError = new Error("Error generating salt for encryption");
				callback(saltGenerationError, null);
			} else{
				bcrypt.hash(clearText, salt, function(hashError, hashValue){
					if ((typeof hashError !== "undefined") && (hashError !== null)) {
						var hashGenerationError = new Error("Error hashing password");
						callback(hashGenerationError, null);
					} else{
						callback(null, hashValue);
					};
				});
			};
		});
	}

	this.verifyPassword = function(clearText, hashedPassword, callback) {
		bcrypt.compare(clearText, hashedPassword, function(compareError, compareResult) {
			if ((typeof compareError !== "undefined") && (compareError !== null)) {
				var passwordVerificationError = new Error("Password verification failed");
				callback(passwordVerificationError, null);
			} else{
				callback(null, compareResult);
			};
		});
	}

	this.confirmPassword = function(password, confirmPassword, callback) {
		if (password !== confirmPassword) {
			callback(null, false);
		} else{
			callback(null, true);
		};
	}

	this.confirmAndEncryptPassword = function(password, confirmPassword, callback) {
		var that = this;
		this.confirmPassword(password, confirmPassword, function(confirmError, confirmResult){
			if ((typeof confirmError !== "undefined") && (confirmError !== null)) {
				callback(confirmError, null);
			} else{
				if (confirmResult !== true) {
					var passwordMisMatchError = new Error("Password different from confirm password");
					callback(passwordMisMatchError, null);
				} else{
					that.encryptPassword(password, function(encryptError, encryptedPassword){
						callback(encryptError, encryptedPassword);
					});
				};
			};
		});
	}
};