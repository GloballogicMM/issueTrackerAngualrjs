describe('History filter', function() {

    beforeEach(angular.mock.module('todo'));

    it('should be defined', inject(function($filter) {
        expect($filter('historyFilter')).not.toBeNull();
    }));

    it('should return all array if no filters are applied', inject(function($filter) {
        var historyFilter, mockHistory, mockEmptyFilterSearch;

        mockHistory = {
            title: "New Mock history",
            desc: "Description",
            time: 0,
            user: [1],
            task: [],
            status: 0
        };

        mockEmptyFilterSearch = {
            title: '',
            users: [],
            statuses: []
        }

        historyFilter = $filter('historyFilter')([mockHistory], mockEmptyFilterSearch);
        expect(historyFilter.length).toEqual(1);
        expect(historyFilter[0]).toEqual(mockHistory);
    }));

    it('should include history if its title contains history filter title and not otherwise', inject(function($filter) {
        var historyFilter, mockHistoryArray, mockEmptyFilterSearch, RightHistory, WrongHistory;

        RightHistory = {
            title: "Right history",
            desc: "Description",
            time: 0,
            user: [1],
            task: [],
            status: 0
        };
        WrongHistory = {
            title: "Wrong history",
            desc: "Description",
            time: 0,
            user: [1],
            task: [],
            status: 1
        };

        mockHistoryArray = [RightHistory, WrongHistory];

        mockEmptyFilterSearch = {
            title: 'Right',
            users: [],
            statuses: []
        }

        historyFilter = $filter('historyFilter')(mockHistoryArray, mockEmptyFilterSearch);
        expect(historyFilter.indexOf(RightHistory)).not.toBeLessThan(0);
        expect(historyFilter.indexOf(WrongHistory)).toBeLessThan(0);
    }));

    it('should include history if its status is in array of history filter statuses and not otherwise', inject(function($filter) {
        var historyFilter, mockHistoryArray, mockEmptyFilterSearch, RightHistory, WrongHistory;

        RightHistory = {
            title: "Right history",
            desc: "Description",
            time: 0,
            user: [1],
            task: [],
            status: 0
        };
        WrongHistory = {
            title: "Wrong history",
            desc: "Description",
            time: 0,
            user: [1],
            task: [],
            status: 1
        };

        mockHistoryArray = [RightHistory, WrongHistory];

        mockEmptyFilterSearch = {
            title: '',
            users: [],
            statuses: [0]
        }

        historyFilter = $filter('historyFilter')(mockHistoryArray, mockEmptyFilterSearch);
        expect(historyFilter.indexOf(RightHistory)).not.toBeLessThan(0);
        expect(historyFilter.indexOf(WrongHistory)).toBeLessThan(0);
    }));

    it('should include history if some of its users are in array of history filter users ' +
        'and not otherwise', inject(function($filter) {
        var historyFilter, mockHistoryArray, mockEmptyFilterSearch, RightHistory, WrongHistory;

        RightHistory = {
            title: "Right history",
            desc: "Description",
            time: 0,
            user: [1, 2],
            task: [],
            status: 0
        };
        WrongHistory = {
            title: "Wrong history",
            desc: "Description",
            time: 0,
            user: [0],
            task: [],
            status: 1
        };

        mockHistoryArray = [RightHistory, WrongHistory];

        mockEmptyFilterSearch = {
            title: '',
            users: [1],
            statuses: []
        }

        historyFilter = $filter('historyFilter')(mockHistoryArray, mockEmptyFilterSearch);
        expect(historyFilter.indexOf(RightHistory)).not.toBeLessThan(0);
        expect(historyFilter.indexOf(WrongHistory)).toBeLessThan(0);
    }));
});
