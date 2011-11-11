Sort = reX.Sort = {

    sortBy: function(field, primer){

        return function(a,b){

           a = a[field];
           b = b[field];

           if (typeof(primer) != 'undefined'){
               a = primer(a);
               b = primer(b);
           }

           if (a<b) { return -1; }
           if (a>b) { return 1; }
           return 0;
        }
    },

    sortByAfter: function(by, after, primerBy, primerAfter){
        
        return function(a,b){

            var a1 = a[after];
            var b1 = b[after];

            if (typeof(primerAfter) != 'undefined'){
                a1 = primerAfter(a1);
                b1 = primerAfter(b1);
            }

            if (a1 < b1) return -1;
            else if (a1 > b1) return 1;
            else {

                var a2 = a[by];
                var b2 = b[by];

                if (typeof(primerBy) != 'undefined'){
                    a2 = primerBy(a2);
                    b2 = primerBy(b2);
                }

                if (a2 < b2) return -1;
                if (a2 > b2) return 1;
                return 0;
            }
        }
    }
};

Filter = reX.Filter = {

    viewed: function(value, key) {
        if (value['@viewCount']) return true;
        else return false;
    },
    
    notViewed: function(value, key) {
        if (value['@viewCount']) return false;
        else return true;
    }
};