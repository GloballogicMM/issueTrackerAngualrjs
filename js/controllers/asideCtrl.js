todo.controller("asideCtrl", function asideCtrl($scope, $dialog, todoStorage, users) {

    //Manually clear storage
    if (!todoStorage.get().histories || !todoStorage.get().weekNums) {
        todoStorage.put({histories: [], weekNums: []});
    }

    $scope.search = {};
    $scope.search.title = "";
    $scope.search.statuses = [];
    $scope.search.users = [];
    $scope.filtering = false;
    $scope.users = users;
    $scope.statuses = ["defined", "inprogress", "complete", "blocked"];
    $scope.temp = {};
    $scope.storage = {};
    $scope.data=[[], []];

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

    $scope.openViewDialog = function (history, weekIndex) {
        var d = $dialog.dialog({
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: 'partials/viewById.html',
            controller: 'historyViewCtrl',
            resolve: {
                historyIndex: function () {
                    return $scope.storage.histories[weekIndex].indexOf(history);
                },
                weekIndex: function () {
                    return weekIndex;
                }
            }
        });
        d.open().then(function () {
            $scope.refreshHistory();
        });
    };

    $scope.clearStorage = function() {
        todoStorage.put({histories: [], weekNums: []});
        $scope.refreshHistory();
    };

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

        name = monday.toString("MMMM d - ");

        if (monday.toString("M") === sunday.toString("M")) {
            name += sunday.toString("d,");
        } else {
            name += sunday.toString("MMMM d,");
        }

        name += " " + year;

        return name;
    }

    var oldWeekIndex;
    var oldItemIndex;

    $scope.startDrag = function(event, ui) {
        oldWeekIndex = this.$parent.$index;
        oldItemIndex = this.$index;
    };

    $scope.dropItem = function(event, ui) {
        var newWeekIndex = this.$index;

        $scope.storage.histories[oldWeekIndex].splice(oldItemIndex, 1);
        $scope.storage.histories[newWeekIndex].sort(function(first, second) {
            return first.status - second.status;
        })
        todoStorage.put($scope.storage);
        $scope.refreshHistory();
    };
});


