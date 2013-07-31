describe("testting Todo controller", function(){
    //module and inject - in angular-mocks.js
    //load module before load
    beforeEach(module('todo'));

    var scope;
    it('should have data in localStorage', inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller("todoCtrl", {
            $scope: scope
        });

        var title = scope.title;
        expect(title).toBe(true);
    })
    );

});