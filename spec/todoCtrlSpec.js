describe("testting Todo controller", function(){
    //module and inject - in angular-mocks.js
    //load module before load
    beforeEach(module('todo'));


    //create global scope
    var scope;
    var dialog;
    //do inject controller
    beforeEach(inject(function($rootScope, $controller, $dialogProvider){
        //create default scope
        scope = $rootScope.$new();
        //use default scope in controller
        $controller("todoCtrl", {
            $scope: scope
        });
        dialog = $dialogProvider;

    }));

    it("editing must be false", function(){
        var editing = scope.editing;
        expect(editing).toBe(false);
    })
});