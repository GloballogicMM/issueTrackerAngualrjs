todo.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs2';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        }
	};
});
