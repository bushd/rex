reX.preferences = {
    widgets: {},
    skins: []
};

reX.PreferenceManager = new Singleton({

	initialize: function() {},
    
    set: function(key, value) {
        reX.preferences[key] = value;
    },
    
    get: function(key) {
        return reX.preferences[key];
    }

});