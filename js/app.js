var todo = angular.module('todo', []);
todo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/new', {templateUrl: 'partials/new.html', controller: 'todoCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

todo.directive('todo', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/new.html'
    }
});
