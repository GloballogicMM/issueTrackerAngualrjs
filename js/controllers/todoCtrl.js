todo.controller('TodoCtrl', function TodoCtrl($scope, todoStorage) {
	var todos = $scope.todos = todoStorage.get();

    //if smth change in list then upload storage
	$scope.$watch('todos', function () {
		todoStorage.put(todos);
	}, true);

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
			return;
		}

		todos.push({
			title: newTodo,
			completed: false
		});

		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
        $scope.editing = true;

	};

	$scope.doneEditing = function (todo) {
		todo.title = todo.title;

		if (!todo.title) {
			$scope.removeTodo(todo);
		}
        $scope.editing = false;
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

});
