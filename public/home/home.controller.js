'use strict';

(function(){
	angular
		.module("myApp")
		.controller("HomeCtrl", HomeCtrl);

	HomeCtrl.$inject = ["$scope","HomeService"];

	function HomeCtrl($scope, HomeService){
		 $scope.name = "Narom";

	}

})();
