todo.controller("asideCtrl", function asideCtrl($scope, $dialog, todoStorage, users) {

    $scope.statuses = ['defined', 'inprogress', 'complete', 'blocked'];
    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.filtering = false;
    $scope.users = users;
    var startWeek, endWeek;

    $scope.refreshHistory = function() {
        $scope.history = todoStorage.get();
        startWeek = $scope.history.length ? $scope.history[0].week : -1;
        endWeek = $scope.history.length ? $scope.history[$scope.history.length-1].week : -1;
        $scope.weeks = getWeeksNames(startWeek, endWeek);
    };

    $scope.refreshHistory();

    function getWeeksNames(startWeek, endWeek) {
        var weeksNames = [],
            week,
            monday,
            sunday;
        if (startWeek >= 0 && endWeek >= 0)
        {
            for (var i = startWeek; i <= endWeek; i++) {
                week = {};
                monday = Date.today().setWeek(i);
                sunday = new Date(monday).moveToDayOfWeek(0);

                week.name = monday.toString("MMMM, d");
                week.number = i;

                if (monday.toString("M") === sunday.toString("M")) {
                    week.name += sunday.toString(" - d");
                } else {
                    week.name += sunday.toString(" - MMMM, d");
                }

                weeksNames.push(week);
            }
        }
        return weeksNames;
    }

    $scope.searchByStatus = function(status) {
        if ($scope.search.statuses.indexOf(status)<0) {
            $scope.search.statuses.push(status);
        } else {
            $scope.search.statuses.splice($scope.search.statuses.indexOf(status), 1);
        }
        $scope.filtering = true;
    };

    $scope.searchByUser = function(username) {
        if ($scope.search.users.indexOf(username)<0) {
            $scope.search.users.push(username);
        } else {
            $scope.search.users.splice($scope.search.users.indexOf(username), 1);
        }
        $scope.filtering = true;
    };

    $scope.clearFilters = function() {
        $scope.search.title = "";
        $scope.search.statuses = [];
        $scope.search.users = [];
        $scope.filtering = false;
    };

    $scope.openNewDialog = function(){
        var d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl:  'partials/createContent.html',
            controller: 'todoCtrl'
        });
        d.open().then(function() {
            $scope.refreshHistory();
        });
    };

    $scope.openViewDialog = function(history) {
        var d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl:  'partials/viewById.html',
            controller: 'historyViewCtrl',
            resolve: {
                history: function() {
                    return history;
                }
            }
        });
        d.open();
    }

    $scope.clearStorage = function() {
        todoStorage.put([]);
        $scope.refreshHistory();
    }
});
