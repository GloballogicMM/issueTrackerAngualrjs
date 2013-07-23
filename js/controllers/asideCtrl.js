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
    $scope.mockhistory = [];
    addHistory({
            title: 'Search1',
            status: 0,
            user: [0],
            date: new Date(2013, 6, 15),
            estimate: 4
        });
    addHistory({
            title: 'Search2',
            status: 1,
            user: [0],
            date: new Date(2013, 6, 17),
            estimate: 4
        });
    addHistory({
            title: 'Search3',
            status: 2,
            user: [0],
            date: new Date(2013, 6, 22),
            estimate: 4
        });
    addHistory({
            title: 'Item1',
            status: 3,
            user: [0, 1],
            date: new Date(2013, 6, 25),
            estimate: 4
        });

    function addHistory(history) {
        history.week = history.date.getWeek();
        $scope.mockhistory.push(history);
        $scope.mockhistory.sort(function(a,b) { return a.week- b.week;});
        $scope.startWeek = $scope.mockhistory[0].week;
        $scope.endWeek = $scope.mockhistory[$scope.mockhistory.length-1].week;
    }

    $scope.weeks = getWeeksNames($scope.startWeek, $scope.endWeek);
    console.log($scope.weeks);

    function getWeeksNames(startWeek, endWeek) {
        var weeksNames = [],
            week,
            monday,
            sunday;

        for (var i = startWeek; i <= endWeek; i++) {
            week = {};
            monday = Date.today().setWeek(i);
            sunday = new Date(monday).moveToDayOfWeek(0);

            week.name = monday.toString("MMMM, dd") + ' - ';
            week.number = i;

            if (monday.toString("M") === sunday.toString("M")) {
                week.name += sunday.toString("dd");
            } else {
                week.name += sunday.toString("MMMM, dd");
            }

            weeksNames.push(week);
        }
        return weeksNames;
    }

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
