todo.controller("historyViewCtrl", function($scope, dialog, historyIndex, weekIndex, todoStorage, users) {
    var storage = todoStorage.get();
    $scope.history = storage.histories[weekIndex][historyIndex];
    $scope.histor = storage.histories.task[historyIndex];
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
        storage.histories[weekIndex].sort(function(first, second) {
            return first.status - second.status;
        });
        todoStorage.put(storage);
        $scope.editing = false;
    };

    $scope.cancelEdit = function () {
        $scope.editing = false;
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
        $scope.history.task.push({textTask:$scope.textTask, done:false});
        todoStorage.put(storage);
        $scope.textTask = '';
    };

    $scope.removeTask= function (todo) {
        $scope.history.task.splice($scope.history.task.indexOf(todo), 1);
    };
});