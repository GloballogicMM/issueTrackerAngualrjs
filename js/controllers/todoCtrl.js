todo.controller('todoCtrl', function TodoCtrl($scope, dialog, todoStorage, users) {

    $scope.todos = todoStorage.get();
    $scope.users = users;
    $scope.editing = false;

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo,
            index,
            newWeek;
        newWeek = getYearWeekNum($scope.newDate);

        if (($scope.todos.weekNums.length === 0) || (!($scope.todos.weekNums.indexOf(newWeek) >= 0))) {
            $scope.todos.weekNums.push(newWeek);
            $scope.todos.weekNums.sort(function(first, second) {
                return first-second;
            });
        }

        index = $scope.todos.weekNums.indexOf(newWeek);

        if (!$scope.todos.histories[index]) {
            $scope.todos.histories[index] = [];
        }

        $scope.todos.histories[index].push({
            title: newTodo,
            desc: $scope.newDesc,
            date: Date.parse($scope.newDate),
            time: $scope.newTime,
            user: $scope.newUsers,
            status: 0
        });

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

    function getYearWeekNum(date) {
         return new Date(date).getWeek() + 53 * (new Date(date).getFullYear());
    }

});
