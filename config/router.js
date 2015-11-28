var login = require('./../controllers/login');
var signup = require('./../controllers/signup');

module.exports = function(router){

	router.route('/adminLogin')
		.get(login.defaultLog)
		.post(login.adminLog);

	router.route('/regularLogin')
		.get(login.defaultLog)
		.post(login.regularLog);

  router.route('/adminSignup')
		.get(function(req,res){res.redirect('/')})
		.post(signup.createAdmin);

	router.route('/regularSignup')
		.get(function(req,res){res.redirect('/')})
		.post(signup.createRegular);

	router.route('/logout')
		.get(login.logout);

	return router;
};
