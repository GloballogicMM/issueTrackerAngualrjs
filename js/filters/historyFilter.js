todo.filter('historyFilter', function() {
     return function(histories, search) {
         var items = {
             title: search.title,
             users: search.users,
             statuses: search.statuses,
             result: []
         };

         angular.forEach(histories, function(value, key) {

             var hasStatus = (this.statuses.length === 0) ? true : (this.statuses.indexOf(parseInt(value.status)) >= 0),
                 hasUser = (this.users.length === 0) ? true : arrayContainsElement(this.users, value.user),
                 matchesTitle = (this.title == '') ? true : (value.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0);
             if (hasStatus && hasUser && matchesTitle) {
                 this.result.push(value);
             }
         }, items);

         return items.result;
     }
});

function arrayContainsElement(array1, array2) {
    if (!array2) {
        return false;
    }

    for (var i = 0, n = array2.length; i < n; i++) {
       if (array1.indexOf(parseInt(array2[i])) >= 0) {
           return true;
       }
    }
    return false;

}