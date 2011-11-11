// check for Player
try{
    js2objcBridge
}catch(e) {
    Utility.getSkins = function() {
        return JSON.encode({ skins: {
        defaultMedia: {
            name: 'Default Media',
            version: '0.1',
            authors: 'Bastian Brodbeck',
            path: 'skins/defaultMedia/',
            type: 'show,episode',
            templates: {
                skin: 'template.defaultMedia.html',
                navigation: 'navigation.defaultMedia.html',
                metadata: 'metadata.defaultMedia.html'
            },
            javascript: '', // comma seperated list
            css: 'skins/defaultMedia/css/defaultMedia.css', // comma seperated list
            scrolllist: {
                offset: 2
            },
            menu: {}
        },
        defaultSeasons: {
            name: 'Default Seasons',
            version: '0.1',
            authors: 'Bastian Brodbeck',
            path: 'skins/defaultSeasons/',
            type: 'movie,show,episode',
            templates: {
                skin: 'template.defaultSeasons.html',
                navigation: 'navigation.defaultSeasons.html',
                metadata: 'metadata.defaultSeasons.html'
            },
            javascript: '', // comma seperated list
            css: 'skins/defaultSeasons/css/defaultSeasons.css', // comma seperated list
            scrolllist: {
                offset: 1
            },
            menu: {}
        },
        defaultMovie: {
            name: 'Default Movie',
            version: '0.1',
            authors: 'Bastian Brodbeck',
            path: 'skins/defaultMovie/',
            type: 'movie',
            templates: {
                skin: 'template.defaultMovie.html',
                navigation: 'navigation.defaultMovie.html',
                metadata: 'metadata.defaultMovie.html',
                info: 'info.defaultMovie.html'
            },
            javascript: '', // comma seperated list
            css: 'skins/defaultMovie/css/defaultMovie.css', // comma seperated list
            scrolllist: {
                offset: 1,
                vertical: false
            },
            menu: {
                vertical: false
            }
        },
        defaultAlbum: {
    name: 'Default Album',
    version: '0.1',
    authors: 'Bastian Brodbeck',
    path: 'skins/defaultAlbum/',
    type: 'album',
    templates: {
        skin: 'template.defaultAlbum.html',
        navigation: 'navigation.defaultAlbum.html',
        metadata: 'metadata.defaultAlbum.html'
    },
    javascript: '', // comma seperated list
    css: 'skins/defaultAlbum/css/defaultAlbum.css', // comma seperated list
    scrolllist: {
        offset: 0,
        vertical:false
    },
    menu: {
        vertical:false,
        wrap: false
    }
},
   defaultEpisode: {
    name: 'Default Episode',
    version: '0.1',
    authors: 'Bastian Brodbeck',
    path: 'skins/defaultEpisode/',
    type: 'episode',
    templates: {
        skin: 'template.defaultEpisode.html',
        navigation: 'navigation.defaultEpisode.html',
        metadata: 'metadata.defaultEpisode.html'
    },
    javascript: '', // comma seperated list
    css: 'skins/defaultEpisode/css/defaultEpisode.css', // comma seperated list
    scrolllist: {
        offset: 2
    },
    menu: {}
},
defaultShow: {
    name: 'Default Show',
    version: '0.1',
    authors: 'Bastian Brodbeck',
    path: 'skins/defaultShow/',
    type: 'show',
    templates: {
        skin: 'template.defaultShow.html',
        navigation: 'navigation.defaultShow.html',
        metadata: 'metadata.defaultShow.html'
    },
    javascript: '', // comma seperated list
    css: 'skins/defaultShow/css/defaultShow.css', // comma seperated list
    scrolllist: {
        offset: 2
    },
    menu: {}
},
jimi: {
    name: 'Jimi',
    version: '0.1',
    authors: 'Bastian Brodbeck',
    path: 'skins/jimi/',
    type: 'movie',
    templates: {
        skin: 'template.jimiMovie.html',
        navigation: 'navigation.jimiMovie.html',
        metadata: 'metadata.jimiMovie.html',
        info: 'info.jimiMovie.html'
    },
    javascript: 'skins/jimi/js/jimi.js', // comma seperated list
    css: 'skins/jimi/css/jimiMovie.css', // comma seperated list
   scrolllist: {
        offset: 1,
        vertical: true
    },
    menu: {
        vertical: true
    }
}
}});
    };
}


reX.SkinManager = new Class({
    
    initialize: function() {
        this.skins = this.getSkins().skins;
    },
    
    getSkins: function() {
        reX.debug('[SKINMANAGER] skin json: '+ JSON.encode(JSON.decode(Utility.getSkins())), REX_DEBUG);
    
        return JSON.decode(Utility.getSkins());
    },
    
    getCurrentSkinForSection: function(key, viewGroup) {
        var skinID;
        
        if(key) {
            reX.debug('[SKINMANAGER] load skin for key ' + key, REX_DEBUG);
            skinID = reX.preferences.skins[key];
        }
        
        // FALLBACK: get default for type
        if (!skinID) {
            reX.debug('[SKINMANAGER] no skin defined for key ' + key, REX_DEBUG);
            if (!viewGroup) {
                viewGroup = mediaManager.getSectionInformations().viewGroup;
                if (!viewGroup) {
                    viewGroup = reX.state.section.json[0]['@type'];
                }
                reX.debug('[SKINMANAGER] section is viewGroup ' + viewGroup, REX_DEBUG);
            }
            
            skinID = this.default[viewGroup];
            reX.debug('[SKINMANAGER] loaded default skin ' + skinID + ' with viewGroup ' + viewGroup, REX_DEBUG);
        }
            
        return this.skins[skinID];
    },
    
    getCurrentSkinForCurrentSection: function() {
        var key = reX.state.section.key;
        var viewGroup = mediaManager.getSectionInformations().viewGroup;
        if (!viewGroup) {
            viewGroup = reX.state.section.json[0]['@type'];
        }
        reX.debug('[SKINMANAGER] load skin for current section ' + key + ' and viewGroup ' + viewGroup, REX_DEBUG);
        return this.getCurrentSkinForSection(key, viewGroup);
    },
    
    skins: undefined,
    
    default: {
        movie: 'defaultMovie',
        show: 'defaultShow',
        season: 'defaultSeasons',
        episode: 'defaultEpisode',
        album: 'defaultAlbum'
    }
    
});