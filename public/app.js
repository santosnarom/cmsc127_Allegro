angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.username = {};

    // Get all todos
    $http.get('/regularLogin')
        .success(function(data) {
            $scope.username = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});
