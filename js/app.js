var todo = angular.module('todo', ['ui.bootstrap']);

todo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/new', {templateUrl: 'partials/createContent.html', controller: 'todoCtrl'});
    $routeProvider.when('/', {templateUrl:'partials/content.htm', controller:'asideCtrl'})
    $routeProvider.otherwise({redirectTo: '/'});
}]);

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

todo.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});
