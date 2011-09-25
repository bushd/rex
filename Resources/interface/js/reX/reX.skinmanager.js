reX.skins = {
    movie: [{
            name: 'default',
            path: 'skins/movie/default',
            template: 'template.default.html',
            navigation: 'navgation.default.html',
            metadata: 'metadata.default.html'
        }],
    show: [],
    music: []
};

reX.SkinManager = new Class({
    
    initialize: function() {},
    
    getSkins: function() {
        return JSON.decode(Player.getSkins());
    }
    
});