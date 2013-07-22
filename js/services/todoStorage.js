todo.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs-title',
        statuses = ['Defined', 'In progress', 'Completed', 'Blocked'];

    function History(title, desc, date, estimate, status) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.tasks = [];
        this.estimate = estimate;
        this.status = statuses[status];
        return this;
    };

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function (todo) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todo));
        }

	};
});
