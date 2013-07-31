/**
 * Created with JetBrains WebStorm.
 * User: mverbenko
 * Date: 7/30/13
 * Time: 5:54 PM
 */
describe("Scrum board", function() {
    var scope, controller, dialog, storage, users;
    beforeEach(module("todo"));
    beforeEach(module('ngMockE2E'));

    beforeEach(inject(function($rootScope, $controller, $templateCache) {

        scope = $rootScope.$new();
        controller = $controller('asideCtrl', {
            $scope: scope
//            $dialog: $dialog,
//            todoStorage: todoStorage
        });
    }));

    it("should have number of weeks equal to localStorage number of weeks", inject(function(todoStorage) {
        expect(scope.storage.weekNums.length).toEqual(todoStorage.get().weekNums.length);
    }));

    //it('should have equal to localStorage histories')
});