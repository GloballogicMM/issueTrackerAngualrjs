todo.controller("historyViewCtrl", function($scope, dialog, history, todoStorage, users) {
    var todos = todoStorage.get(),
        oldTitle, oldDesc, oldDate, oldUsers, oldStatus;
    $scope.history = history;
    $scope.users = users;
    $scope.editing = false;

    $scope.editTodo = function (todo) {
        $scope.editing = true;
        oldTitle = todo.title;
        oldDesc = todo.desc;
        oldDate = todo.date;
        oldUsers = todo.user;
        oldStatus = todo.status;
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
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.close = function() {
        dialog.close();
    }
});