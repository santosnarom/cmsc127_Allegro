//routes
var login = require('./../controllers/login');
var signup = require('./../controllers/signup');
var data = require('./../controllers/data');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

module.exports = function(router){

	router.route('/playlist-delete')
		.post(data.deletePlaylist);

	router.route('/playlist')
		.get(data.viewPlaylist);

	router.route('/remove-song')
		.post(data.removeFromPlaylist);

	router.route('/addplaylist-song')
		.post(data.addToPlaylist);

	router.route('/view-content')
		.post(data.viewPlaylistContent);

	router.route('/create-playlist')
		.post(data.createPlaylist);

	router.route('/search/:id')
		.get(data.search);

	router.route('/songs-top')
		.get(data.getTopSongs);

	router.route('/songs')
		.get(data.getSongs);

	router.route('/session')
		.get(login.defaultLog);

	router.route('/unapproved')
		.get(data.unapproved);

	router.route('/approve')
		.post(data.approve);

	router.route('/upload')
		.post(upload.single('music'), data.upload);

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
