var todo = angular.module('todo', ['ui.bootstrap']);

todo.directive('createcontent', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/createContent.html'
    }
});

todo.directive('editcontent', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/editContent.html'
    }
});

todo.directive('viewcontent', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/viewContent.html'
    }
});

todo.directive('asidemy', function(){
    return {
        restrict:'E',
        transclude: true,
        templateUrl:'partials/content.html'
    }
});
