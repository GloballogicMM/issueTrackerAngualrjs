todo.filter('historyFilter', function() {
     return function(histories, search) {
         var items = {
             title: search.title,
             users: search.users,
             statuses: search.statuses,
             result: []
         }

         angular.forEach(histories, function(value, key) {

             var hasStatus = (this.statuses.length === 0) ? true : (this.statuses.indexOf(value.status) >= 0),
                 hasUser = (this.users.length === 0) ? true : (this.users.indexOf(value.user) >= 0),
                 matchesTitle = (this.title == '') ? true : (value.title.toLowerCase().indexOf(this.title.toLowerCase()) >= 0);
             console.log(value.title.indexOf(this.title));
             if (hasStatus && hasUser && matchesTitle) {
                 this.result.push(value);
             }
         }, items);

         return items.result;
     }
});