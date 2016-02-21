/**
* Occupation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {	
	connection: 'cursaMysqlServer',
	autoCreatedAt : false,
	autoUpdatedAt : false,

	attributes: {
		o_id : {
			type:"integer",
			primaryKey:true
		},
		o_name : {
			type:"string"
		},
		o_level : {
			type: "integer"
		}
	}
};

