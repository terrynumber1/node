var app = angular.module('app', []);

app.directive('hello', [function() {
    return {
        restrict: 'CEMA', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        template: '<span> <br> Hello </span>'
    }
}
]);