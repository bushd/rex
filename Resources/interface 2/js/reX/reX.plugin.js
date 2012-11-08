reX.Plugin = new Class({

	initialize: function() {
        this.preferences = reX.preferences[this.className];
    },
    
    preferences: {},
    
    className: function() {
        var w = $H(window);
        return w.keyOf(this.constructor);
    }

});