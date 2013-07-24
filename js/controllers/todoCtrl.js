todo.controller('todoCtrl', function TodoCtrl($scope, dialog, todoStorage) {
    var todos = $scope.todos = todoStorage.get(),
        oldTitle, oldDesc, oldDate, oldUsers, oldStatus, oldTime;

    $scope.editing = false;

    //if smth change in list then upload storage
    $scope.$watch('todos', function () {
        todoStorage.put(todos);
    }, true);

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
        $scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
        $scope.newUsers = '';
        $scope.newTime = '';
        dialog.close();
    };

    $scope.editTodo = function (todo) {
        $scope.editing = true;
        todo.editing = true;
        oldTitle = todo.title;
        oldDesc = todo.desc;
        oldDate = todo.date;
        oldUsers = todo.user;
        oldStatus = todo.status;
        oldTime = todo.time;
    };

    $scope.doneEditing = function (todo) {
        if (!todo.title) {
            $scope.removeTodo(todo);
        }
        todo.editing = false;
        $scope.editing = false;
    };

    $scope.cancelEdit = function (todo) {
        todo.title = oldTitle;
        todo.desc = oldDesc;
        todo.date = oldDate;
        todo.user = oldUsers;
        todo.status = oldStatus;
        todo.time = oldTime;
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

});
