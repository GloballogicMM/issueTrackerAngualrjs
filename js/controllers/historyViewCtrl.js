todo.controller("historyViewCtrl", function($scope, dialog, todos, index, todoStorage, users) {
    $scope.history = todos[index];
    $scope.users = users;
    $scope.editing = false;

    $scope.editTodo = function (todo) {
        $scope.editing = true;
        $scope.newTitle = todo.title;
        $scope.newDesc = todo.desc;
        $scope.newUsers = todo.user;
        $scope.newStatus = todo.status;
        $scope.newTime = todo.time;
    };

    $scope.doneEditing = function (todo) {
        if (!todo.title) {
            $scope.removeTodo(todo);
        }
        todo.title = $scope.newTitle;
        todo.desc = $scope.newDesc;
        todo.user = $scope.newUsers;
        todo.status = $scope.newStatus;
        todo.time = $scope.newTime;
        $scope.editing = false;
    };

    $scope.cancelEdit = function (todo) {
        $scope.close();
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
        $scope.editing = false;
    };

    $scope.close = function() {
        dialog.close(todos);
    }

    function findHistory(index, week) {
        var count = 0;
        for (var i = 0, n = todos.length; i < n; i++) {
            if (todos[i].week === week) break;
            count++;
        }
        return index + count;
    }
});