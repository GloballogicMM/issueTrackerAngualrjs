describe('test direcories', function(){
   beforeEach(module('todo'));
    //beforeEach(module('partials/content.html'));
    var $compile, $rootScope;
    beforeEach(inject(
        ['$compile', '$rootScope', function($c, $r){
            $compile = $c;
            $rootScope = $r;
        }]
    ));


    //Enother exaple declaring variables in directives testing
    /*
    beforeEach(inject(function(_$compile_, _$rootScope_){

            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }
    ));
    */

    it ('should display the content in content, createContent, viewById template',inject(function($templateCache){
        $templateCache.put('partials/content.html', '<aside>\n    <form class="navbar-search pull-left">\n        <div class="input-append">\n            <input type="text" class="search-query" placeholder="Search" ng-model="search.title">\n        </div>\n    </form>\n    <br><br>\n    <div class="btn-group btn-group-vertical">\n        <button class="btn btn-inverse btn-block" ng-click="searchByStatus(0)">Defined</button>\n        <button class="btn btn-warning btn-block" ng-click="searchByStatus(1)">In progress</button>\n        <button class="btn btn-success btn-block" ng-click="searchByStatus(2)">Completed</button>\n        <button class="btn btn-danger btn-block" ng-click="searchByStatus(3)">Blocked</button>\n    </div>\n    <br><br>\n    <div>\n        <ul class="unstyled" ng-repeat="user in users">\n            <li ng-click="searchByUser($index)">{{ user.name }}</li>\n        </ul>\n    </div>\n    <button class="btn" ng-click="clearFilters()">Clear filters</button>\n    <br><br>\n    <button class="btn btn-danger" ng-click="clearStorage()" ng-show="!filtering">Clear storage</button>\n</aside>\n<article>\n    <div class="history new btn" ng-show="!filtering" ng-click="openNewDialog()"><span class="plus">+</span></div>\n    <div class="week" ng-repeat="week in weekNames" ng-model="storage.histories[$index]" data-drop="!editing"\n         jqyoui-droppable="{multiple: true, onDrop: \'dropItem\' }">\n        <h4>{{ week }}</h4>\n        <div ng-repeat="item in storage.histories[$index] | historyFilter: search"\n             ng-model="item" data-drag="true"\n             jqyoui-draggable="{index: {{ $index }}, animate: true, onStart:\'startDrag\'}"\n             data-jqyoui-options="{revert: \'invalid\'}">\n            <a href="#" ng-dblclick="openViewDialog(item, $parent.$index)"><div class="history {{ statuses[item.status]}}">\n                <h4>{{ item.title }}</h4>\n                <span class=\'estimate\'>{{ item.time }}h</span>\n                <p>{{ users[item.user[0]].name }} ... </p>\n            </div></a>\n        </div>\n    </div>\n</article>\n');
        $templateCache.put('partials/createContent.html', "<section class=\"contentBlock\">\n    <h3>New Story</h3>\n    <section class=\"row form-horizontal\" novalidate>\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"inputName\">Title: </label>\n            <div class=\"controls\">\n                <input type=\"text\" data-ng-model=\"newTodo\" id=\"inputName\" autofocus>\n                <div class=\"input-help\">\n                    <h4>Invalid Name</h4>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"inputDesc\">Description: </label>\n            <div class=\"controls\">\n                <textarea data-ng-model=\"newDesc\" id=\"inputDesc\">Add your </textarea>\n            </div>\n        </div>\n\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"inputDate\">Date: </label>\n            <div class=\"controls\">\n                <input type=\"date\" data-ng-model=\"newDate\" id=\"inputDate\">\n            </div>\n        </div>\n\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"inputTime\">Time: </label>\n            <div class=\"controls\" >\n                <input type=\"number\" min=\"0\" max=\"50\" data-ng-model=\"newTime\" id=\"inputTime\">\n                <div class=\"timeSlider\" ui-slider min=\"0\" max=\"50\" ng-model=\"newTime\"></div>\n                <div class=\"input-help\">\n                    <h4>Invalid Time</h4>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"control-group\">\n            <label class=\"control-label\" for=\"inputUsers\">Users: </label>\n            <div class=\"controls\">\n                <select class=\"multiselect\" multiple=\"multiple\" ng-multi ng-model=\"newUsers\" id=\"inputUsers\" x-multiselect x-model=\"users\">\n                    <option data-ng-repeat=\"user in users\" value=\"{{user.number}}\">{{user.name}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"control-group\">\n            <div class=\"controls\">\n                <button ng-disabled=\"!newTodo && !newDate\" data-ng-click=\"addTodo()\"  class=\"btn\">Add</button>\n            </div>\n        </div>\n\n    </section>\n</section>\n")

        var element = $compile("<asidemy></asidemy>")($rootScope);
        expect(element.html()).toBeDefined();
    }));
});