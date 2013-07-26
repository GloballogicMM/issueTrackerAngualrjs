todo.controller("asideCtrl", function asideCtrl($scope, $dialog, todoStorage, users) {

    //Manually clear storage
    //todoStorage.put([]);
    var historyDragIndex;

    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.filtering = false;
    $scope.users = users;
    $scope.statuses = ["defined", "inprogress", "complete", "blocked"];
    $scope.temp = {};

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
            temp.sort(function (first, second) {
                return first.week - second.week;
            });
            start = temp[0].week;
            end = temp[temp.length-1].week;

            for(var i = 0; i <= (end - start); i++) {
                weekNums.push(start + i);
                weekNames.push(getWeekName(getYearFromNum(start + i), getWeekFromNum(start + i)));
                history[i] = [];
                while (count <= (temp.length-1) && temp[count].week === (start + i)) {
                    history[weekNums.length-1].push(temp[count]);
                    count++;
                }
            }
        }

        $scope.storage = history;
        $scope.weekNames = weekNames;
        $scope.weekNums = weekNums;
    }

    function sortFunc(first, second) {
        return first.date - second.date;
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

    $scope.startDrag = function(event, ui) {
        console.log(event);
    }

    $scope.dropItem = function(event, ui) {
        console.log(angular.element(ui.draggable).data('index'));/*
        var item = $scope.history[historyDragIndex],
            weekNum = $scope.weekNums[index],
            year = getYearFromNum(weekNum),
            week = getWeekFromNum(weekNum);
        item.date = new Date(year, 0, 1).setWeek(week);
        item.week = weekNum;


        $scope.history.sort(function(first, second) {
            return first.date - second.date;
        });
        todoStorage.put($scope.history);
        $scope.refreshHistory();   */
    }
});
