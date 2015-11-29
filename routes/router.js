//routes
var login = require('./../controllers/login');
var signup = require('./../controllers/signup');
var data = require('./../controllers/data');

module.exports = function(router){

	router.route('/session')
		.get(login.defaultLog);

	router.route('/unapproved')
		.get(data.unapproved);

	router.route('/approve')
		.post(data.approve);

	router.route('/all')
		.get(data.all);

	router.route('/adminLogin')
		.get(login.defaultLog)
		.post(login.adminLog);

	router.route('/regularLogin')
		.get(login.defaultLog)
		.post(login.regularLog);

  router.route('/adminSignup')
		.get(signup.defaultSign)
		.post(signup.createAdmin);

	router.route('/regularSignup')
		.get(signup.defaultSign)
		.post(signup.createRegular);

	router.route('/logout')
		.get(login.logout);


	return router;
};
