/**
 * Created with JetBrains WebStorm.
 * User: mverbenko
 * Date: 7/30/13
 * Time: 5:54 PM
 */
describe("Scrum board", function() {
    var scope, controller;
    beforeEach(module("todo"));

    beforeEach(inject(function($rootScope, $controller) {

        scope = $rootScope.$new();
        controller = $controller('asideCtrl', {
            $scope: scope
//            $dialog: $dialog,
//            todoStorage: todoStorage
        });
    }));

    it("should have number of weeks equal to localStorage number of weeks after history refresh", inject(function(todoStorage) {
        spyOn(scope, 'refreshHistory').andCallThrough();
        scope.refreshHistory();
        expect(scope.refreshHistory).toHaveBeenCalled();
        expect(scope.storage.weekNums.length).toEqual(todoStorage.get().weekNums.length);
    }));

    it("should clear empty week if confirmed by user", function() {
        scope.storage.histories = [[]];
        scope.storage.weekNums = [0];
        spyOn(window, "confirm").andReturn(true);
        spyOn(scope, "clearEmptyHistory").andCallThrough();

        scope.clearEmptyHistory(0);
        expect(window.confirm).toHaveBeenCalled();
        expect(scope.storage.histories.length).toEqual(0);
        expect(scope.storage.weekNums.length).toEqual(0);
    });

    describe("Clear local storage button", function(){

        beforeEach(inject(function(todoStorage) {
            todoStorage.put({
                histories: [{}],
                weekNums: [0]
            });
        }));

        it("should clear local storage", inject(function(todoStorage) {
            var storage;
            storage = todoStorage.get();
            expect(storage.histories.length).not.toEqual(0);
            expect(storage.weekNums.length).not.toEqual(0);

            scope.clearStorage();
            storage = todoStorage.get();

            expect(storage.histories.length).toEqual(0);
            expect(storage.weekNums.length).toEqual(0);
        }));

        it("should empty scope storage", function () {
            scope.refreshHistory();

            expect(scope.storage.histories.length).not.toEqual(0);
            expect(scope.storage.weekNums.length).not.toEqual(0);

            scope.clearStorage();

            expect(scope.storage.histories.length).toEqual(0);
            expect(scope.storage.weekNums.length).toEqual(0);
        });
    });

    describe("Search", function(){
        it("should be defined", function() {
            expect(scope.search).toBeDefined();
            expect(scope.search.title).toBeDefined();
            expect(scope.search.users).toBeDefined();
            expect(scope.search.statuses).toBeDefined();
        });

        it('should have new status after adding new status', function() {
            expect(scope.search.statuses).toBeDefined();
            expect(scope.search.statuses.length).toEqual(0);
            spyOn(scope, "searchByStatus").andCallThrough();

            var newStatus = 0;
            scope.searchByStatus(newStatus);

            expect(scope.searchByStatus).toHaveBeenCalled();
            expect(scope.search.statuses.length).toEqual(1);
            expect(scope.search.statuses.indexOf(newStatus)).not.toBeLessThan(0);
        });

        it('should delete old status on adding an existing status', function() {
            var oldStatus = 0;
            scope.search.statuses = [0,1];
            spyOn(scope, "searchByStatus").andCallThrough();

            expect(scope.search.statuses).toBeDefined();
            expect(scope.search.statuses.length).not.toEqual(0);
            expect(scope.search.statuses.indexOf(oldStatus)).not.toBeLessThan(0);

            scope.searchByStatus(oldStatus);

            expect(scope.searchByStatus).toHaveBeenCalled();
            expect(scope.search.statuses.indexOf(oldStatus)).toBeLessThan(0);
        });

        it('should have new user after adding new user', function() {
            expect(scope.search.users).toBeDefined();
            expect(scope.search.users.length).toEqual(0);
            spyOn(scope, "searchByUser").andCallThrough();

            var newUser = 0;
            scope.searchByUser(newUser);

            expect(scope.searchByUser).toHaveBeenCalled();
            expect(scope.search.users.length).toEqual(1);
            expect(scope.search.users.indexOf(newUser)).not.toBeLessThan(0);
        });

        it('should delete old user on adding an existing user', function() {
            var oldUser = 0;
            scope.search.users = [0, 1];
            spyOn(scope, "searchByUser").andCallThrough();

            expect(scope.search.users).toBeDefined();
            expect(scope.search.users.length).not.toEqual(0);
            expect(scope.search.users.indexOf(oldUser)).not.toBeLessThan(0);

            scope.searchByUser(oldUser);

            expect(scope.searchByUser).toHaveBeenCalled();
            expect(scope.search.users.indexOf(oldUser)).toBeLessThan(0);
        });

        it('should have no options after clear filters', function() {
            spyOn(scope, 'clearFilters').andCallThrough();
            scope.search = {
                title: "Title",
                statuses: [0],
                users: [0]
            };

            expect(scope.search.title).not.toEqual("");
            expect(scope.search.statuses.length).not.toEqual(0);
            expect(scope.search.users.length).not.toEqual(0);

            scope.clearFilters();

            expect(scope.clearFilters).toHaveBeenCalled();
            expect(scope.search.title).toEqual("");
            expect(scope.search.statuses.length).toEqual(0);
            expect(scope.search.users.length).toEqual(0);
        });
    });

    describe("Week names list", function(){
        beforeEach(inject(function(todoStorage) {
            var mockStorage = {
                histories: [
                    {
                        title: "Some title",
                        desc: "Description",
                        user: [0],
                        status: 0,
                        time: 1,
                        task: []
                    }
                ],
                weekNums: [106730]
            };
            todoStorage.put(mockStorage);
            scope.refreshHistory();
        }));

        it("should not be empty", function() {
            expect(scope.weekNames.length).not.toEqual(0);
        });

        it("should have correct week name", function() {
            expect(scope.weekNames[0]).toEqual("October 7 - 13, 2013");
        });
    });
});