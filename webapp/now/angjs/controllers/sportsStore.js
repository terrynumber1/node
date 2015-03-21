angular.module("sportsStore")
    .constant("dataUrl", "http://ubuntu14:5500/products")
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {
        $scope.data = {};
        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
                console.log('SUCCESSSSS');
            })
            .error(function (error) {
                $scope.data.error = error;
                console.log('ERRROROROR');
            });
    });