describe("testting Todo controller", function(){
    //module and inject - in angular-mocks.js
    //load module before load
    beforeEach(module("todo"));

//create global scope
    var scope;
    //do inject controller
    beforeEach(inject(function($rootScope, $controller){
        //create default scope
        scope = $rootScope.$new();
        //use default scope in controller
        $controller("todoCtrl", {
            $scope: scope
        });
    }));

    describe("")
});