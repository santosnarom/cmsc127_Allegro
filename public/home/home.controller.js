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
			 console.log(data.date_approved);
				if(data.date_approved != null && $scope.username != undefined && $scope.admin_id == undefined){
					$window.location.href = "#/home";
				}
				else if($scope.admin_id != undefined){ $window.location.href = "#/admin-home";}

		 });

		 $scope.ViewPlaylist = function(){
					HomeService.ViewPlaylist()
					.then(function(data){
						if($scope.playlists == '' || $scope.playlists == undefined)
						$scope.playlists = data;
						else $scope.playlists = [];
					});
		 }

		 $scope.AddToPlaylist = function(song, selectedPlaylist){
					HomeService.AddToPlaylist(song, selectedPlaylist)
					.then(function(data){
						$scope.content = data;
					});
		 }



		 $scope.DeletePlaylist = function(number, playlist){
					HomeService.DeletePlaylist(number)
					.then(function(data){
						var list = $scope.playlists;
						list.splice(list.indexOf(playlist), 1);
					});
		 }

		 $scope.Search = function(){
					HomeService.Search($scope.query)
					.then(function(data){
						$scope.results = data;
					});
		 }

		 $scope.CreatePlaylist = function(username){
					HomeService.CreatePlaylist($scope.playlist, username)
					.then(function(data){
						$scope.playlists = data;
						$scope.playlist = "";
					});
		 }

		 $scope.RemoveFromPlaylist = function(obj,song){
					HomeService.RemoveFromPlaylist(song)
					.then(function(data){
						var con = $scope.content;
						con.splice(con.indexOf(obj), 1);
					});
		 }

		 $scope.ViewTopSongs = function(){
					HomeService.GetTopSongs()
					.then(function(data){
						if($scope.tsongs == '' || $scope.tsongs == undefined)
						$scope.tsongs = data;
						else $scope.tsongs = [];
					});
		 }

		 $scope.ViewPlaylistContent = function(playlist){
					HomeService.ViewPlaylistContent(playlist)
					.then(function(data){
						if($scope.content == '' || $scope.content == undefined)
						$scope.content = data;
						else $scope.content = [];
					});
		 }

		 $scope.ViewSongs = function(playlist_number){
					HomeService.GetSongs()
					.then(function(data){
						if($scope.songs == '' || $scope.songs == undefined){
							$scope.songs = data;
							$scope.selectedPlaylist = playlist_number;
						}
						else $scope.songs = [];
					});
		 }

		 $scope.ViewAddSongs = function(){
					HomeService.GetSongs()
					.then(function(data){
						if($scope.song == '' || $scope.song == undefined)
						$scope.song = data;
						else $scope.song = [];
					});
		 }

		 $scope.Upload = function(){
					HomeService.UploadFile($scope.upload.music)
					.then(function(data){
						console.log('File Uploaded');
					});
		 }


		 $scope.AdminSignup = function(){
					HomeService.AdminSignup($scope.admin)
					.then(function(data){
						$window.location.href = "/";
					});
		 }

		 $scope.RegularSignup = function(){
					HomeService.RegularSignup($scope.regular)
					.then(function(data){
						$window.location.href = "/";
					});
		 }

		 $scope.ViewUsers = function(){
					HomeService.ViewUsers()
					.then(function(data){
						if($scope.allusers == '' || $scope.allusers == undefined)
						$scope.allusers = data;
						else $scope.allusers = [];
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
						if($scope.unapproved == '' || $scope.unapproved == undefined)
						$scope.unapproved = data;
						else $scope.unapproved = [];
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
						$scope.admin_id = data.admin_id;
				 		$scope.username = data.username;
						if($scope.username != undefined){
							$scope.log = true;
							$window.location.href = "#/admin-home";
						}
						else $window.location.href = "/";
					});
		 }

		 $scope.UserHome = function(){
					HomeService.InitReg($scope.regular)
					.then(function(data){
						$scope.username = data.username;
						if($scope.username != undefined && data.date_approved != null)
							$window.location.href = "#/home";
						else $window.location.href = "/";
					});
		 }

	}

})();
