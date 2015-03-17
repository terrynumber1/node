angular.module("", [])
        .controller("productListCtrl", function($scope, $filter) {

        var selectCategory = null;

        $scope.selectCategory = function(newCategory) {
            selectedCategory = newCategory;
        };

        $scope.categoryFilterFn = function(product) {
            return selectCategory == null || product.category == selectCategory;
        };
    });