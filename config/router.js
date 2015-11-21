var login = require('./../controllers/login');
var signup = require('./../controllers/signup');

module.exports = function(router){

	router.route('/adminLogin')
		.get(login.adminLog);

  router.route('/signup')
		.post(signup.create);

	return router;
};
