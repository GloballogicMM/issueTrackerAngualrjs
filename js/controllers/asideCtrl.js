todo.controller("asideCtrl", function asideCtrl($scope, $dialog, todoStorage, users) {

    //Set storage format if nothing set
    if (!todoStorage.get().histories || !todoStorage.get().weekNums) {
        todoStorage.put({histories: [], weekNums: []});
    }
    var historyDragIndex;

    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.filtering = false;
    $scope.users = users;
    $scope.statuses = ["defined", "inprogress", "complete", "blocked"];
    $scope.storage = {};

    $scope.refreshHistory = function() {
        var storage = todoStorage.get();
        $scope.storage.histories = storage.histories.length ? storage.histories : [];
        $scope.storage.weekNums = storage.weekNums.length ? storage.weekNums : [];
        buildWeekArray();
    };

    $scope.refreshHistory();

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

    $scope.openViewDialog = function(historyIndex, weekIndex) {
        var d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl:  'partials/viewById.html',
            controller: 'historyViewCtrl',
            resolve: {
                historyIndex: function() {
                    return historyIndex;
                },
                weekIndex: function() {
                    return weekIndex;
                }
            }
        });
        d.open().then(function() {
             $scope.refreshHistory();
        });
    }

    $scope.clearStorage = function() {
        todoStorage.put({histories: [], weekNums: []});
        $scope.refreshHistory();
    }

    function buildWeekArray() {
        var weekNames = [],
            item;
        if ($scope.storage.weekNums.length){
            for(var i = 0, n = $scope.storage.weekNums.length; i < n; i++) {
                item = $scope.storage.weekNums[i];
                weekNames.push(getWeekName(getYearFromNum(item), getWeekFromNum(item)));
            }
        }
        $scope.weekNames = weekNames;
    }

    function getYearFromNum(num) {
        return Math.floor((num-1)/53);
    }

    function getWeekFromNum(num) {
        return num%53 ? num%53 : 53;
    }

    function getWeekName(year, week) {
        var name,
            monday = new Date(year, 0, 1).setWeek(week),
            sunday = new Date(monday).moveToDayOfWeek(0);

        name = monday.toString("MMMM, d");

        if (monday.toString("M") === sunday.toString("M")) {
            name += sunday.toString(" - d");
        } else {
            name += sunday.toString(" - MMMM, d");
        }

        return name;
    }
});
