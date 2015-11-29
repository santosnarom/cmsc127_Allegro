'use strict';

(function(){

	angular
		.module("spotify",["ngRoute"])
		.config(config);

	config.$inject = ["$routeProvider"];

	function config($routeProvider){

    $routeProvider
		.when('/', {
      'controller' : 'HomeCtrl',
      'templateUrl' : 'home/login.view.html'
    })
		.when('/signup', {
			'controller' : 'HomeCtrl',
			'templateUrl' : 'home/signup.view.html'
		})
		.when('/admin-home', {
			'controller' : 'HomeCtrl',
			'templateUrl' : 'home/spotify-admin.view.html'
		})
		.when('/home', {
			'controller' : 'HomeCtrl',
			'templateUrl' : 'home/spotify-user.view.html'
		});
	}

})();
