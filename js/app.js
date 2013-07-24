var todo = angular.module('todo', ['ui.bootstrap']);

todo.directive('createcontent', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/createContent.html'
    }
});

todo.directive('asidemy', function(){
    return {
        restrict:'E',
        transclude: true,
        templateUrl:'partials/content.html'
    }
});
