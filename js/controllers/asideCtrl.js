todo.controller("asideCtrl", function asideCtrl($scope) {

    $scope.statuses = ['defined', 'inprogress', 'complete', 'blocked'];
    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.users = [
        {name: 'Ivan Ivanov', status: 0, text: 'a'},
        {name: 'Sergei Sergeev', status: 1, text: 'b'},
        {name: 'Petr Petrovich', status: 2, text: 'aa'}
    ];

    $scope.mockhistory = [
        {
            title: 'Search1',
            status: 0,
            user: [0],
            estimate: 4
        },
        {
            title: 'Search2',
            status: 1,
            user: [0],
            estimate: 4
        },
        {
            title: 'Search3',
            status: 2,
            user: [0],
            estimate: 4
        },
        {
            title: 'Item1',
            status: 3,
            user: [0, 1],
            estimate: 4
        }
    ];

    $scope.searchByStatus = function(status) {
        if ($scope.search.statuses.indexOf(status)<0) {
            $scope.search.statuses.push(status);
        } else {
            $scope.search.statuses.splice($scope.search.statuses.indexOf(status), 1);
        }
    };

    $scope.searchByUser = function(username) {
        if ($scope.search.users.indexOf(username)<0) {
            $scope.search.users.push(username);
        } else {
            $scope.search.users.splice($scope.search.users.indexOf(username), 1);
        }

    };

    $scope.clearFilters = function() {
        $scope.search.title = "";
        $scope.search.statuses = [];
        $scope.search.users = [];
    };

});
