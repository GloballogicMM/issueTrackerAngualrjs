todo.controller('todoCtrl', function TodoCtrl($scope, dialog, todoStorage, users) {
    var oldTitle, oldDesc, oldDate, oldUsers, oldStatus, oldTime;

    $scope.todos = todoStorage.get();
    $scope.history = $scope.todos[$scope.todos.indexOf(history)];
    $scope.users = users;
    $scope.editing = false;

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo,
            newWeek;
        if (!newTodo.length) {
            return;
        }
        newWeek = Date.parse($scope.newDate).getWeek();
        $scope.todos.push({
            title: newTodo,
            desc: $scope.newDesc,
            date: Date.parse($scope.newDate),
            time: $scope.newTime,
            user: $scope.newUsers,
            week: newWeek,
            status: 0
        });
        $scope.todos.sort(function(a,b) { return a.week - b.week;});
        todoStorage.put($scope.todos);
        $scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
        $scope.newUsers = '';
        $scope.newTime = '';
        dialog.close();
    };
});
