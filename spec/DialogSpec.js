/**
 * Created with JetBrains WebStorm.
 * User: MVerbenko
 * Date: 7/31/13
 * Time: 2:41 PM
 */
describe('Dialog', function() {
    var scope, controller;
    beforeEach(module("todo"));
    beforeEach(module('ngMockE2E'));

    beforeEach(inject(function($rootScope, $controller, $templateCache) {

        scope = $rootScope.$new();
        controller = $controller('asideCtrl', {
            $scope: scope
        });

        $templateCache.put('partials/createContent.html', '<section class="contentBlock">\
            <h3>New Story</h3>\
        <section class="row form-horizontal" novalidate>\
            <div class="control-group">\
                <label class="control-label" for="inputName">Title: </label>\
                <div class="controls">\
                    <input type="text" data-ng-model="newTodo" id="inputName" autofocus>\
                        <div class="input-help">\
                            <h4>Invalid Name</h4>\
                        </div>\
                    </div>\
                </div>\
            \
                <div class="control-group">\
                    <label class="control-label" for="inputDesc">Description: </label>\
                    <div class="controls">\
                        <textarea data-ng-model="newDesc" id="inputDesc">Add your </textarea>\
                    </div>\
                </div>\
            \
                <div class="control-group">\
                    <label class="control-label" for="inputDate">Date: </label>\
                    <div class="controls">\
                        <input type="date" data-ng-model="newDate" id="inputDate">\
                        </div>\
                    </div>\
            \
                    <div class="control-group">\
                        <label class="control-label" for="inputTime">Time: </label>\
                        <div class="controls" >\
                            <input type="number" min="0" max="50" data-ng-model="newTime" id="inputTime">\
                                <div class="timeSlider" ui-slider min="0" max="50" ng-model="newTime"></div>\
                                <div class="input-help">\
                                    <h4>Invalid Time</h4>\
                                </div>\
                            </div>\
                        </div>\
            \
                        <div class="control-group">\
                            <label class="control-label" for="inputUsers">Users: </label>\
                            <div class="controls">\
                                <select class="multiselect" multiple="multiple" ng-multi ng-model="newUsers" id="inputUsers" x-multiselect x-model="users">\
                                    <option data-ng-repeat="user in users" value="{{user.number}}">{{user.name}}</option>\
                                </select>\
                            </div>\
                        </div>\
                            \
                        <div class="control-group">\
                            <div class="controls">\
                                <button ng-disabled="!newTodo && !newDate" data-ng-click="addTodo()"  class="btn">Add</button>\
                            </div>\
                        </div>\
                            \
                    </section>\
                </section>\
            ');
    }));

    it("should be opened if open function is called ", inject(function($dialog) {
        scope.openNewDialog();

        expect($dialog.dialog().isOpen()).toBeTruthy();
    }));
});
