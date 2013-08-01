describe("History add dialog", function(){
    //module and inject - in angular-mocks.js
    //load module before load
    beforeEach(module('todo'));

    var scope;
    it('should have todoCtrl', inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('todoCtrl', {
            $scope: scope,
            dialog: { close: function(){} }
        });

        expect($controller).toBeDefined();
    })
    );

    it ('should have editing param equal false', inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('todoCtrl', {
            $scope: scope,
            dialog: {close: function(){}}
        });

        expect(scope.editing).toEqual(false);
    }));


    it ('should have users',inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('todoCtrl', {
            $scope: scope,
            dialog: {close: function(){}}
        });

        expect(scope.users).toBeDefined();
    }));
    it ('should add history to localStorage from addTodo function',inject(function($rootScope, $controller, todoStorage){
        todoStorage.put({
            histories: [],
            weekNums: []
            });
        scope = $rootScope.$new();
        $controller('todoCtrl', {
            $scope: scope,
            dialog: {close: function(){}}
        });

        scope.newTitle = 'aaa';
        scope.newDesc = 'bbb';
        scope.newUsers = 1;
        scope.newStatus = '';
        scope.newTime = 3;
        scope.newDate = '10.10.2013';

        expect(scope.addTodo).toBeDefined();
        expect(todoStorage.get().histories.length).toEqual(0);
        scope.addTodo();
        expect(todoStorage.get().histories.length).toEqual(1);
        expect(todoStorage.get().weekNums.length).toEqual(1);
        expect(todoStorage.get().weekNums[0] ).toEqual(106730);
    }));

});