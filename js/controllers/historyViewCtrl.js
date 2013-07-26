todo.controller("historyViewCtrl", function($scope, dialog, historyIndex, weekIndex, todoStorage, users) {
    var storage = todoStorage.get();
    $scope.history = storage.histories[weekIndex][historyIndex];
    $scope.users = users;
    $scope.editing = false;

    $scope.editTodo = function () {
        $scope.editing = true;
        $scope.newTitle = $scope.history.title;
        $scope.newDesc = $scope.history.desc;
        $scope.newUsers = $scope.history.user;
        $scope.newStatus = $scope.history.status;
        $scope.newTime = $scope.history.time;
    };

    $scope.doneEditing = function () {
        if (!$scope.newTitle) {
            $scope.removeTodo();
        }
        $scope.history.title = $scope.newTitle;
        $scope.history.desc = $scope.newDesc;
        $scope.history.user = $scope.newUsers;
        $scope.history.status = $scope.newStatus;
        $scope.history.time = $scope.newTime;
        todoStorage.put(storage);
        $scope.editing = false;
    };

    $scope.cancelEdit = function () {
        $scope.close();
    };

    $scope.removeTodo = function (todo) {
        storage.histories[weekIndex].splice(historyIndex, 1);
        todoStorage.put(storage);
        $scope.editing = false;
        $scope.cancelEdit();
    };

    $scope.close = function() {
        dialog.close();
    }

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