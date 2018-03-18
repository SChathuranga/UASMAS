var register = require('../config/passport');

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

// app/routes.js
module.exports = function (app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function (req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	//Institute reg
	app.get('/institute', function (req, res) {
		res.render('institute.ejs', { message: req.flash('signupMessage') });
	});

	//doctor registration
	app.get('/regdoctor', function (req, res) {
		res.render('regdoctor.ejs', { message: req.flash('registerDoctorMessage') });
	});

	//thankyou
	app.get('/thankyou', function (req, res) {
		res.render('thankyou.ejs', { message: req.flash('signupMessage') });
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function (req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/homepage', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),
		function (req, res) {
			// console.log("hello");
			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', function (req, res) {

		var username = req.body.username;
		var password = req.body.password;
		var name = req.body.username;
		var address = req.body.address;
		var tele = req.body.tele;
		var email = req.body.email;
		var regdate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
		var data = {
			"Data": ""
		};

		connection.query("SELECT * from user WHERE username = ?", [username], function (err, rows, fields) {
			//if (rows.length != 0) {
			if (false) {
				data["Data"] = rows;
				res.json(data);
			} else {
				var insertQuery = "INSERT INTO user (`iduser`,`password`,`name`,`address`,`tele`,`email`,`regDate`) values (?,?,?,?,?,?,?)";
				var insertlogindata = "INSERT INTO login ( username, password) values (?,?)";


				connection.query(insertQuery, [username, password, name, address, tele, email, regdate], function (err, rows, fields) {
					if (rows.length != 0) {
						//data["Data"] = rows;

						//res.json(data);
					} else {
						data["Data"] = 'No data Found..';
						//res.json(data);
					}
				});
				//insert login data
				connection.query(insertlogindata, [username, password], function (err, rows, fields) {
					if (rows.length != 0) {
						//data["Data"] = rows;

						//res.json(data);
					} else {
						data["Data"] = 'No data Found..';
						//res.json(data);
					}
				});
				//end
				res.redirect('/login');
				//res.json(data);
			}
		});
		// res.send(user_id + ' ' + token + ' ' + geo);
	});

	//Center registration
	app.get('/center', function (req, res) {
		// render the page and pass in any flash data if it exists
		res.render('institute.ejs', { message: req.flash('institutemessage') });
	});
	//************* */
	app.post('/center', function (req, res) {

		var centername = req.body.centername;
		var address = req.body.address;
		var tele = req.body.tele;

		var data = {
			"Data": ""
		};

		connection.query("SELECT * from channelling_center WHERE centername = ?", [centername], function (err, rows, fields) {
			if (rows.length != 0) {
				data["Data"] = rows;
				res.json(data);
			} else {
				var insertQuery = "INSERT INTO channelling_center (centername,address,telno) values (?,?,?)";

				connection.query(insertQuery, [centername, address, tele], function (err, rows, fields) {
					if (rows.length != 0) {
						//data["Data"] = rows;

						//res.json(data);
					} else {
						data["Data"] = 'No data Found..';
						//res.json(data);
					}
				});
				//end
				res.redirect('/thankyou');
				//res.json(data);
			}
		});
		// res.send(user_id + ' ' + token + ' ' + geo);
	});

	app.post('/regdoctor', function (req, res) {

		var doctorname = req.body.doctorname;
		var address = req.body.address;
		var tele = req.body.tele;
		var email = req.body.email;
		var speciality = req.body.speciality;
		var docregid = req.body.docregid;

		var data = {
			"Data": ""
		};

		connection.query("SELECT * from doctor WHERE name = ?", [doctorname], function (err, rows, fields) {
			if (rows.length != 0) {
				data["Data"] = rows;
				res.json(data);
			} else {
				var insertQuery = "INSERT INTO doctor (name,address,tele,email,speciality,regid) values (?,?,?,?,?,?)";

				connection.query(insertQuery, [doctorname, address, tele, email, speciality, docregid], function (err, rows, fields) {
					if (rows.length != 0) {
						//data["Data"] = rows;

						//res.json(data);
					} else {
						data["Data"] = 'No data Found..';
						//res.json(data);
					}
				});
				//end
				res.redirect('/thankyou');
				//res.json(data);
			}
		});
		// res.send(user_id + ' ' + token + ' ' + geo);
	});


































	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// HOMEPAGE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/homepage', isLoggedIn, function (req, res) {
		res.render('homepage.ejs', {
			user: req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
