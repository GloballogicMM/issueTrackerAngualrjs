todo.controller('todoCtrl', function TodoCtrl($scope, todoStorage) {
    var todos = $scope.todos = todoStorage.get(),
        oldTitle, oldDesc, oldDate, oldUsers;

    $scope.editing = false;

    //if smth change in list then upload storage
    $scope.$watch('todos', function () {
        todoStorage.put(todos);
    }, true);

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo;
        if (!newTodo.length) {
            return;
        }
        $scope.todos.push({
            title: newTodo,
            desc: $scope.newDesc,
            date: $scope.newDate,
            users: $scope.newUsers
        });
        $scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
        $scope.newUsers = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editing = true;
        todo.editing = true;
        oldTitle = todo.title;
        oldDesc = todo.desc;
        oldDate = todo.date;
        oldUsers = todo.users;
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
        todo.users = oldUsers;
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

});
