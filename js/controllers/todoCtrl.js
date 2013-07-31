todo.controller('todoCtrl', function TodoCtrl($scope, dialog, todoStorage, users) {

    $scope.todos = todoStorage.get();
    $scope.users = users;
    $scope.editing = false;

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo,
            index,
            newWeek;
        newWeek = getYearWeekNum($scope.newDate);

        index = $scope.todos.weekNums.indexOf(newWeek);

        if (($scope.todos.weekNums.length === 0) || (!($scope.todos.weekNums.indexOf(newWeek) >= 0))) {
            $scope.todos.weekNums.push(newWeek);
            $scope.todos.weekNums.sort(function(first, second) {
                return first-second;
            });
            index = $scope.todos.weekNums.indexOf(newWeek);
            $scope.todos.histories.splice(index, 0, []);
        }

        $scope.todos.histories[index].push({
            title: newTodo,
            desc: $scope.newDesc,
            time: $scope.newTime,
            user: $scope.newUsers,
            task: [],
            status: 0
        });

        todoStorage.put($scope.todos);
        $scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
        $scope.newUsers = '';
        //$scope.newTime = '';
        dialog.close();
    };

    function getYearWeekNum(date) {
         return new Date(date).getWeek() + 53 * (new Date(date).getFullYear());
    }

});
