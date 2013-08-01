describe("History view/edit dialog", function() {
    var scope, controller, mockOldHistory, localStorage;
    beforeEach(module("todo"));

    beforeEach(inject(function($rootScope, $controller, todoStorage) {

        scope = $rootScope.$new();
        todoStorage.put({
            histories: [[{
                title: "Some title",
                desc: "Description",
                user: [0],
                status: 0,
                time: 1,
                task: []
            }]],
            weekNums: [106360]
        });
        localStorage = todoStorage;
        controller = $controller('historyViewCtrl', {
            $scope: scope,
            dialog: {
                close: function() {}
            },
            historyIndex: 0,
            weekIndex: 0
        });
    }));

    it("should copy old values to edit form inputs when editing", function() {
        scope.editTodo();
        expect(scope.newTitle).toEqual(scope.history.title);
        expect(scope.newDesc).toEqual(scope.history.desc);
        expect(scope.newUsers).toEqual(scope.history.user);
        expect(scope.newStatus).toEqual(scope.history.status);
        expect(scope.newTime).toEqual(scope.history.time);
    });

    it("should update new values to history when done editing", function() {
        mockOldHistory = {
            title: scope.history.title,
            desc: scope.history.desc,
            user: [scope.history.user[0]],
            status: scope.history.status,
            time: scope.history.time,
            task: []
        };
        scope.newTitle = "New Title";
        scope.newDesc = "New description";
        scope.newStatus = 1;
        scope.newUsers = [1];
        scope.newTime = 2;

        scope.doneEditing();

        expect(scope.history.title).not.toEqual(mockOldHistory.title);
        expect(scope.history.desc).not.toEqual(mockOldHistory.desc);
        expect(scope.history.status).not.toEqual(mockOldHistory.status);
        expect(scope.history.user).not.toEqual(mockOldHistory.user);
        expect(scope.history.time).not.toEqual(mockOldHistory.time);
    });

    it("should update local storage after done editing", function() {
        scope.newTitle = "New Title";
        scope.newDesc = "New description";
        scope.newStatus = 1;
        scope.newUsers = [1];
        scope.newTime = 2;

        scope.doneEditing();

        var storage = localStorage.get();

        expect(storage.histories[0][0].title).toEqual(scope.newTitle);
        expect(storage.histories[0][0].desc).toEqual(scope.newDesc);
        expect(storage.histories[0][0].status).toEqual(scope.newStatus);
        expect(storage.histories[0][0].time).toEqual(scope.newTime);
        expect(storage.histories[0][0].user).toEqual(scope.newUsers);
    });

    it("should not change history on cancel edit function", function() {
        mockOldHistory = {
            title: scope.history.title,
            desc: scope.history.desc,
            user: [scope.history.user[0]],
            status: scope.history.status,
            time: scope.history.time,
            task: []
        };
        scope.editTodo();
        scope.newTitle = "New Title";
        scope.newDesc = "New description";
        scope.newStatus = 1;
        scope.newUsers = [1];
        scope.newTime = 2;

        scope.cancelEdit();

        expect(scope.history.title).toEqual(mockOldHistory.title);
        expect(scope.history.desc).toEqual(mockOldHistory.desc);
        expect(scope.history.status).toEqual(mockOldHistory.status);
        expect(scope.history.user).toEqual(mockOldHistory.user);
        expect(scope.history.time).toEqual(mockOldHistory.time);
    });

    it("should delete history from local storage if the new title is empty", function() {
        scope.newTitle = "";

        scope.doneEditing();
        var storage = localStorage.get();

        expect(storage.histories.length).toEqual(0);
        expect(storage.weekNums.length).toEqual(0);
    });

    it("should delete history on delete function", function() {
        scope.removeTodo();
        var storage = localStorage.get();

        expect(storage.histories.length).toEqual(0);
        expect(storage.weekNums.length).toEqual(0);
    });

    describe("Inline tasks", function() {

        it("should add task on adding function and update storage", function() {
            var storage = localStorage.get().histories;
            expect(scope.history.task.length).toEqual(0);
            expect(storage[0][0].task.length).toEqual(0);
            scope.textTask = "New task";
            scope.addTask();
            storage = localStorage.get().histories;

            expect(scope.history.task.length).toEqual(1);
            expect(storage[0][0].task.length).toEqual(1);
        });

        it("should remove task on removing function and update storage", function() {
            var storage, taskName;
            scope.textTask = "New task";
            scope.addTask();

            storage = localStorage.get().histories;
            expect(scope.history.task.length).not.toEqual(0);
            expect(storage[0][0].task.length).not.toEqual(0);

            taskName = scope.history.task[0];
            scope.removeTask(taskName);
            storage = localStorage.get().histories;

            expect(scope.history.task.indexOf(taskName)).toEqual(-1);
            expect(storage[0][0].task.indexOf(taskName)).toEqual(-1);
        })
    });
});