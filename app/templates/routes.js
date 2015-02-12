var passport = require('passport');

module.exports = function(app){
	
	// GET home page.
	
	app.get('/', function(req, res) {
		res.render('login.ejs', { 
			message: req.flash('loginMessage') 
		});
	});

	// process the login form
	app.post('/', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/index', isLoggedIn, function(req, res){
	  res.render('index.ejs', {
	  	title: 'App Educacion',
	  });
	});

}


// funcion que actua como mediadora de autentificacion para cada ruta

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}