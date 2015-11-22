var login = require('./../controllers/login');
var signup = require('./../controllers/signup');

module.exports = function(router){

	router.route('/adminLogin')
		.get(login.defaultLog)
		.post(login.adminLog);

  router.route('/signup')
		.get(function(req,res){res.send('LOL sign up pa more')})
		.post(signup.create);

		router.route('/logout')
			.get(login.logout);

	return router;
};
