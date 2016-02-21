/**
* Institute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {	
	connection: 'cursaMysqlServer',
	autoCreatedAt : false,
	autoUpdatedAt : false,

	attributes: {
		i_id : {
			type:"string",
			primaryKey:true
		},
		i_name : {
			type:"string",
			required: true,
		},
		i_email : {
			type:"string"
		},
		i_telephone : {
			type:"string"
		},
		i_www : {
			type:"string"
		},
		i_info : {
			type:"string"
		},
		i_county : {
			type:"string"
		}
	}
};

