todo.factory('todoStorage', function () { 
	var STORAGE_ID = 'todos-angularjs-title',
        STORAGE_DESC = 'todos-angularjs-desc';
	return {
		getTitle: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		putTitle: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		},
        getDesc: function () {
            return JSON.parse(localStorage.getDesc(STORAGE_DESC) || '[]');
        },
        putDesc: function (desc) {
            localStorage.setItem(STORAGE_DESC, JSON.stringify(desc));
        }
	};
});
