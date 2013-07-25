todo.controller('todoCtrl', function TodoCtrl($scope, dialog, todoStorage, users) {

    $scope.todos = todoStorage.get();
    $scope.history = $scope.todos[$scope.todos.indexOf(history)];
    $scope.users = users;
    $scope.editing = false;

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo,
            newWeek;
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
        $scope.todos.sort(function(a,b) { return a.data - b.data;});
        todoStorage.put($scope.todos);
        $scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
        $scope.newUsers = '';
        $scope.newTime = '';
        dialog.close();
    };

    $scope.todos.task = [];

    $scope.addTask = function() {
        $scope.todos.task.push({textTask:$scope.textTask, done:false});
        todoStorage.put($scope.todos.task);
        $scope.textTask = '';
        console.log($scope.todos)
    };

    $scope.removeTask= function (todo) {
        $scope.todos.task.splice($scope.todos.task.indexOf(todo), 1);
    };

});
