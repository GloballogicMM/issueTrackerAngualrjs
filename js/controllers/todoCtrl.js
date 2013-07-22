todo.controller('TodoCtrl', function TodoCtrl($scope, todoStorage) {
	var todos = $scope.todos = todoStorage.get();
    $scope.users = [
        {name: 'Ivan Ivanov'},
        {name: 'Sergei Sergeev'},
        {name: 'Petr Petrovich'}
    ];

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
			completed: false
		});
		$scope.newTodo = '';
        $scope.newDesc = '';
        $scope.newDate = '';
	};

	$scope.editTodo = function (todo) {
        todo.editing = true;
	};

	$scope.doneEditing = function (todo) {
		if (!todo.title) {
			$scope.removeTodo(todo);
		}
        todo.editing = false;
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

});
