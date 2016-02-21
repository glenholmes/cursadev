/**
 * RecommendController
 *
 * @description :: Server-side logic for managing recommends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	// clean data and create database insert
	make : function (req, res, next) {
		// display what was entered by user
		console.log(req.params.all());

		// load javascript variables with params
		var riasecs = req.param('riasec_letter') || -1;
		var subjects = req.param('subject') || -1;
		var grades = req.param('grade') || -1;
		var levels = req.param('level') || -1;
		var county = req.param('u_county') || -1;

		// Simple error check against -1
		if (riasecs == -1 || subjects == -1 || grades == -1 || levels == -1 || county == -1) {
			res.serverError("ERR_CODE_RECC001 - Occurred " + new Date().toLocaleString());			
		} else {

			// riasec counter
			var riasecResult = occuranceCounter(riasecs);

			// calculate CAO points
			var caoBeforeBonus = eval(grades.join('+'));

			// check if higher maths is taken
			var caoAfterBonus;
			var mathIndex = subjects.indexOf("Mathematics");
			if(mathIndex == -1 || levels[mathIndex] == 2) {
				// console.log(levels[mathIndex]);
				caoAfterBonus = caoBeforeBonus;
			} else {
				// console.log(levels[mathIndex]);
				caoAfterBonus = caoBeforeBonus + 20;
			}

			// count numberr of ord subjects
			var ordCount;
			ordCount = 0;
			for (var i = 0; i < levels.length; i++) {
				if(levels[i] == 2) ordCount += 1;
			};

			// find number of higher subjects taken
			var hiCount = 6 - ordCount;

			// caoTotal finale
			var caoTotal;
			caoTotal = caoAfterBonus - (ordCount * 40 );

			User.query("select * from RIASEC where R_ID = '"+riasecResult[0]+"' or R_ID = '"+riasecResult[1]+"';", function returnedRiasecs(err, riasecs){
				if(err){
					console.log(err);
					res.serverError("ERR_CODE_RECC102 - Occurred " + new Date().toLocaleString());
				}
				if(!riasecs){
					res.serverError("ERR_CODE_RECC103 - Occurred " + new Date().toLocaleString());
				}

				User.query("select count(*) as total from course where course.c_cao < "+caoTotal+";", function coursesAvailable(err, courseAvail) {
					if(err){
						console.log(err);
						res.serverError("ERR_CODE_RECC102 - Occurred " + new Date().toLocaleString());
					}
					if(!courseAvail){
						res.serverError("ERR_CODE_RECC103 - Occurred " + new Date().toLocaleString());
					}

					User.query("select count(*) as total from course join institute on institute.i_id = course.institute_i_id where institute.i_county like '"+county+"' and course.c_cao < "+caoTotal+";", function coursesAvailable1(err, courseAvail1) {
						if(err){
							console.log(err);
							res.serverError("ERR_CODE_RECC102 - Occurred " + new Date().toLocaleString());
						}
						if(!courseAvail1){
							res.serverError("ERR_CODE_RECC103 - Occurred " + new Date().toLocaleString());
						}

						User.query("select occupation.o_name from occupation "+
							"join (select occupation_o_id as oid, count(*) as tot from occupation_riasec "+
							"where riasec_r_id = '"+riasecResult[0]+"' or riasec_r_id = '"+riasecResult[1]+"' group by occupation_o_id) as a "+
							"on a.oid = occupation.o_id where a.tot = 2 ORDER BY RAND() LIMIT 5;", function occuMatch(err, occupations) {
							if(err){
								console.log(err);
								res.serverError("ERR_CODE_RECC102 - Occurred " + new Date().toLocaleString());
							}
							if(!occupations){
								res.serverError("ERR_CODE_RECC103 - Occurred " + new Date().toLocaleString());
							}

							User.query("select distinct course_occupation.course_c_id as id, course.c_name as cname , course.c_cao as cao, "+
									"institute.i_id as iid, institute.i_name as iname from occupation join course_occupation on occupation.o_id = "+
									"course_occupation.occupation_o_id join (select occupation_o_id as oid, "+
									"count(*) as tot from occupation_riasec where riasec_r_id= '"+riasecResult[0]+"' or riasec_r_id "+
									"= '"+riasecResult[1]+"' group by occupation_o_id) as a on a.oid = occupation.o_id join course "+
									"on course.c_id = course_occupation.course_c_id join institute on course.institute_i_id = "+
									"institute.i_id where a.tot = 2 and institute.i_county = '"+county+"' and course.c_cao < "+caoTotal+" ORDER BY cao DESC LIMIT 3"
								, function courseMatch(err, courses) {
								if(err){
									console.log(err);
									res.serverError("ERR_CODE_RECC102 - Occurred " + new Date().toLocaleString());
								}
								if(!courses){
									res.serverError("ERR_CODE_RECC103 - Occurred " + new Date().toLocaleString());
								}

								// returning all information to the view
								res.view({
									riasecs : riasecs,
									caoscore : caoTotal,
									courseNum : courseAvail[0].total,
									courseNum1 : courseAvail1[0].total,
									county : county,
									occupations : occupations,
									courses : courses			
								});
							});
						});

					});
				});
			});
		}
	}
};

// function to count occurances and provide two most occurring values
function occuranceCounter(arr) {
    var a = [], b = [], c = [], prev;
    // sort array
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    // calculate two most pccuring values
    var posMax = b.indexOf(Math.max.apply(Math, b));
    c.push(a[posMax]);
    b[posMax] = 0;
    posMax = b.indexOf(Math.max.apply(Math, b));
    c.push(a[posMax]);

    return c;
}

