/**
 * InstituteController
 *
 * @description :: Server-side logic for managing institutes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// display institute info
	show : function (req, res, next) {
		Institute.findOne({i_id : req.param('id')}, function foundInstitute(err, institute){
			// if error return error
			if (err) {
				res.serverError("ERR_CODE_INSC001 - Occurred " + new Date().toLocaleString());		
			}
			if (!institute) {
				res.serverError("ERR_CODE_INSC002 - Occurred " + new Date().toLocaleString());
			}
			//pass institute to view
			res.view({
				institute: institute
			});
		});
	},

	// list all institutes
	index : function (req, res, next) {
		Institute.find(function foundInstitutes (err, institutes) {
			// if error return error
			if (err) {
				console.log(err);
				res.serverError("ERR_CODE_INSC101 - Occurred " + new Date().toLocaleString());		
			}
			if (!institutes) {
				res.serverError("ERR_CODE_INSC102 - Occurred " + new Date().toLocaleString());
			}
			//pass institute to view
			res.view({
				institutes: institutes
			});
		})
	}
};

