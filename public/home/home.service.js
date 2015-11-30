'use strict';

(function(){
	angular
		.module("spotify")
		.factory("HomeService", HomeService);

	HomeService.$inject = ["$http","$q"];

	function HomeService($http,$q){
		var service = {};

		service.Init = Init;
		service.InitReg = InitReg;
		service.GetSession = GetSession;
		service.Logout = Logout;
		service.Unapproved = Unapproved;
		service.Approve = Approve;
		service.ViewUsers = ViewUsers;
		service.RegularSignup = RegularSignup;
		service.AdminSignup = AdminSignup;
		service.UploadFile = UploadFile;

		return service;

		function UploadFile(upload){
			var deferred = $q.defer();
			$http.post('/upload', upload)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't upload");
				});

			return deferred.promise;
		}

		function AdminSignup(admin){
			var deferred = $q.defer();
			$http.post('/AdminSignup', admin)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't create admin");
				});

			return deferred.promise;
		}

		function RegularSignup(regular){
			var deferred = $q.defer();
			$http.post('/regularSignup', regular)
				.success(function(data){
						console.log(data);
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't create user");
				});

			return deferred.promise;
		}

		function ViewUsers(){
			var deferred = $q.defer();
			$http.get('/all')
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't get user data");
				});

			return deferred.promise;
		}

		function Approve(username, admin){
			var deferred = $q.defer();
			var approve = {'username':username,'admin':admin};
			$http.post('/approve',approve)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't approved user data");
				});

			return deferred.promise;
		}

		function Unapproved(){
			var deferred = $q.defer();
			$http.get('/unapproved')
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't get unapproved users data");
				});

			return deferred.promise;
		}

		function Logout(){
			var deferred = $q.defer();
			$http.get('/logout')
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't get session data");
				});

			return deferred.promise;
		}

		function GetSession(){
			var deferred = $q.defer();
			$http.get('/session')
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't get session data");
				});

			return deferred.promise;
		}

		function Init(admin){
			var deferred = $q.defer();
			$http.post('/adminLogin',admin)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't login");
				});

			return deferred.promise;
		}

		function InitReg(regular){
			var deferred = $q.defer();
			$http.post('/regularLogin',regular)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject("Can't login");
				});

			return deferred.promise;
		}

	}

})();
