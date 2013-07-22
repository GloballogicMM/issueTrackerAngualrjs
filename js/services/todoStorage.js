todo.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs-title';

	return {
		getTitle: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		putTitle: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
