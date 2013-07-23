var todo = angular.module('todo', []);

todo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/#new', {templateUrl: 'partials/new.html', controller: 'todoCtrl'});
    $routeProvider.when('/', {templateUrl:'partials/content.htm', controller:'asideCtrl'})
    $routeProvider.otherwise({redirectTo: '/'});
}]);

todo.directive('todo', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/new.html'
    }
});
todo.directive('asidemy', function(){
    return {
        restrict:'E',
        transclude: true,
        templateUrl:'partials/content.html'
    }
});
