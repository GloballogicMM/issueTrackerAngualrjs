todo.controller("historyViewCtrl", function($scope, $routeParams, todoStorage) {
    var todos = todoStorage.get();
    $scope.history = todos[$routeParams.id];
});