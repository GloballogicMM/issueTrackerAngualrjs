todo.filter('historyFilter', function() {
     return function(histories, search, weekNum) {
         var items = {
             title: search.title,
             users: search.users,
             statuses: search.statuses,
             weekNum: weekNum,
             result: []
         };

         angular.forEach(histories, function(value, key) {

             var hasStatus = (this.statuses.length === 0) ? true : (this.statuses.indexOf(value.status) >= 0),
                 hasUser = (this.users.length === 0) ? true : arrayContainsElement(this.users, value.user),
                 matchesTitle = (this.title == '') ? true : (value.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0);
             if (hasStatus && hasUser && matchesTitle && value.week === this.weekNum) {
                 this.result.push(value);
             }
         }, items);

         return items.result;
     }
});

function arrayContainsElement(array1, array2) {
    console.log(array2.length);
    if (array2.length === 0) {
        return (array1.indexOf(array2) >= 0);
    }
    for (var i = 0, n = array2.length; i < n; i++) {
       if (array1.indexOf(array2[i]) >= 0) {
           return true;
       }
    }
    return false;

}