/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'cursaMysqlServer',
	autoPK: false,

	attributes: {
		u_id : {
			type: "integer",
			autoIncrement : true,
			primaryKey : true
		},
		u_county: {
			type: 'string'
		},
		u_cao: {
			type: 'integer'
		},
		u_higher: {
			type: 'integer'
		}
	}
};

