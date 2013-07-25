todo.controller("asideCtrl", function asideCtrl($scope, $dialog, todoStorage, users, statuses) {

    //Manually clear storage
    //todoStorage.put([]);
    var historyDragIndex;

    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.filtering = false;
    $scope.users = users;
    $scope.statuses = statuses;

    var startWeek, endWeek;

    $scope.refreshHistory = function() {
        var historyWeeks = [],
            weekIndex;
        $scope.history = todoStorage.get();
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

    $scope.openViewDialog = function(history) {
        var d = $dialog.dialog({
            backdrop: false,
            keyboard: false,
            backdropClick: false,
            templateUrl:  'partials/viewById.html',
            controller: 'historyViewCtrl',
            resolve: {
                todos: function() {
                    return $scope.history;
                },
                index: function() {
                    return $scope.history.indexOf(history);
                }
            }
        });
        d.open().then(function(todos) {
             todoStorage.put(todos);
        });
    }

    $scope.clearStorage = function() {
        todoStorage.put([]);
        $scope.refreshHistory();
    }

    function buildWeekArray() {
        var temp = $scope.history,
            start,
            end,
            weekNums = [],
            weekNames = [],
            history = [],
            count = 0;
        if (temp.length){
            temp.sort(function(first, second) {
                return first.week - second.week;
            });
            start = getYearWeekNum(temp[0].date);
            end = getYearWeekNum(temp[temp.length-1].date);

            for(var i = 0; i <= (end - start); i++) {
                weekNums.push(start + i);
                weekNames.push(getWeekName(getYearFromNum(start + i), getWeekFromNum(start + i)));
                history[i] = [];
                while (count <= (temp.length-1) && getYearWeekNum(temp[count].date) === (start + i)) {
                    history[weekNums.length-1].push(temp[count]);
                    count++;
                }
            }
        }

        $scope.storage = history;
        $scope.weekNames = weekNames;
        $scope.weekNums = weekNums;
    }

    function getYearWeekNum(date) {
        return new Date(date).getWeek() + 53 * (new Date(date).getFullYear());
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

    $scope.startDrag = function(history) {
    historyDragIndex = $scope.history.indexOf(history);
    }

    $scope.dropDrag = function(weekNum) {
    var item = $scope.history[historyDragIndex];
    item.date = Date.today().setWeek(weekNum);
    item.week = weekNum;

    $scope.history.sort(function(a, b) {
    return a.week - b.week;
    });
    todoStorage.put($scope.history);
    }
});
