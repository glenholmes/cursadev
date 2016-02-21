/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// display course info
	show : function (req, res, next) {
		Course.findOne({c_id : req.param('id')}, function foundCourse(err, course){
			// if error return error
			if (err) {
				res.serverError("ERR_CODE_COUC001 - Occurred " + new Date().toLocaleString());		
			}
			if (!course) {
				res.serverError("ERR_CODE_COUC002 - Occurred " + new Date().toLocaleString());
			}
			//pass course to view
			res.view({
				course: course
			});
		});
	},

	// list all courses
	index : function (req, res, next) {
		Course.query("SELECT * FROM course WHERE c_id NOT IN (SELECT course_c_id as c_id from course_occupation);",function foundCourses (err, courses) {
			// if error return error
			if (err) {
				console.log(err);
				res.serverError("ERR_CODE_COUC102 - Occurred " + new Date().toLocaleString());		
			}
			if (!courses) {
				res.serverError("ERR_CODE_COUC102 - Occurred " + new Date().toLocaleString());
			}
			//pass course to view
			res.view({
				courses: courses
			});
		})
	},

	// Show course occupations and maintenance
	maintain_occupations : function (req, res, next) {
		Course.findOne({c_id : req.param('id')}, function foundCourse(err, course){
			// if error return error
			if (err) {
				console.log(err);
				res.serverError("ERR_CODE_COUC201 - Occurred " + new Date().toLocaleString());		
			}
			if (!course) {
				res.serverError("ERR_CODE_COUC202 - Occurred " + new Date().toLocaleString());
			}

			Occupation.find( function foundOccupations (err, occupations) {
				// if error return error
				if (err) {
					console.log(err);
					res.serverError("ERR_CODE_COUC202 - Occurred " + new Date().toLocaleString());		
				}
				if (!occupations) {
					res.serverError("ERR_CODE_COUC203 - Occurred " + new Date().toLocaleString());
				}

				Occupation.query("SELECT occupation_o_id FROM course_occupation WHERE course_c_id = '"+req.param('id')+"';",
					function (err, soccupations) {
					// if error return error
					if (err) {
						console.log(err);
						res.serverError("ERR_CODE_INSC204 - Occurred " + new Date().toLocaleString());		
					}

					var courseData = {
						course : course,
						occupations : occupations,
						soccupations : soccupations
					}

					res.view({
						courseData : courseData
					});
				});
			});
		});
	},

	// update occupations from maintenance view
	update_occupations : function (req, res, next) {
		var c_id = req.param('c_id')
		var occupations = req.param('occupation');
		console.log(req.params.all());

		console.log("############ #############");
		console.log(occupations);
		for (var i = 0; i < occupations.length; i++) {

			Course.query("INSERT INTO course_occupation VALUES ('"+occupations[i]+"','"+c_id+"');",
				function updatedOccupations (err) {
				if (err) {
					console.log(err);
					res.serverError("ERR_CODE_COUC301 - Occurred " + new Date().toLocaleString());
				};
			});			
		};
		res.redirect("/course");
	},
};

