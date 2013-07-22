todo.controller("asideCtrl", function asideCtrl($scope, todoStorage) {
    var todos = $scope.todos = todoStorage.get();
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
            user: $scope.users[0].name
        },
        {
            title: 'Search2',
            status: 1,
            user: $scope.users[0].name
        },
        {
            title: 'Search3',
            status: 2,
            user: $scope.users[0].name
        },
        {
            title: 'Item1',
            status: 0,
            user: $scope.users[1].name
        }
    ];

    $scope.searchByStatus = function(status) {
        if ($scope.search.statuses.indexOf(status)<0) {
            $scope.search.statuses.push(status);
        } else {
            $scope.search.statuses.splice($scope.search.statuses.indexOf(status), 1);
        }
        console.log($scope.search.statuses);
    }

    $scope.searchByUser = function(username) {
        if ($scope.search.users.indexOf(username)<0) {
            $scope.search.users.push(username);
        } else {
            $scope.search.users.splice($scope.search.users.indexOf(username), 1);
        }

    }

    $scope.clearFilters = function() {
        $scope.search.title = "";
        $scope.search.statuses = [];
        $scope.search.users = [];
    }

});
