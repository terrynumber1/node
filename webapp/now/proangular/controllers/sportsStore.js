angular.module("sportsStore")
    .constant("dataUrl", "http://ubuntu14:5500/products") //http://ubuntu14:5500/test404error
    .controller("sportsStoreCtrl", function($scope, $http, dataUrl) {

        $scope.data = {};

        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
            })
            .error(function (data, status, headers, config) {
                $scope.data.error = {};
                $scope.data.error.data = data;
                $scope.data.error.status = status;
            });
    });