	'use strict';

(function(){
	angular
		.module("spotify")
		.controller("HomeCtrl", HomeCtrl);

	HomeCtrl.$inject = ["$scope","HomeService", "$window"];

	function HomeCtrl($scope, HomeService, $window){

		$scope.username = "";

		HomeService.GetSession()
		 .then(function(data){
			 $scope.username = data.username;
			 $scope.admin_id = data.admin_id;
			  console.log('Username: ' + $scope.username);
				if($scope.username != undefined && $scope.admin_id == undefined)
					$window.location.href = "#/home";
				else if($scope.admin_id != undefined) $window.location.href = "#/admin-home";
		 });

		 $scope.AdminSignup = function(){
					HomeService.AdminSignup($scope.admin)
					.then(function(data){
						console.log('admin created');
						$window.location.href = "/";
					});
		 }

		 $scope.RegularSignup = function(){
					HomeService.RegularSignup($scope.regular)
					.then(function(data){
						console.log('user created');
						$window.location.href = "/";
					});
		 }

		 $scope.ViewUsers = function(){
					HomeService.ViewUsers()
					.then(function(data){
						$scope.allusers = data;
					});
		 }

		 $scope.Approve = function(user, username, admin){
					HomeService.Approve(username, admin)
					.then(function(data){
						var unapp = $scope.unapproved;
						unapp.splice(unapp.indexOf(user), 1);
					});
		 }

		 $scope.ViewUnapproved = function(){
					HomeService.Unapproved()
					.then(function(data){
						$scope.unapproved = data;
					});
		 }

		 $scope.Logout = function(){
					HomeService.Logout()
					.then(function(data){
						$window.location.href = "/";
					});
		 }

		 $scope.AdminHome = function(){
			  	HomeService.Init($scope.admin)
				 	.then(function(data){
						console.log(data);
						$scope.admin_id = data.admin_id;
				 		$scope.username = data.username;
						if($scope.username != undefined){
							$scope.log = true;
							console.log(data);
							$window.location.href = "#/admin-home";
						}
						else $window.location.href = "/";
					});
		 }

		 $scope.UserHome = function(){
					HomeService.InitReg($scope.regular)
					.then(function(data){
						$scope.username = data.username;
						if($scope.username != undefined)
							$window.location.href = "#/home";
						else $window.location.href = "/";
					});
		 }

	}

})();
