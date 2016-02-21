/**
* Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {	
	connection: 'cursaMysqlServer',
	autoCreatedAt : false,
	autoUpdatedAt : false,

	attributes: {
		c_id : {
			type: "string",
			primaryKey: true
		},
		c_name : {
			type: "string",
			required: true
		},
		c_desc : {
			type : "string"
		},
		c_type : {
			type : "string"
		},
		c_www : {
			type : "string"
		},
		c_cao : {
			type : "integer"
		},
		c_minhigher : {
			type : "integer"
		},
		institute_i_id : {
			type: "string"
		}
	}
};

