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
        } else {
        $scope.history.title = $scope.newTitle;
        $scope.history.desc = $scope.newDesc;
        $scope.history.user = $scope.newUsers;
        $scope.history.status = $scope.newStatus;
        $scope.history.time = $scope.newTime;
        storage.histories[weekIndex].sort(function(first, second) {
            return first.status - second.status;
        });
        todoStorage.put(storage);}
        $scope.editing = false;
    };

    $scope.cancelEdit = function () {
        $scope.editing = false;
    };

    $scope.removeTodo = function () {
        storage.histories[weekIndex].splice(historyIndex, 1);
        if (storage.histories[weekIndex].length === 0) {
            storage.histories.splice(weekIndex, 1);
            storage.weekNums.splice(weekIndex, 1);
        }
        todoStorage.put(storage);
        $scope.editing = false;
        $scope.close();
    };

    $scope.close = function() {
        dialog.close();
    };

   function updateTasks() {
        todoStorage.put(storage);
    }

    $scope.sortableOptions = {
        stop: function(e, ui) {
            updateTasks();
        }
    };

    $scope.addTask = function() {
        $scope.history.task.push({textTask:$scope.textTask, done:false});
        updateTasks();
        $scope.textTask = '';
    };

    $scope.removeTask= function (todo) {
        $scope.history.task.splice($scope.history.task.indexOf(todo), 1);
        todoStorage.put(storage);
    };
});