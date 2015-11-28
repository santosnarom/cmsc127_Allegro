'use strict';

(function(){
	angular
		.module("myApp")
		.factory("HomeService", HomeService);

	HomeService.$inject = ["$http","$q"];

	function HomeService($http,$q){

		var service = {};

		service.init = init;

		function init(){
			
		}

	}

})();
